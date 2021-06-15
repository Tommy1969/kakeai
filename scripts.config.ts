import { DenonConfig } from "https://deno.land/x/denon@2.4.7/mod.ts";
import { config as env } from "https://deno.land/x/dotenv@v2.0.0/mod.ts";

const config:DenonConfig = {
  env: {
    MODE: "develop"
  },
  scripts: {
    start: {
      desc: "run",
      cmd: "deno run --unstable src/mod.ts",
      allow: ["net", "read", "write", "env"],
      env: {...env(), KAKEAI_OBSERVATIONS: "H1, H2 H3"}
    },
    test: {
      desc: "Run tests",
      cmd: "deno test",
      allow: ["env", "read"],
      watch: false,
      env: {
        KAKEAI_OBSERVATIONS: "H1, H2 H3",
        DISCORD_KEY: "private key"
      }
    },
    "test:watch": {
      desc: "Watching tests",
      cmd: "deno test",
      allow: ["env", "read"],
      watch: true,
      env: {
        KAKEAI_OBSERVATIONS: "H1, H2 H3",
        DISCORD_KEY: "private key"
      }
    }
  }
}

export default config;
