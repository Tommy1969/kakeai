import { assert } from "https://deno.land/std@0.65.0/testing/asserts.ts";

import { commit } from "./bot_calc.ts";

Deno.test("一つだけ選択する", () => {
  const fixtures: string[] = [
    "一つ選んで a b c",
    "どこか選んで 伊豆 日光　 三浦",
  ];
  fixtures.forEach((it: string) => {
    const result = commit(it) ?? "";
    assert(result.length > 0, result);
  });
});
