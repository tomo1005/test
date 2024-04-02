

// ――――――――――――――――――――――――――― //
//   URL末尾とスライド番号連携   //
// ――――――――――――――――――――――――――― //

// URLパラメータを名前で取得する関数
function getUrlParameter(name) {
  name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// URLパラメータからスライド番号を取得する。
var initialSlide = parseInt(getUrlParameter("slide")) || 1;

// 初期スライド番号でSwiperを初期化
var parentSwiper = new Swiper(".nested-slider-v", {
  // direction: "vertical",
  // mousewheel: true,
  keyboard: true,
  loop: true,
  // shortSwipes: false,
  // pagination: {
  //   el: ".swiper-pagination",
  //   clickable: true,
  // },
  navigation: {
    nextEl: ".parent-navi-next",
    prevEl: ".parent-navi-prev",
  },
  initialSlide: initialSlide - 1, // スワイパーのインデックスは0ベースなので、1を引く。
});

// 入れ子のスワイパーの初期化
var childSwipers = document.querySelectorAll(
  ".nested-slider-v .nested-slider-child"
);
childSwipers.forEach(function (childSwiper) {
  new Swiper(childSwiper, {
    // direction: "vertical",
    // mousewheel: true,
    // shortSwipes: false,
    nested: true,
    // pagination: {
    //   el: childSwiper.querySelector(".swiper-pagination"),
    //   clickable: true,
    // },
    navigation: {
      nextEl: childSwiper.querySelector(".child-navi-next"),
      prevEl: childSwiper.querySelector(".child-navi-prev"),
    },
  });
});

// 現在のスライド番号でURLを更新する機能
function updateURLWithSlideNumber() {
  var currentSlideIndex = parentSwiper.realIndex + 1; // スワイパーのインデックスは0ベースなので、1を加える。
  history.replaceState(
    //このメソッドは非同期です。移動が完了したときを検知できない
    // history.pushState(    //このメソッドは同期です。移動が完了したときを検知できる
    {},
    document.title,
    window.location.pathname + "?slide=" + currentSlideIndex
  );
}

// スライドの変更時にURLを更新
parentSwiper.on("slideChange", function () {
  updateURLWithSlideNumber();
  // window.location.reload();
});

// URLの初期更新
updateURLWithSlideNumber();

// ――――――――――――――――――――――――――― //
//   URL末尾とスライド番号連携   //
// ――――――――――――――――――――――――――― //

// コピペスクリプト

document.addEventListener("DOMContentLoaded", function () {
  var copyDivs = document.querySelectorAll(".copy-value");

  copyDivs.forEach(function (div) {
    div.addEventListener("click", function (event) {
      var textToCopy = this.getAttribute("data-clipboard-text");

      // テキストをクリップボードにコピーするための一時的な要素を作成
      var tempInput = document.createElement("input");
      tempInput.style.position = "absolute";
      tempInput.style.left = "-1000px";
      tempInput.value = textToCopy;
      document.body.appendChild(tempInput);

      // テキストを選択してクリップボードにコピー
      tempInput.select();
      document.execCommand("copy");

      // 一時的な要素を削除
      document.body.removeChild(tempInput);

      // すでに表示されている"Copied!"メッセージを削除
      var existingMessage = document.querySelector(".copied-message");
      if (existingMessage) {
        existingMessage.parentNode.removeChild(existingMessage);
      }

      // "Copied!" メッセージを作成して要素内に挿入
      var copiedMessage = document.createElement("div");
      copiedMessage.textContent = "Copied!";
      copiedMessage.className = "copied-message";
      div.appendChild(copiedMessage);

      // 1秒後にメッセージを削除
      setTimeout(function () {
        div.removeChild(copiedMessage);
      }, 1000);
    });
  });
});

// コピペスクリプト
