import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { HealthController } from './health.controller';
import { PrismaModule } from './prisma.module';
import { HttpClientModule } from './common/http-client/http-client.module';
import { RepurposingModule } from './resources/repurposing/repurposing.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    PrismaModule,
    HttpClientModule,
    RepurposingModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}

