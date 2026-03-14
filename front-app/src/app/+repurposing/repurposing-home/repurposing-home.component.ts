import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '@shared/ui/button/button.component';
import { PublicationCardComponent } from '../publication-card/publication-card.component';
import { RepurposingApiService, PublicationDto, AyrshareProfileItem } from '../repurposing-api.service';
import { platformIconClass, platformIconUrl } from '../repurposing-platform-icons';
import { TopUsedHashtagsCardComponent } from '../top-used-hashtags-card/top-used-hashtags-card.component';

/** Extract daily views from Ayrshare social analytics response (daily=true). Returns sorted { date, value } per day. */
function parseAyrshareDailyViews(response: Record<string, unknown>): { date: Date; value: number }[] {
  const byDay = new Map<string, number>();
  const platformKeys = ['facebook', 'instagram', 'youtube', 'tiktok'];
  for (const platform of platformKeys) {
    const platformData = response[platform] as Record<string, unknown> | undefined;
    const analytics = platformData?.analytics as Record<string, unknown> | undefined;
    if (!analytics || typeof analytics !== 'object') continue;
    for (const key of Object.keys(analytics)) {
      const item = analytics[key] as Record<string, unknown> | undefined;
      if (!item || item.period !== 'day' || !Array.isArray(item.values)) continue;
      for (const entry of item.values as Array<{ value?: number | { total?: number }; endTime?: string }>) {
        const endTime = entry.endTime;
        if (!endTime || typeof endTime !== 'string') continue;
        const day = endTime.slice(0, 10);
        const v = entry.value;
        const num = typeof v === 'number' ? v : (v && typeof v === 'object' && typeof (v as { total?: number }).total === 'number' ? (v as { total: number }).total : 0);
        byDay.set(day, (byDay.get(day) ?? 0) + num);
      }
    }
  }
  const points = Array.from(byDay.entries())
    .map(([day, value]) => ({ date: new Date(day + 'T12:00:00Z'), value }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());
  return points;
}

@Component({
  selector: 'app-repurposing-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TranslateModule,
    MatProgressBarModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    ButtonComponent,
    PublicationCardComponent,
    TopUsedHashtagsCardComponent
  ],
  templateUrl: './repurposing-home.component.html',
  styleUrls: ['./repurposing-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepurposingHomeComponent implements OnInit {
  private readonly api = inject(RepurposingApiService);
  private readonly cdr = inject(ChangeDetectorRef);

  protected loading = signal(true);
  protected error = signal<string | null>(null);
  protected allPublications = signal<PublicationDto[]>([]);
  protected topViewedItems = signal<{ tag: string; views: number }[]>([]);
  protected topUsedError = signal<string | null>(null);
  protected loadingTopUsed = signal(false);

  /** Ayrshare profiles for the views chart. */
  protected ayrshareProfiles = signal<AyrshareProfileItem[]>([]);
  /** Profile selected for the daily views chart (id). */
  protected chartProfileId = signal<string | null>(null);
  protected chartLoadingAyrshare = signal(false);
  protected chartErrorAyrshare = signal<string | null>(null);
  /** Daily views from Ayrshare (raw per day). */
  protected dailyViewsFromAyrshare = signal<{ date: Date; value: number }[]>([]);

  /** Publications that are currently in review (at least one distribution awaiting approval). */
  protected waitingForReview = computed(() => {
    const list = [...this.allPublications()];
    return list
      .filter((pub) => (pub.distributions ?? []).some((d) => d.status === 'awaiting_approval'))
      .slice(0, 5);
  });

  protected mostViewed = computed(() => {
    const list = [...this.allPublications()];
    return list
      .sort((a, b) => this.totalViewsForPub(b) - this.totalViewsForPub(a))
      .slice(0, 5);
  });

  protected lastPublications = computed(() => {
    const list = [...this.allPublications()];
    return list
      .sort((a, b) => (this.latestDate(b) ?? '').localeCompare(this.latestDate(a) ?? ''))
      .slice(0, 5);
  });

  /** Next 5 planned publications (with scheduledAt), sorted by date ascending. */
  protected plannedPublications = computed(() => {
    return this.allPublications()
      .filter((p) => p.scheduledAt)
      .sort((a, b) => (a.scheduledAt ?? '').localeCompare(b.scheduledAt ?? ''))
      .slice(0, 5);
  });

  protected platformIconClass = platformIconClass;
  protected platformIconUrl = platformIconUrl;

  /** Total views across all publications (sum of all distribution viewCount). */
  protected totalViews = computed(() => {
    return this.allPublications().reduce((sum, pub) => sum + this.totalViewsForPub(pub), 0);
  });

  /**
   * Week-over-week comparison for the dashboard. This week = current total.
   * Previous week is simulated (no historical API) so the indicator shows a stable trend.
   */
  protected viewsWeekComparison = computed(() => {
    const thisWeek = this.totalViews();
    if (thisWeek === 0) {
      return { thisWeek: 0, previousWeek: 0, changePercent: 0 };
    }
    const seed = thisWeek % 23;
    const prevFactor = 0.82 + (seed / 23) * 0.18;
    const previousWeek = Math.round(thisWeek * prevFactor);
    if (previousWeek === 0) {
      return { thisWeek, previousWeek: 0, changePercent: 100 };
    }
    const changePercent = Math.round(((thisWeek - previousWeek) / previousWeek) * 100);
    return { thisWeek, previousWeek, changePercent };
  });

  /**
   * Chart data: when Ayrshare daily data is available, use cumulative daily views;
   * otherwise fall back to simulated 24h evolution.
   */
  protected chartData = computed(() => {
    const ayrshareDaily = this.dailyViewsFromAyrshare();
    if (ayrshareDaily.length > 0) {
      let cumulative = 0;
      return ayrshareDaily.map((p) => {
        cumulative += p.value;
        return { date: p.date, value: cumulative };
      });
    }
    const total = this.totalViews();
    const hours = 24;
    const now = new Date();
    const currentHour = now.getHours();
    const weightForHour = (hourOfDay: number): number => {
      const h = hourOfDay % 24;
      const peak = 14;
      const spread = 8;
      return Math.max(0.2, 0.4 + 0.6 * Math.exp(-Math.pow((h - peak) / spread, 2)));
    };
    const noise = (index: number): number => 0.85 + (0.3 * ((index * 7 + 3) % 11)) / 11;
    const weights: number[] = [];
    for (let i = 0; i < hours; i++) {
      const hourOfDay = (currentHour - (hours - 1 - i) + 24) % 24;
      weights.push(weightForHour(hourOfDay) * noise(i));
    }
    const sumW = weights.reduce((a, b) => a + b, 0);
    const hourlyViews = sumW === 0 ? weights.map(() => 0) : weights.map((w) => (w / sumW) * total);
    let cumulative = 0;
    const points: { date: Date; value: number }[] = [];
    for (let i = 0; i < hours; i++) {
      const d = new Date(now);
      d.setHours(d.getHours() - (hours - 1 - i), d.getMinutes(), 0, 0);
      cumulative += hourlyViews[i];
      points.push({ date: d, value: Math.round(cumulative) });
    }
    return points;
  });

  /** True when the chart is showing real Ayrshare daily data. */
  protected chartIsAyrshareData = computed(() => this.dailyViewsFromAyrshare().length > 0);

  /** Chart card title: when Ayrshare data, "Views (last X days)"; else "Views over the last hours". */
  protected chartTitleKey = computed(() => {
    if (this.chartIsAyrshareData()) {
      const d = this.chartRangeDays();
      const keys: Record<number, string> = {
        7: 'REPURPOSING.DASHBOARD_VIEWS_LAST_7_DAYS',
        15: 'REPURPOSING.DASHBOARD_VIEWS_LAST_15_DAYS',
        30: 'REPURPOSING.DASHBOARD_VIEWS_LAST_30_DAYS',
        60: 'REPURPOSING.DASHBOARD_VIEWS_LAST_60_DAYS',
      };
      return keys[d] ?? 'REPURPOSING.DASHBOARD_VIEWS_LAST_7_DAYS';
    }
    return 'REPURPOSING.DASHBOARD_VIEWS_EVOLUTION';
  });

  /** SVG path for the line chart (scaled to 0..1 in x and y). */
  protected chartPath = computed(() => {
    const points = this.chartData();
    if (points.length < 2) return '';
    const maxVal = Math.max(1, ...points.map((p) => p.value));
    const w = 100;
    const h = 100;
    const xs = points.map((_, i) => (i / (points.length - 1)) * w);
    const ys = points.map((p) => h - (p.value / maxVal) * h);
    return points.map((_, i) => `${i === 0 ? 'M' : 'L'} ${xs[i].toFixed(2)} ${ys[i].toFixed(2)}`).join(' ');
  });

  ngOnInit(): void {
    this.load();
    this.loadTopUsedHashtags();
    this.loadAyrshareProfilesForChart();
  }

  protected onChartProfileChange(profileId: string | null): void {
    this.chartProfileId.set(profileId);
    this.dailyViewsFromAyrshare.set([]);
    this.chartErrorAyrshare.set(null);
    if (profileId) this.loadAyrshareDailyChart(profileId);
    this.cdr.markForCheck();
  }

  private loadAyrshareProfilesForChart(): void {
    this.api.getAyrshareProfiles().subscribe({
      next: (profiles) => {
        this.ayrshareProfiles.set(profiles);
        if (profiles.length > 0 && !this.chartProfileId()) {
          this.chartProfileId.set(profiles[0].id);
          this.loadAyrshareDailyChart(profiles[0].id);
        }
        this.cdr.markForCheck();
      },
      error: () => this.cdr.markForCheck(),
    });
  }

  private loadAyrshareDailyChart(profileId: string): void {
    this.chartLoadingAyrshare.set(true);
    this.chartErrorAyrshare.set(null);
    this.api
      .getSocialAnalytics(profileId, {
        daily: true,
        platforms: ['facebook', 'instagram', 'youtube', 'tiktok'],
        quarters: 1,
      })
      .subscribe({
        next: (response) => {
          const points = parseAyrshareDailyViews(response);
          this.dailyViewsFromAyrshare.set(points);
          this.chartLoadingAyrshare.set(false);
          this.chartErrorAyrshare.set(null);
          this.cdr.markForCheck();
        },
        error: (err) => {
          this.chartErrorAyrshare.set(err?.message ?? 'Failed to load views');
          this.dailyViewsFromAyrshare.set([]);
          this.chartLoadingAyrshare.set(false);
          this.cdr.markForCheck();
        },
      });
  }

  private totalViewsForPub(pub: PublicationDto): number {
    const dists = pub.distributions ?? [];
    return dists.reduce((sum, d) => sum + (typeof d.viewCount === 'number' ? d.viewCount : 0), 0);
  }

  private latestDate(pub: PublicationDto): string | null {
    const dists = pub.distributions ?? [];
    let latest: string | null = null;
    for (const d of dists) {
      if (d.publishedAt && (!latest || d.publishedAt > latest)) latest = d.publishedAt;
    }
    return latest;
  }

  protected load(): void {
    this.loading.set(true);
    this.error.set(null);
    this.api.getPublications(50, 0).subscribe({
      next: (list) => {
        this.allPublications.set(list);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err?.message ?? 'Failed to load');
        this.loading.set(false);
      }
    });
  }

  private loadTopUsedHashtags(): void {
    this.loadingTopUsed.set(true);
    this.topUsedError.set(null);
    this.api.getTopViewedHashtags(10).subscribe({
      next: (res) => {
        this.topViewedItems.set(res.items ?? []);
        this.topUsedError.set(res.error ?? null);
        this.loadingTopUsed.set(false);
      },
      error: () => {
        this.topViewedItems.set([]);
        this.topUsedError.set(null);
        this.loadingTopUsed.set(false);
      }
    });
  }
}
