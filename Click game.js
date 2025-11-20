let count = 0; //クリック数
let clickPower = 1; // 1クリックで増える量
let rebornIndex = 0; // 現在のリボーン回数
let rebornThresholds = [100, 300, 900, 1800];

let countDisplay = document.getElementById('count');
let clickPowerDisplay = document.getElementById('click-power');
let myButton = document.getElementById('my-button');
let rebornButton = document.getElementById('reborn-button');

let modal = document.getElementById('modal');
let modalText = document.getElementById('modal-text');
let modalOk = document.getElementById('modal-ok');
let modalCancel = document.getElementById('modal-cancel');
let modalcontaine = document.getElementById('modal-containe');

// ショップモーダル用の変数
let shopButton = document.getElementById('subcontainer-shop-button');
let modalShop = document.getElementById('modal-shop');
let modalShopText = document.getElementById('modal-shop-text');


let keikoku = document.getElementById('modal-keikoku');
let keikokuclose = document.getElementById('modal-keikoku-close');
let shopOkKaunto = document.getElementById('shop-ok-kaunto');

//　クリックパワーを定義
clickPower = 1;


//　クリックパワーに応じてクリックしたときにカウントが増えカウントによって色が変わる
myButton.addEventListener('click', function () {
  count += clickPower;
  countDisplay.textContent = count;

  if (count === 10) countDisplay.style.color = 'red';
  if (count === 50) countDisplay.style.color = 'blue';
  if (count >= 100) countDisplay.style.color = 'green';
});

// リボーンボタン
rebornButton.addEventListener('click', function () {
  let threshold = rebornThresholds[rebornIndex] || Infinity;
  if (count < threshold) {
    modalText.textContent = `クリック数が${threshold}回行ったらリボーンできるよ`;
    modalCancel.style.display = "none";
  } else {
    modalText.textContent = `リボーンしますか？（クリックパワー +1）`;
    modalCancel.style.display = "block";
  }
  modal.classList.remove('hidden');
});

//ショップモーダル表示
shopButton.addEventListener('click', function () {
  modalShop.classList.remove('hidden'); // 表示
  modalShopText.textContent = "ショップを開きました！"; // テキスト更新
});
//ショップモーダル表示

// OKボタン
modalOk.addEventListener('click', function () {
  let threshold = rebornThresholds[rebornIndex] || Infinity;
  if (count >= threshold) {
    count = 0;
    clickPower++;
    rebornIndex++;
    countDisplay.textContent = count;
    clickPowerDisplay.textContent = clickPower; // ← ここで更新
    countDisplay.style.color = '#555555';
  }
  modal.classList.add('hidden');
});

// キャンセル
modalCancel.addEventListener('click', function () {
  modal.classList.add('hidden');
});

// キャンセル
keikokuclose.addEventListener('click', function () {
  keikoku.classList.add('hidden');
});



//ショップキャンセルボタン
let modalShopClose = document.getElementById('modal-shop-close');
modalShopClose.addEventListener('click', function () {
  modalShop.classList.add('hidden'); // 非表示
});
//ショップキャンセルボタン

let kounyuukaunnto = 0

// 自動クリックパワーを保持
let autoClickPower = 0;

let autoClickInterval; // 自動クリック用 interval ID

let shopok1 = document.getElementById('shop-ok1');
shopok1.addEventListener('click', function () {
  const cost = 10;

  if (count < cost) {
    // 足りない場合
    let remaining = cost - count;
    document.getElementById('tarinai').textContent = remaining;
    modalShop.classList.add('hidden'); // ショップモーダル非表示
    keikoku.classList.remove('hidden'); // 警告表示
    return;
  }

  autoClickPower++; // クリック回数に応じてパワーアップ
  // 足りている場合
  count -= cost;
  countDisplay.textContent = count;

  // 自動クリック開始（まだ開始してなければ）
  if (!autoClickInterval) {
    autoClickInterval = setInterval(() => {
      count += autoClickPower;         // 回数分だけカウントを増やす
      countDisplay.textContent = count;
    }, 1000);
  }



  kounyuukaunnto++;
  shopOkKaunto.textContent = kounyuukaunnto;

});







