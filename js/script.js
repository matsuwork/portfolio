// header pin
const header = document.querySelector(".header");
const hH = header.clientHeight;
const winH = window.innerHeight;
const docH = document.documentElement.scrollHeight;
const windBtm = docH - winH;

let pos = 0;// 現在地
let lastPos = 0;// スクロール直前の位置

const onScroll = () => {
  pos = window.scrollY;// スクロールするごとにpos（現在地）の値を更新

  if (pos > hH && pos > lastPos) {
    header.classList.add("is-unpinned");
  }
  if (pos < hH || pos < lastPos || windBtm <= pos) {
    header.classList.remove("is-unpinned");
  }

  // 最後のスクロール位置を保存
  lastPos = pos;
};

//header change
const headerChange = () => {
  const scroll = window.pageYOffset || document.documentElement.scrollTop;//ドキュメント上端のスクロール量（上端）
  if (scroll == 0) {
    header.classList.remove('is-scroll');
  } else {
    header.classList.add('is-scroll');
  }
};

//scroll effect
let fadeInTarget = document.querySelectorAll('.is-hide');
const scrollEffect = () => {
  for (let i = 0; i < fadeInTarget.length; i++){
    const rect = fadeInTarget[i].getBoundingClientRect().top;//ブラウザ上端からの相対距離
    const scroll = window.pageYOffset || document.documentElement.scrollTop;//ドキュメント上端のスクロール量（上端）
    const offset = rect + scroll;//ドキュメント上端からの絶対位置
    //const windowHeight = window.innerHeight; // 現在のブラウザの高さ
    if (scroll > offset - winH + 100) {
      fadeInTarget[i].classList.remove('is-hide');
    }
  }
};

window.addEventListener("scroll", () => {
  onScroll();
  headerChange();
  scrollEffect();
});

window.addEventListener('load', function(){
  scrollEffect();
});