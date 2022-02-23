import { Environment } from "../../src/environment";

describe("built-in tablerow tag", () => {
  const env = new Environment({});
  test("one row", async () => {
    const template = env.fromString(
      "{% tablerow tag in collection.tags %}{{ tag }}{% endtablerow %}"
    );
    const result = await template.render({
      collection: {
        tags: ["tag1", "tag2", "tag3", "tag4"],
      },
    });
    expect(result).toBe(
      '<tr class="row1">\n' +
        '<td class="col1">tag1</td>' +
        '<td class="col2">tag2</td>' +
        '<td class="col3">tag3</td>' +
        '<td class="col4">tag4</td>' +
        "</tr>\n"
    );
  });
  test("one row with limit", async () => {
    const template = env.fromString(
      "{% tablerow tag in collection.tags limit: 2 %}" +
        "{{ tag }}" +
        "{% endtablerow %}"
    );
    const result = await template.render({
      collection: {
        tags: ["tag1", "tag2", "tag3", "tag4"],
      },
    });
    expect(result).toBe(
      '<tr class="row1">\n' +
        '<td class="col1">tag1</td>' +
        '<td class="col2">tag2</td>' +
        "</tr>\n"
    );
  });
  test("one row with offset", async () => {
    const template = env.fromString(
      "{% tablerow tag in collection.tags offset: 2 %}" +
        "{{ tag }}" +
        "{% endtablerow %}"
    );
    const result = await template.render({
      collection: {
        tags: ["tag1", "tag2", "tag3", "tag4"],
      },
    });
    expect(result).toBe(
      '<tr class="row1">\n' +
        '<td class="col1">tag3</td>' +
        '<td class="col2">tag4</td>' +
        "</tr>\n"
    );
  });
  test("two columns", async () => {
    const template = env.fromString(
      "{% tablerow tag in collection.tags cols: 2 %}" +
        "{{ tag }}" +
        "{% endtablerow %}"
    );
    const result = await template.render({
      collection: {
        tags: ["tag1", "tag2", "tag3", "tag4"],
      },
    });
    expect(result).toBe(
      '<tr class="row1">\n' +
        '<td class="col1">tag1</td>' +
        '<td class="col2">tag2</td>' +
        "</tr>\n" +
        '<tr class="row2">' +
        '<td class="col1">tag3</td>' +
        '<td class="col2">tag4</td>' +
        "</tr>\n"
    );
  });
  test("two column odd range", async () => {
    const template = env.fromString(
      "{% tablerow i in (1..5) cols:2 %}" +
        "{{ i }} {{ tablerowloop.col_first }}" +
        "{% endtablerow %}"
    );
    const result = await template.render();
    expect(result).toBe(
      '<tr class="row1">\n' +
        '<td class="col1">1 true</td>' +
        '<td class="col2">2 false</td>' +
        "</tr>\n" +
        '<tr class="row2">' +
        '<td class="col1">3 true</td>' +
        '<td class="col2">4 false</td>' +
        "</tr>\n" +
        '<tr class="row3">' +
        '<td class="col1">5 true</td>' +
        "</tr>\n"
    );
  });
});
