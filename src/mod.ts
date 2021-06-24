import "https://deno.land/x/dotenv/load.ts";
import { startBot, DiscordenoMessage } from "https://deno.land/x/discordeno@12.0.0-rc.3/mod.ts";
import { Logger } from "./logger.ts";
import { commit } from "./bot_dict.ts";

const OBSERVATIONS: readonly string[] =
  Deno.env.get("KAKEAI_OBSERVATIONS")?.split(/,\s/) ?? [];

if (!Deno.env.get("DISCORD_KEY")) {
  Logger.error("Not found Discord key.");
  throw Error("Not found Discord key.")
}

startBot({
  token: Deno.env.get("DISCORD_KEY") ?? "",
  intents: ["Guilds", "GuildMessages"],
  eventHandlers: {
    ready() {
      Logger.info("Kakeai is online!");
      Logger.info(`start observating ${OBSERVATIONS}`);
    },
    messageCreate(message:DiscordenoMessage) {
      try {
        if (message.isBot) return;
        Logger.debug(message);
        const msg = commit(message.content);
        Logger.info(`${message.content} - ${msg}`);
        msg && message.reply(msg);
      } catch (err) {
        Logger.error(err.message);
      }
    },
  },
});
