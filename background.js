// Copyright 2018 SightSeekerStudio.com. All rights reserved.

chrome.runtime.onMessage.addListener(
  function (message, callback) {
    function calculatePricePerTsubo() {
      console.log('坪単価計算開始:');
      let propertyUnits = document.getElementsByClassName("property_unit");

      for (const pu of propertyUnits) {

        // get 販売価格取得
        let dv = pu.getElementsByClassName("dottable-value")[0];
        let strPrice = dv.innerHTML;

        // 億と万円を除去して数値化(単位は万円)
        let price = parseInt(strPrice.replace(/億/g, "").replace(/万円/g, ""));

        // 専有面積情報取得
        let df = pu.getElementsByClassName("dottable-fix")[0];
        let strSquareSize = df.getElementsByTagName("dd")[0].innerText
        let squareMeter = parseFloat(strSquareSize.split("m")[0]);
        // 専有面積を坪に変換(計算)
        let tsubo = squareMeter / 3.30579;

        // 販売価格と専有面積(坪) から 坪単価計算
        let pricePerTsubo = Math.round(price / tsubo);

        // 計算した坪単価表示
        let pricePerTsuboElement = document.createElement("span");
        pricePerTsuboElement.innerHTML = "(坪単価: " + pricePerTsubo + "万円)";
        dv.parentNode.appendChild(pricePerTsuboElement);
      }
      return true;
    }

    chrome.tabs.executeScript({
      code: '(' + calculatePricePerTsubo + ')();'
    });
  }
);
