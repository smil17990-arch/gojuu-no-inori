/* =========================================================
   五重の祈｜安除守浄祈
   内より読め ── 祈 → 浄 → 守 → 除 → 安
   ========================================================= */

(function () {
  "use strict";

  // ---------------------------------------------------------
  // 原作noteへのリンク：ここを書き換えるだけで反映されます
  // ---------------------------------------------------------
  const NOTE_URL = "https://note.com/vortex951/n/nc0499ee9dd67";

  // localStorageキー（他アプリと衝突しないよう固有の名前空間）
  const STORAGE_KEY = "gojuu-no-inori:kyou-no-ki";

  // ---------------------------------------------------------
  // 護符の配置（5×5・固定）
  //   安 除 守 除 安
  //   除 守 浄 守 除
  //   守 浄 祈 浄 守
  //   除 守 浄 守 除
  //   安 除 守 除 安
  // ---------------------------------------------------------
  const GRID = [
    ["安", "除", "守", "除", "安"],
    ["除", "守", "浄", "守", "除"],
    ["守", "浄", "祈", "浄", "守"],
    ["除", "守", "浄", "守", "除"],
    ["安", "除", "守", "除", "安"],
  ];

  // 中心「祈」から外側へ開く順序と、それぞれの説明文
  const LAYERS = [
    {
      char: "祈",
      title: "第一重｜祈",
      sub: "祈る",
      body: [
        "すべては、ここから始まる。",
        "願いを叶えるための言葉ではない。",
        "恐れの中で、それでも心を向ける場所を決めること。",
        "それが最初の「祈」。",
      ],
    },
    {
      char: "浄",
      title: "第二重｜浄",
      sub: "浄める",
      body: [
        "まず、心の濁りを静める。",
        "恐れも怒りも消す必要はない。",
        "ただ、それらだけに世界を支配させない。",
      ],
    },
    {
      char: "守",
      title: "第三重｜守",
      sub: "守る",
      body: [
        "何を守るのかを決める。",
        "命。",
        "家。",
        "大切な人。",
        "あるいは、自分の中に残したいもの。",
      ],
    },
    {
      char: "除",
      title: "第四重｜除",
      sub: "除く",
      body: [
        "守るものが定まってから、災いを除く。",
        "ただ敵を追い払うのではない。",
        "必要のないものを、境界の外へ戻す。",
      ],
    },
    {
      char: "安",
      title: "第五重｜安",
      sub: "安らぐ",
      body: [
        "最後に残るものは、安。",
        "すべてを支配することではなく、",
        "揺れの中にも戻れる場所を持つこと。",
      ],
    },
  ];

  // ---------------------------------------------------------
  // 状態
  // ---------------------------------------------------------
  let step = 0; // 次に開くべき LAYERS のインデックス（0〜4、5で完了）
  const visited = new Set();

  // ---------------------------------------------------------
  // 要素参照
  // ---------------------------------------------------------
  const talisman = document.getElementById("fu-talisman");
  const panel = document.getElementById("fu-panel");
  const completion = document.getElementById("fu-completion");
  const noteLink = document.getElementById("note-link");

  // ---------------------------------------------------------
  // 護符（インタラクティブ版）を生成
  // ---------------------------------------------------------
  function buildTalisman() {
    talisman.innerHTML = "";
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        const ch = GRID[r][c];
        const cell = document.createElement("button");
        cell.type = "button";
        cell.className = "fu-cell";
        cell.textContent = ch;
        cell.dataset.char = ch;
        cell.setAttribute("aria-label", ch + "の札");
        if (r === 2 && c === 2) cell.classList.add("center-cell");
        cell.addEventListener("click", onCellTap);
        talisman.appendChild(cell);
      }
    }
    refreshTalisman();
  }

  // ---------------------------------------------------------
  // トップ画面のミニ護符プレビューは実写画像（images/fu-preview.jpg）
  // を使用するため、ここでの動的生成は行わない。
  // ---------------------------------------------------------

  // 現在の進行状況に応じて、各セルの見た目とタップ可否を更新
  function refreshTalisman() {
    const nextChar = step < LAYERS.length ? LAYERS[step].char : null;
    const cells = talisman.querySelectorAll(".fu-cell");
    cells.forEach((cell) => {
      const ch = cell.dataset.char;
      cell.classList.remove("dim", "active-target", "visited");
      if (visited.has(ch)) {
        cell.classList.add("visited");
        cell.tabIndex = -1;
        cell.setAttribute("aria-disabled", "true");
      } else if (ch === nextChar) {
        cell.classList.add("active-target");
        cell.tabIndex = 0;
        cell.removeAttribute("aria-disabled");
      } else {
        cell.classList.add("dim");
        cell.tabIndex = -1;
        cell.setAttribute("aria-disabled", "true");
      }
    });

    if (step >= LAYERS.length) {
      talisman.classList.add("grid-complete");
    } else {
      talisman.classList.remove("grid-complete");
    }
  }

  // セルタップ処理
  function onCellTap(e) {
    const cell = e.currentTarget;
    if (!cell.classList.contains("active-target")) return;

    const layer = LAYERS[step];
    visited.add(layer.char);
    showLayerPanel(layer);

    step += 1;
    refreshTalisman();

    if (step >= LAYERS.length) {
      revealCompletion();
    }
  }

  // 説明パネルを表示
  function showLayerPanel(layer) {
    panel.innerHTML = "";
    panel.classList.remove("fu-panel"); // reflowでアニメーションを再生
    void panel.offsetWidth;
    panel.classList.add("fu-panel");

    const heading = document.createElement("p");
    heading.className = "fu-panel-heading";
    heading.textContent = layer.title;

    const sub = document.createElement("p");
    sub.className = "fu-panel-sub";
    sub.textContent = layer.sub;

    const textWrap = document.createElement("div");
    textWrap.className = "fu-panel-text";
    layer.body.forEach((line) => {
      const p = document.createElement("p");
      p.textContent = line;
      textWrap.appendChild(p);
    });

    panel.appendChild(heading);
    panel.appendChild(sub);
    panel.appendChild(textWrap);
  }

  // 完成演出を表示
  function revealCompletion() {
    completion.hidden = false;
    completion.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  // 五重の進行のみをリセット（「今日の記」は消さない）
  function restartReading() {
    step = 0;
    visited.clear();
    completion.hidden = true;
    panel.innerHTML = '<p class="fu-panel-hint">中央の「祈」に触れてください。</p>';
    refreshTalisman();
    document.getElementById("screen-fu").scrollTo?.(0, 0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ---------------------------------------------------------
  // 今日の記（localStorage）
  // ---------------------------------------------------------
  const recordInput = document.getElementById("fu-record-input");
  const recordSaved = document.getElementById("fu-record-saved");

  function loadRecord() {
    try {
      const v = window.localStorage.getItem(STORAGE_KEY);
      if (v !== null) recordInput.value = v;
    } catch (err) {
      /* localStorageが使用できない環境では無視する */
    }
  }

  function saveRecord() {
    try {
      window.localStorage.setItem(STORAGE_KEY, recordInput.value);
      flashSaved();
    } catch (err) {
      /* 保存できない場合も静かに無視する */
    }
  }

  function clearRecord() {
    const hasText = recordInput.value.trim().length > 0;
    if (hasText && !window.confirm("今日の記を消します。よろしいですか。")) return;
    recordInput.value = "";
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (err) {}
  }

  let savedTimer = null;
  function flashSaved() {
    recordSaved.textContent = "記しました。";
    recordSaved.classList.add("show");
    if (savedTimer) clearTimeout(savedTimer);
    savedTimer = setTimeout(() => {
      recordSaved.classList.remove("show");
    }, 2400);
  }

  // ---------------------------------------------------------
  // 画面遷移
  // ---------------------------------------------------------
  const screens = {
    home: document.getElementById("screen-home"),
    fu: document.getElementById("screen-fu"),
    story: document.getElementById("screen-story"),
    explain: document.getElementById("screen-explain"),
  };
  const navButtons = document.querySelectorAll(".nav-btn");

  function showScreen(name) {
    Object.keys(screens).forEach((key) => {
      screens[key].classList.toggle("active", key === name);
    });
    navButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.screen === name);
    });
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  // ---------------------------------------------------------
  // イベント結線
  // ---------------------------------------------------------
  document.getElementById("btn-home").addEventListener("click", () => showScreen("home"));
  document.getElementById("btn-open-fu").addEventListener("click", () => showScreen("fu"));
  document.getElementById("btn-open-story").addEventListener("click", () => showScreen("story"));
  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => showScreen(btn.dataset.screen));
  });

  document.getElementById("btn-restart").addEventListener("click", restartReading);
  document.getElementById("btn-record-save").addEventListener("click", saveRecord);
  document.getElementById("btn-record-clear").addEventListener("click", clearRecord);

  if (noteLink) noteLink.href = NOTE_URL;

  // ---------------------------------------------------------
  // 初期化
  // ---------------------------------------------------------
  buildTalisman();
  loadRecord();
  showScreen("home");
})();
