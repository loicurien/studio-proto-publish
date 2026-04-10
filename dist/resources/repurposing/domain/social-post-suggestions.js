"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SOCIAL_POST_HOOK_TEMPLATES = exports.SOCIAL_POST_TITLE_TEMPLATES = void 0;
exports.getRandomSocialPostSuggestion = getRandomSocialPostSuggestion;
exports.SOCIAL_POST_TITLE_TEMPLATES = [
    'Must-see',
    'The moment to remember',
    'Worth sharing',
    'New content',
    'Save this for later',
    'Standout moment',
    "Don't miss this",
    'Your clip in a nutshell',
    'For your feed',
    "What's it about?",
    'Hit play',
    'Best bit',
    'Watch until the end',
    'Content of the day',
    'For your stories',
];
exports.SOCIAL_POST_HOOK_TEMPLATES = [
    'Tell us what you think in the comments.',
    'Like if this spoke to you.',
    'Save for later.',
    'Share with someone who needs to see this.',
    'Are we feeling this?',
    'Tag a friend.',
    'More coming in the next posts.',
    'One-line take?',
    'This deserves a watch.',
    'Stay tuned for more.',
    'Your opinion matters.',
    'Swipe for more.',
    'The detail that changes everything.',
    'Worth every second.',
    'Thanks for being here.',
    'See you in the next one.',
    'Tell us your favorite moment.',
    'A gem to share.',
    'That sums it up.',
    'To start your day right.',
    'To end the day on a high note.',
    'The little extra you needed.',
    'Simple, effective, shareable.',
    'Want more?',
];
const DEFAULT_SOCIAL_HASHTAGS = [
    '#content',
    '#video',
    '#socialmedia',
    '#share',
    '#viral',
    '#trending',
    '#discover',
    '#inspiration',
    '#moment',
    '#new',
    '#fyp',
    '#foryou',
];
function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
function pickRandomN(arr, n) {
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(n, shuffled.length));
}
function getRandomSocialPostSuggestion() {
    const title = pickRandom(exports.SOCIAL_POST_TITLE_TEMPLATES);
    const oneLiner = pickRandom(exports.SOCIAL_POST_HOOK_TEMPLATES);
    const extra = pickRandomN(exports.SOCIAL_POST_HOOK_TEMPLATES.filter((p) => p !== oneLiner), 2);
    const postText = [oneLiner, ...extra].filter(Boolean).join('\n\n');
    const hashtags = pickRandomN(DEFAULT_SOCIAL_HASHTAGS, 5);
    return {
        title,
        description: 'Title and hook ideas for a social post—works for most content types.',
        postText,
        hashtags,
    };
}
//# sourceMappingURL=social-post-suggestions.js.map