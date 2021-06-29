import {
  DiscordenoMessage,
} from "https://deno.land/x/discordeno@12.0.0-rc.3/mod.ts";
import { assertEquals } from "https://deno.land/std@0.65.0/testing/asserts.ts";
import { Spy, spy } from "https://deno.land/x/mock@v0.10.0/spy.ts";

import { commit } from "./bot_calc.ts";

Deno.test("一つだけ選択する", () => {
  const message: DiscordenoMessage = {} as DiscordenoMessage;

  const fixtures: string[] = [
    "一つ選んで a b c",
    "どこか選んで 伊豆 日光　 三浦",
  ];
  fixtures.forEach((it: string) => {
    const callback: Spy<void> = spy();
    message.content = it;
    message.reply = callback;

    commit(message);
    assertEquals(callback.calls.length, 1);
  });
});
