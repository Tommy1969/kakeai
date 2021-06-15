import 'https://deno.land/x/worker_types@v1.0.1/cloudflare-worker-types.ts';
import { startBot } from "https://deno.land/x/discordeno@11.2.0/mod.ts";
import {commit} from './src/bot_dict.ts'

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
      logger.debug(message)
      if( message.isBot) return;
      const msg = commit(message.content)
      logger.info(`${message.content} - ${msg}`)
      msg && message.reply(msg);
    },
  },
});

addEventListener("fetch", (event:FetchEvent) => {
  const response = new Response("Hello World!", {
    headers: { "content-type": "text/plain" },
  });
  event.respondWith(response);
});
