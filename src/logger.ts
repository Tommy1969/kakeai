import * as log from "https://deno.land/std@0.99.0/log/mod.ts";

// 出力ファイル名
const logDir = "/tmp/kakeai_log";
const logFile = `${logDir}/kakeai.log`;

Deno.mkdirSync(logDir, { recursive: true });

// 出力フォーマット
const formatter = "{datetime} {levelName} {msg}";

await log.setup({
  handlers: {
    // console出力形式の定義
    console: new log.handlers.ConsoleHandler("DEBUG", {
      formatter,
    }),

    // file出力形式の定義
    file: new log.handlers.FileHandler("DEBUG", {
      filename: logFile,
      formatter,
    }),
  },

  loggers: {
    default: {
      level: "DEBUG",
      handlers: ["console", "file"],
    },
  },
});

const Logger = log.getLogger();
console.log(`logfile: ${logFile}`);

export { Logger };
