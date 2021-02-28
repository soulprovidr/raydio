import { EventEmitter } from "events";

type Optional<T> = T | undefined;

export enum Command {
  Load = "load",
  Pause = "pause",
  Play = "play",
  Stop = "stop",
}

export interface Provider extends EventEmitter {
  load(track: Track): void;
  pause(): void;
  play(startPos?: number): void;
  stop(): void;
}

export interface ProviderConstructable {
  new (options?: Record<string, unknown>): Provider;
}

export interface ProviderConfig {
  type: TrackType & string;
  provider: ProviderConstructable;
  options?: Record<string, unknown>;
}

export interface RaydioOptions {
  providers?: ProviderConfig[];
  strictMode?: boolean | false;
}

export enum RaydioStatus {
  Unstarted = "unstarted",
  Stopped = "stopped",
  Buffering = "buffering",
  Playing = "playing",
  Paused = "paused",
}

export interface Track {
  readonly duration: Optional<number>;
  readonly meta: TrackMeta;
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
