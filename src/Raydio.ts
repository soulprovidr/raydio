import { Playable } from "./Playable";

export enum RaydioCommand {
  Pause = "PAUSE",
  Play = "PLAY",
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

const { Pause, Play, Stop } = RaydioCommand;
const { Stopped, Buffering, Paused, Playing } = RaydioStatus;

export class Raydio {
  private currentStatus: RaydioStatus = Stopped;
  private options: RaydioOptions;
  private validTransitions: Map<RaydioStatus, RaydioCommand[]> = new Map([
    [Stopped, [Play]],
    [Buffering, [Pause, Stop]],
    [Playing, [Pause, Play, Stop]],
    [Paused, [Play, Stop]],
  ]);

  constructor(options?: Partial<RaydioOptions>) {
    this.options = { ...RaydioOptionsDefaults, ...options };
  }

  private executeCommand(command: RaydioCommand, ...args): boolean {
    if (this.validTransitions.get(this.currentStatus).includes(command)) {
      console.log(command, args);
      return true;
    } else {
      return false;
    }
  }

  public pause(): boolean {
    return this.executeCommand(Pause);
  }

  public play(playable: Playable): boolean {
    return this.executeCommand(Play, playable);
  }

  public stop(): boolean {
    return this.executeCommand(Stop);
  }
}
