import { util } from "./util.ts";

class ReplyBase {
  #match:RegExpExecArray|null = null;
  readonly #regex = /([一1]\s?[人個つ]|(どこ|誰|どれ|なに|何)).*選\S*[\s]+(?<option>.+)/;
  readonly #replies = [
    (v:string[]) => `おめでとう〜!! **${v[0]}** が選ばれました!`,
    (v:string[]) => `今回は **${v[0]}** が選ばれました!!`,
    (v:string[]) => `よし! **${v[0]}** にしよう!!`,
    (v:string[]) => `**${v[0]}** はいかがでしょう?`,
  ];

  get replies() {
    return this.#replies;
  }

  /**
   * テキストが regex にマッチしたら応答メッセージを返す
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
    return this.#replies[util.random(this.#replies.length)]([this.chooseOne()]);
  }

  /**
   * 選択肢の中から選んだ一つを返す
   * @param {object} match result of RegExp#exec
   * @returns {string} message for reply
   */
  chooseOne(): string {
    const box:string[] = this.#match?.groups?.option.split(/[\s,、\-:：]+/) ?? [];
    return box[util.random(box.length)];
  }
}

const vocabularies: ReplyBase[] = [new ReplyBase()];
export const commit = (content: string): string | null => {
  const result: (string | null)[] = vocabularies
    .map((it) => it.run(content))
    .filter((it) => !!it);

  return result.shift() ?? null;
};
