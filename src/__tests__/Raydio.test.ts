import { Raydio } from "../Raydio";

describe("it can be instantiated", () => {
  test("with no options", () => {
    const raydio = new Raydio();
    expect(raydio).toBeDefined();
  });
});
