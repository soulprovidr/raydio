type Optional<T> = T | undefined;

export enum PlayableType {
  MP3 = "MP3",
}

export interface PlayableMeta {
  readonly artist: string;
  readonly image: Optional<string>;
  readonly title: string;
}

export interface Playable {
  readonly duration: Optional<number>;
  readonly meta: PlayableMeta;
  readonly progress: Optional<number>;
  readonly src: string;
  readonly type: PlayableType;
}
