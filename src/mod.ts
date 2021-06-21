import { startBot } from "https://deno.land/x/discordeno@11.2.0/mod.ts";
import {commit} from './bot_dict.ts'

const logger = {
  error:  (text:string) => console.log(text),
  warn:   (text:string) => console.log(text),
  info:   (text:string) => console.log(text),
  debug:  (obj:object) => console.debug(obj)
}

const OBSERVATIONS:readonly string[]
  = Deno.env.get('KAKEAI_OBSERVATIONS')?.split(/,\s/) ?? []

startBot({
  token: Deno.env.get('DISCORD_KEY') ?? '',
  intents: ["Guilds", "GuildMessages"],
  eventHandlers: {
    ready() {
      logger.info('Kakeai is online!');
      logger.info(`start observating ${OBSERVATIONS}`)
    },
    messageCreate(message) {
      if( message.isBot) return;
      logger.debug(message)
      const msg = commit(message.content)
      logger.info(`${message.content} - ${msg}`)
      msg && message.reply(msg);
    },
  },
});
