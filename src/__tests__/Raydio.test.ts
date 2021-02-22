import { Raydio } from "../Raydio";

describe("it can be instantiated", () => {
  test("with no options", () => {
    expect(new Raydio()).toBeDefined();
  });

  test("with an empty object", () => {
    expect(new Raydio({})).toBeDefined();
  });
});
