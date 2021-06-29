import {
  DiscordenoMessage,
} from "https://deno.land/x/discordeno@12.0.0-rc.3/mod.ts";
import { assertEquals } from "https://deno.land/std@0.65.0/testing/asserts.ts";
import { Spy, spy } from "https://deno.land/x/mock@v0.10.0/spy.ts";

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
  const message: DiscordenoMessage = {} as DiscordenoMessage;

  fixtures.forEach((it: Fixture) => {
    const callback: Spy<void> = spy();
    message.content = it.text;
    message.reply = callback;

    commit(message);
    assertEquals(callback.calls[0].args, it.expect);
  });
});
