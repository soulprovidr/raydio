import { Playable } from "./Playable";

export enum RaydioCommand {
  Mute = "MUTE",
  Pause = "PAUSE",
  Play = "PLAY",
  SetVolume = "SET_VOLUME",
  Stop = "STOP",
}

export interface RaydioOptions {
  playlist: Playable[];
}

export const RaydioOptionsDefaults: RaydioOptions = {
  playlist: [],
};

export enum RaydioStatus {
  Stopped,
  Buffering,
  Playing,
  Paused,
}

const { Mute, Pause, Play, SetVolume, Stop } = RaydioCommand;
const { Stopped } = RaydioStatus;

export class Raydio {
  private commands: Map<RaydioCommand, any>;
  private options: RaydioOptions;
  private progress = 0;
  private status: RaydioStatus = Stopped;

  private validTransitions: Map<RaydioStatus, RaydioCommand[]> = [
    [Stopped, [Mute, Play, SetVolume]],
    [Buffering, [Mute, Pause, SetVolume, Stop]],
    [Playing, [Mute, Pause, Play, SetVolume, Stop]],
    [Paused, [Mute, Play, SetVolume, Stop]],
  ];

  constructor(options?: Partial<RaydioOptions>) {
    this.options = { ...RaydioOptionsDefaults, ...options };
    this.commands = new Map([
      [Mute, console.log],
      [Pause, console.log],
      [Play, console.log],
      [SetVolume, console.log],
      [Stop, console.log],
    ]);
  }

  public configure(options: Partial<RaydioOptions>): void {
    this.options = { ...RaydioOptionsDefaults, ...options };
  }

  private executeCommand(command: RaydioCommand, ...args) {
    if (this.validateCommand(command)) {
      this.commands.get(command)(...args);
    } else {
      throw new Error("[Raydio] Invalid command.");
    }
  }

  private validateCommand(command: RaydioCommand) {
    return this.commands.has(command);
  }

  public mute(): void {
    this.executeCommand(Mute);
  }

  public pause(): void {
    this.executeCommand(Pause);
  }

  public play(playable: Playable): void {
    this.executeCommand(Play, playable);
  }

  public setVolume(volume: number): void {
    this.executeCommand(SetVolume, volume);
  }

  public stop(): void {
    this.executeCommand(Stop);
  }
}
