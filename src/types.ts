type Optional<T> = T | undefined;

export enum Command {
  Pause = "PAUSE",
  Play = "PLAY",
  Stop = "STOP",
}

export interface IRaydio {
  pause(): void;
  play(track: Track): void;
  stop(): void;
}

export interface Track {
  readonly duration: Optional<number>;
  readonly meta: TrackMeta;
  readonly progress: Optional<number>;
  readonly src: string;
  readonly type: TrackType;
}

export interface TrackMeta {
  readonly artist: string;
  readonly image: Optional<string>;
  readonly title: string;
}

export enum TrackType {
  MP3 = "MP3",
}

export interface RaydioOptions {
  volume: number;
}

export enum RaydioStatus {
  Stopped = "STOPPED",
  Buffering = "BUFFERING",
  Playing = "PLAYING",
  Paused = "PAUSED",
}
