import { Command, Track, RaydioOptions, RaydioStatus } from "./types";

const { Pause, Play, Stop } = Command;
const { Stopped, Buffering, Paused, Playing } = RaydioStatus;

export const RaydioOptionsDefaults: RaydioOptions = {
  volume: 1,
};

export class Raydio {
  static validCommands: Map<RaydioStatus, Command[]> = new Map([
    [Stopped, [Play]],
    [Buffering, [Pause, Stop]],
    [Playing, [Pause, Play, Stop]],
    [Paused, [Play, Stop]],
  ]);

  static validateCommand(status: RaydioStatus, command: Command): boolean {
    return Raydio.validCommands.get(status).includes(command);
  }

  private currentStatus: RaydioStatus = Stopped;
  private options: RaydioOptions;

  constructor(options?: Partial<RaydioOptions>) {
    this.options = { ...RaydioOptionsDefaults, ...options };
  }

  private executeCommand(command: Command, ...args): void {
    if (Raydio.validateCommand(this.currentStatus, command)) {
      console.log(command, args);
    }
  }

  public pause(): void {
    this.executeCommand(Pause);
  }

  public play(track: Track): void {
    this.executeCommand(Play, track);
  }

  public stop(): void {
    this.executeCommand(Stop);
  }
}
