import { Raydio } from "./Raydio";
import { HowlerProvider } from "./providers/HowlerProvider";
import { TrackType } from "./types";

const { MP3 } = TrackType;

describe("it can be instantiated", () => {
  test("with no options", () => {
    expect(() => new Raydio()).not.toThrow();
  });

  test("with an empty object", () => {
    expect(() => new Raydio({})).not.toThrow();
  });

  // test.skip("with a provider configuration", () => {
  //   expect(
  //     () =>
  //       new Raydio({
  //         providers: [
  //           {
  //             type: MP3,
  //             provider: HowlerProvider,
  //             options: {
  //               html5: true,
  //             },
  //           },
  //         ],
  //       })
  //   ).not.toThrow();
  // });
});
