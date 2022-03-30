import { Liquidable, toLiquid } from "../src/drop";
import { Template } from "../src/template";

describe("example toLiquid", () => {
  type User = { firstName: string; lastName: string };

  class LazyUserDrop implements Liquidable {
    private obj?: User;
    constructor(private userId: string) {}

    async queryDatabase(): Promise<User> {
      // Do database IO here.
      return { firstName: "John", lastName: "Smith" };
    }

    async [toLiquid](): Promise<User> {
      if (this.obj === undefined) this.obj = await this.queryDatabase();
      return this.obj;
    }
  }

  test("lazy load object", async () => {
    const template = Template.from(
      "Hello, {{ user.firstName }} {{ user.lastName }}!"
    );
    const result = await template.render({ user: new LazyUserDrop("abc123") });
    expect(result).toBe("Hello, John Smith!");
  });

  test("assign lazy loaded object", async () => {
    const template = Template.from(
      "{% assign some_user = user %}Hello, {{ some_user.firstName }} {{ some_user.lastName }}!"
    );
    const result = await template.render({ user: new LazyUserDrop("abc123") });
    expect(result).toBe("Hello, John Smith!");
  });
});
