import { EventEmitter } from "events";
import { HowlerProvider } from "./providers/HowlerProvider";
import {
  Command,
  RaydioOptions,
  RaydioStatus,
  Provider,
  Track,
  ProviderConfig,
  TrackType,
} from "./types";

const { Load, Pause, Play, Stop } = Command;
const { Unstarted, Stopped, Buffering, Paused, Playing } = RaydioStatus;

export const RaydioOptionsDefaults: RaydioOptions = {
  providers: [
    // {
    //   type: MP3,
    //   provider: HowlerProvider,
    //   options: {
    //     html5: true,
    //   },
    // },
  ],
};

export class Raydio extends EventEmitter implements Provider {
  static validCommands: Map<RaydioStatus, Command[]> = new Map([
    [Unstarted, [Load]],
    [Stopped, [Play]],
    [Buffering, [Pause, Stop]],
    [Playing, [Pause, Play, Stop]],
    [Paused, [Play, Stop]],
  ]);

  static validateCommand(status: RaydioStatus, command: Command): boolean {
    return Raydio.validCommands.get(status).includes(command);
  }

  private options: RaydioOptions;
  private providers: Map<TrackType, Provider>;
  private status: RaydioStatus = Unstarted;
  private track: Track = undefined;

  constructor(options?: Partial<RaydioOptions>) {
    super();
    this.options = { ...RaydioOptionsDefaults, ...options };
    this.loadProviders(this.options.providers);
  }

  private loadProviders(providers: ProviderConfig[]): void {
    this.providers = providers.reduce((config, provider) => {
      const { provider: ProviderConstructor, options, type } = provider;
      config.set(type, new ProviderConstructor(options));
      return config;
    }, new Map());
  }

  private executeCommand(command: Command, ...args): void {
    if (!Raydio.validateCommand(this.status, command)) {
      this.throw(`Can't execute ${command} when status is ${this.status}`);
    }

    const provider = this.providers.get(this.track.type);
    switch (command) {
      case Pause:
        provider?.pause.apply(null, args);
        break;
      case Play: {
        provider?.play.apply(null, args);
        break;
      }
      case Stop:
        provider?.stop.apply(null, args);
        break;
      default:
        this.throw("Unknown command!");
        break;
    }
  }

  private throw(message: string): void {
    if (this.options.strictMode) {
      throw new Error(message);
    } else {
      console.warn(`[Raydio] ${message}`);
    }
  }

  public load(track: Track): void {
    if (!track) {
      this.throw("No track provided!");
    }
    const provider = this.providers.get(track.type);
    if (!provider) {
      this.throw(`${track.type} provider not found!`);
    }

    // TODO: Reset state (+ unsubscribe from previous provider events).

    this.track = track;
    provider?.load(this.track);

    // TODO: Subscribe to new provider events.
  }

  public pause(): void {
    this.executeCommand(Pause);
  }

  public play(startPos?: number): void {
    this.executeCommand(Play, startPos);
  }

  public stop(): void {
    this.executeCommand(Stop);
  }
}
