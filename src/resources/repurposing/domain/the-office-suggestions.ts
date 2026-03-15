/**
 * Curated suggestions for "The Office" (US) series – titles and punchlines.
 * Used by suggestContent to return random, on-brand title + post text each time.
 */

export const THE_OFFICE_TITLES: string[] = [
  'Welcome to the Office',
  'The Office – Best Moments',
  'The Office – Best of Dunder Mifflin',
  'Scranton’s Finest',
  'That’s What She Said – The Office',
  'The Office – Iconic Moments',
  'Best of The Office',
  'The Office – Greatest Hits',
  'Dunder Mifflin Highlights',
  'The Office – Unforgettable Scenes',
  'Paper Sales & Shenanigans',
  'The Office – Fan Favorites',
  'From Scranton to Your Feed',
  'The Office – Classic Moments',
  'That’s What She Said Moments',
];

export const THE_OFFICE_PUNCHLINES: string[] = [
  'That’s what she said.',
  'I’m not superstitious, but I am a little stitious.',
  'Would I rather be feared or loved? Easy. Both. I want people to be afraid of how much they love me.',
  'Sometimes I’ll start a sentence and I don’t even know where it’s going. I just hope I find it along the way.',
  'I declare bankruptcy!',
  'Identity theft is not a joke, Jim! Millions of families suffer every year.',
  'Bears. Beets. Battlestar Galactica.',
  'I’m ready to get hurt again.',
  'You miss 100% of the shots you don’t take. – Wayne Gretzky – Michael Scott',
  'I love inside jokes. I hope to be a part of one someday.',
  'Well, well, well, how the turntables…',
  'No, no, no, no, no. No. No!',
  'It’s never too late for second chances. Unless it’s with your ex. Then it’s way too late.',
  'I’m the f***ing lizard king.',
  'Dwight, you ignorant sl*t.',
  'I’m not going to be one of those people who wonders “What if?” for the rest of my life.',
  'Fool me once, strike one. Fool me twice… strike three.',
  'I’m an early bird and I’m a night owl. So I’m wise and I have worms.',
  'You know what they say. Fool me once, strike one. Fool me twice… strike three.',
  'I want people to be afraid of how much they love me.',
  'And I knew exactly what to do. But in a much more real sense, I had no idea what to do.',
  'I’m not a hero. I’m a hero’s sidekick.',
  'I’m Beyoncé, always.',
  'I’m not superstitious, but I am a little stitious.',
  'If I had a gun with two bullets and I was in a room with H****r, B*n L***n and Toby, I would shoot Toby twice.',
  'Society teaches us that having feelings and crying is bad and wrong. Well, that’s wrong.',
  'Make friends first, make sales second, make love third. In no particular order.',
  'I’m running away from my responsibilities. And it feels good.',
  'I’m not offended by homosexuality. In the ’60s, I made love to many, many women, and oftentimes they were women.',
];

const OFFICE_HASHTAGS = [
  '#TheOffice',
  '#DunderMifflin',
  '#Scranton',
  '#ThatsWhatSheSaid',
  '#BestOfTheOffice',
  '#TheOfficeUS',
  '#MichaelScott',
  '#OfficeQuotes',
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickRandomN<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(n, shuffled.length));
}

/**
 * Returns a random title and post text (one or more punchlines) for The Office theme.
 * Each call yields different results.
 */
export function getRandomOfficeSuggestion(): {
  title: string;
  description: string;
  postText: string;
  hashtags: string[];
} {
  const title = pickRandom(THE_OFFICE_TITLES);
  const oneLiner = pickRandom(THE_OFFICE_PUNCHLINES);
  const extra = pickRandomN(
    THE_OFFICE_PUNCHLINES.filter((p) => p !== oneLiner),
    2,
  );
  const postText = [oneLiner, ...extra].filter(Boolean).join('\n\n');
  const hashtags = pickRandomN(OFFICE_HASHTAGS, 5);

  return {
    title,
    description: `Best moments and punchlines from The Office.`,
    postText,
    hashtags,
  };
}
