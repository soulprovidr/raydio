import { Raydio } from "./Raydio";

describe("it can be instantiated", () => {
  test("with no options", () => {
    expect(() => new Raydio()).not.toThrow();
  });

  test("with an empty object", () => {
    expect(() => new Raydio({})).not.toThrow();
  });
});
