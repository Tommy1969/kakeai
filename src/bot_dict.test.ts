import { assertArrayContains } from "https://deno.land/std@0.65.0/testing/asserts.ts";

import { commit } from "./bot_dict.ts";

type Fixture = {
  text: string;
  expect: string[];
};

const fixtures: Fixture[] = [
  { text: "大島さん", expect: ["児島だよ!"] },
  { text: "児島さん", expect: ["そうだよ"] },
  { text: "違う", expect: ["違うことあれへんがな!!"] },
  { text: "忘れた", expect: ["ほな、オレが一緒に考えてあげよ。"] },
];

Deno.test("対応する返信が返ること", () => {
  fixtures.forEach((it: Fixture) => {
    assertArrayContains(it.expect, [commit(it.text)], it.text);
  });
});
