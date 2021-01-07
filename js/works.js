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

  lastPos = pos; // 最後のスクロール位置を保存
};

//header change
const headerChange = () => {
  let scroll = window.pageYOffset || document.documentElement.scrollTop;//ドキュメント上端のスクロール量（上端）
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
    let scroll = window.pageYOffset || document.documentElement.scrollTop;//ドキュメント上端のスクロール量（上端）
    const rect = fadeInTarget[i].getBoundingClientRect().top;//ブラウザ上端からの相対距離
    const offset = rect + scroll;//ドキュメント上端からの絶対位置
    //const windowHeight = window.innerHeight; // 現在のブラウザの高さ
    if (scroll > offset - winH + 100) {
      fadeInTarget[i].classList.remove('is-hide');
    }
  }
};






//modal
let btn = document.querySelectorAll('.works__img');
const modal = document.querySelector('.modal');
const modalImg = document.querySelector('.modal__img');
const modalClose = document.querySelector('.modal__close');
const body = document.querySelector('body');

const preLoad = () => {
  for (let i = 0; i < btn.length; i++){
    var img = document.createElement('img');
    img.src = btn[i].dataset.img;
  }
};

for (let i = 0; i < btn.length; i++){
  btn[i].addEventListener('click', function() {
    modalImg.src = '';
    modalImg.src = btn[i].dataset.img;
    modal.classList.add("is-show");
    body.classList.add("no-scroll");
  });
}

modalClose.addEventListener('click', function() {
  modal.classList.remove("is-show");
  body.classList.remove("no-scroll");
});

window.addEventListener('click', function(e) {
  if (e.target == modal) {
    modal.classList.remove("is-show");
    body.classList.remove("no-scroll");
  }
});

window.addEventListener("scroll", () => {
    onScroll();
    headerChange();
    scrollEffect();
  });

  window.addEventListener('load', function(){
    preLoad();
    scrollEffect();
  });