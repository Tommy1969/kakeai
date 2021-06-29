import {
  DiscordenoMessage,
} from "https://deno.land/x/discordeno@12.0.0-rc.3/mod.ts";
import { YamlLoader } from "https://deno.land/x/yaml_loader@v0.1.0/mod.ts";
import vs from "https://deno.land/x/value_schema@v3.0.0/mod.ts";
import { util } from "./util.ts";

const schemaVoca = {
  word: vs.string({ minLength: 1 }),
  replies: vs.array({
    each: vs.string({ minLength: 1 }),
    minLength: 1,
  }),
};

/**
 * 応答辞書
 * パターンにマッチする応答候補からランダムに一つを選んで返信する
 */
class Vocabulary {
  readonly #regex: RegExp;
  readonly #replies: string[];
  #match: RegExpExecArray | null = null;
  constructor(word: string, replies: string[]) {
    this.#regex = new RegExp(word);
    this.#replies = replies;
  }

  get replies(): string[] {
    return this.#replies;
  }

  /**
   * テキストにマッチする応答メッセージを返す
   * @param text 検査するテキスト
   * @returns 返信メッセージ。検査にマッチしない場合は null
   */
  run(text: string): string | null {
    this.#match = this.#regex.exec(text);
    return this.#match ? this.reply() : null;
  }

  /**
   * 応答メッセージを返す
   * @returns 応答メッセージ
   */
  reply(): string {
    return this.#replies[util.random(this.#replies.length)];
  }
}

type Voca = {
  word: string;
  replies: string[];
};

const VOCABULARY_FILE = "./resources/vocabulary.yaml";
const rawVoca: Voca[] = await new YamlLoader().parseFile(
  VOCABULARY_FILE,
) as Voca[];

const vocabularies: Vocabulary[] = rawVoca
  .map((it: Voca) => vs.applySchemaObject(schemaVoca, it))
  .map((it: Voca) => new Vocabulary(it.word, it.replies));

export const commit = (message: DiscordenoMessage): void => {
  const test = vocabularies
    .map((it: Vocabulary) => it.run(message.content))
    .filter((it: string | null) => !!it)
    .join("\n");

  test && message.reply(test);
};
