# 五重の祈｜安除守浄祈

**ANJO SHUJO KI — FIVE LAYERS OF PRAYER**

> 内より読め。

5×5の護符を、中心から外側へ ── 祈 → 浄 → 守 → 除 → 安 の順に読み解いていく、静かなインタラクティブ作品です。

占いアプリではありません。ランダム抽選やシャッフルはなく、決まった順番で護符に触れ、五重の意味を辿ることだけに集中できるよう作られています。

企画・構成：無限納豆

---

## 公開URL

```
https://smil17990-arch.github.io/gojuu-no-inori/
```

(GitHub Pages設定後にこの形式で公開されます)

## 護符の配置

```
安 除 守 除 安
除 守 浄 守 除
守 浄 祈 浄 守
除 守 浄 守 除
安 除 守 除 安
```

中心の「祈」から始まり、対応する文字を辿るごとに次の一重が開きます。

| 重 | 文字 | 読み |
|---|---|---|
| 第一重 | 祈 | 祈る |
| 第二重 | 浄 | 浄める |
| 第三重 | 守 | 守る |
| 第四重 | 除 | 除く |
| 第五重 | 安 | 安らぐ |

五重すべてを開き終えると護符全体が静かに輝き、「今日の記」として今日守りたいものを書き残せます(端末内のlocalStorageに保存され、次回アクセス時も残ります)。

## ファイル構成

```
gojuu-no-inori/
├── index.html   トップ・護符・物語・解説の4画面
├── style.css    墨染和紙・古金・朱をイメージした静謐なテーマ
├── script.js    五重の進行ロジック／今日の記の保存
└── images/
    ├── fu-preview.jpg     トップ画面のミニ護符プレビュー
    ├── story-banner.jpg   物語画面の掛け軸バナー
    ├── paper-texture.jpg  護符画面の背景に敷く黒染和紙の質感
    └── ogp.jpg            SNSシェア用カード画像(1200×630)
```

ビルド不要、npm不要。`index.html` を開くだけで動作します。images内の4点はnote記事で公開済みの意匠から書き出したものです。

## 公開方法(GitHub Pages)

1. このリポジトリの Settings → Pages を開く
2. Branch を `main`(公開に使うブランチ)、フォルダを `/root` に設定
3. 数分後に上記URLで公開されます

## カスタマイズ

- 原作noteへのリンク：`script.js` 冒頭の `NOTE_URL` を書き換えてください
- SNSシェア時のカード画像：`images/ogp.jpg`(1200×630)を用意済みです。差し替える場合は同じファイル名で上書きしてください
- 公開URLが決まったら `index.html` 内の `og:url` / `og:image` の
  `https://smil17990-arch.github.io/gojuu-no-inori/` の部分を実際のURLに合わせてください

## 技術条件

- HTML / CSS / JavaScriptのみ(React・npm不使用)
- スマートフォン縦画面を最優先(横スクロールなし、幅360px程度でも崩れない設計)
- `prefers-reduced-motion` に対応

---

PLANNER: MUGEN NATTO
