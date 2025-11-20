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


let wakaran = document.getElementById('modal-mouyokuwakannai');
let warningModal = document.getElementById('modal-mouyokuwakannai');
let warningClose = document.getElementById('warning-close');

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

// ショップボタンをクリックでモーダルを表示
shopButton.addEventListener('click', function () {
  modalShop.classList.remove('hidden'); // 表示
  modalShopText.textContent = "ショップを開きました！"; // テキスト更新
});

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



let modalShopClose = document.getElementById('modal-shop-close');
modalShopClose.addEventListener('click', function () {
  modalShop.classList.add('hidden'); // 非表示
});


let shopok = document.getElementById('shop-ok');
shopok.addEventListener('click', function () {
  const cost = 10;

  if (count < cost) {
    // 足りない場合
    let remaining = cost - count;
    document.getElementById('kounyuumadenokurikkusuu').textContent = remaining;
    wakaran.classList.remove('hidden-mouyokuwakannai'); // 警告表示
    return;
  }

  // 足りている場合
  count -= cost;
  countDisplay.textContent = count;

  // 自動クリック開始
  if (!autoClickInterval) {
    autoClickInterval = setInterval(function () {
      count += 1;
      countDisplay.textContent = count;
    }, 1000);
  }

  shoponeCount++;
  nanshopone.textContent = shoponeCount;

  // ここでショップモーダルを閉じる
  modalShop.classList.add('hidden-shop');
});




