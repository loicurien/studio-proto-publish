export class SuggestContentRequestDto {
  prompt?: string;
}

export class SuggestContentResponseDto {
  title!: string;
  description?: string;
  postText?: string;
  hashtags?: string[];
}
