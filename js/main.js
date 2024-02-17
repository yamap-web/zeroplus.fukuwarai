'use strict';

/*jshint esversion: 6 */
window.addEventListener('DOMContentLoaded', () => {
  // variables
  let prop_topValue;
  let prop_topUnit = 'px';
  let prop_leftValue;
  let prop_leftUnit = 'px';
  let currentIndex = 0;
  const imgDir = 'images/';
  const parts = [
    {
      name: '左まゆげ',
      image: imgDir + 'eyebrows-left.png',
      top: {
        value: prop_topValue,
        unit: prop_topUnit,
      },
      left: {
        value: prop_leftValue,
        unit: prop_leftUnit,
      },
      width: ''.concat(((143 / 560) * 100 * 450) / 300, '%'),
      input: false,
    },
    {
      name: '右まゆげ',
      image: imgDir + 'eyebrows-right.png',
      top: {
        value: prop_topValue,
        unit: prop_topUnit,
      },
      left: {
        value: prop_leftValue,
        unit: prop_leftUnit,
      },
      width: ''.concat(((143 / 560) * 100 * 450) / 300, '%'),
      input: false,
    },
    {
      name: '左目',
      image: imgDir + 'eye-left.png',
      top: {
        value: prop_topValue,
        unit: prop_topUnit,
      },
      left: {
        value: prop_leftValue,
        unit: prop_leftUnit,
      },
      width: ''.concat(((112 / 560) * 100 * 450) / 300, '%'),
      input: false,
    },
    {
      name: '右目',
      image: imgDir + 'eye-right.png',
      top: {
        value: prop_topValue,
        unit: prop_topUnit,
      },
      left: {
        value: prop_leftValue,
        unit: prop_leftUnit,
      },
      width: ''.concat(((112 / 560) * 100 * 450) / 300, '%'),
      input: false,
    },
    {
      name: '鼻',
      image: imgDir + 'nose.png',
      top: {
        value: prop_topValue,
        unit: prop_topUnit,
      },
      left: {
        value: prop_leftValue,
        unit: prop_leftUnit,
      },
      width: ''.concat(((144 / 560) * 100 * 450) / 300, '%'),
      input: false,
    },
    {
      name: '口',
      image: imgDir + 'mouth.png',
      top: {
        value: prop_topValue,
        unit: prop_topUnit,
      },
      left: {
        value: prop_leftValue,
        unit: prop_leftUnit,
      },
      width: ''.concat(((247 / 560) * 100 * 450) / 300, '%'),
      input: false,
    },
  ];
  const partsLength = parts.length;

  // selectors
  const nextBtn = document.querySelector('.js_next');
  const prevBtn = document.querySelector('.js_prev');
  const currentNumDisplay = document.querySelector('.js_current');
  const lengthNumDisplay = document.querySelector('.js_length');
  const inputValue = document.querySelectorAll('.property_value');
  const inputUnit = document.querySelectorAll('.property_unit');
  const partImg = document.querySelector('.js_part-img');
  const patName = document.querySelector('.js_part-name');
  const valueTop = document.querySelector('.js_value__top');
  const unitTop = document.querySelector('.js_unit__top');
  const valueLeft = document.querySelector('.js_value__left');
  const unitLeft = document.querySelector('.js_unit__left');
  const completeBtn = document.querySelector('.js_complete-btn');
  const convertBtn = document.querySelector('.js_convert-btn');
  const retryBtn = document.querySelector('.js_retry-btn');

  // functions
  // 今表示しているパーツの番号と総数の表示
  const SelectNumDisplay = () => {
    currentNumDisplay.textContent = currentIndex + 1;
    lengthNumDisplay.textContent = partsLength;
  };

  SelectNumDisplay();

  // 入力値の上限を変更
  const ChangeMaxNum = () => {
    if (parts[currentIndex].top.unit == '%') {
      valueTop.setAttribute('max', '100');
    } else if (parts[currentIndex].top.unit == 'px') {
      valueTop.setAttribute('max', '300');
    }

    if (parts[currentIndex].left.unit == '%') {
      valueLeft.setAttribute('max', '100');
    } else if (parts[currentIndex].left.unit == 'px') {
      valueLeft.setAttribute('max', '300');
    }
  };

  // 手動入力で上限を超えた時に上限に変更
  const InputMaxNum = (element) => {
    if (
      element.getAttribute('min') !== null &&
      parseInt(element.value) < parseInt(element.getAttribute('min'))
    )
      element.value = element.getAttribute('min');
    else if (
      element.getAttribute('max') !== null &&
      parseInt(element.value) > parseInt(element.getAttribute('max'))
    )
      element.value = element.getAttribute('max');
    else if (element.getAttribute('min') !== null && element.value === '')
      element.value = element.getAttribute('min');
  };

  // すべて入力したら、ボタンを押せるようにする
  const CheckInputNum = () => {
    parts.forEach((element) => {
      if (
        Number.isFinite(parseFloat(element.top.value)) &&
        Number.isFinite(parseFloat(element.left.value))
      ) {
        element.input = true;
      }
    });

    const inputNumFlag = (flag) => {
      return flag.input == true;
    };

    if (parts.every(inputNumFlag)) {
      completeBtn.classList.add('is-active');
      completeBtn.setAttribute('tabindex', '0');
    }
  };

  // 変更した値を反映
  partImg.style.width = `${
    (parts[currentIndex].width.replace(/[^0-9.]/g, '') / 100) * 300
  }px`;

  const PropOutput = () => {
    partImg.src = parts[currentIndex].image;
    partImg.style.width = `${
      (parts[currentIndex].width.replace(/[^0-9.]/g, '') / 100) * 300
    }px`;

    patName.textContent = parts[currentIndex].name;
    valueTop.value = parts[currentIndex].top.value;
    unitTop.value = parts[currentIndex].top.unit;
    valueLeft.value = parts[currentIndex].left.value;
    unitLeft.value = parts[currentIndex].left.unit;

    ChangeMaxNum();
  };

  // 次へボタンをクリック
  nextBtn.addEventListener('click', (event) => {
    event.preventDefault();
    currentIndex = (currentIndex + 1) % partsLength;
    SelectNumDisplay();
    PropOutput();
  });

  // 戻るボタンをクリック
  prevBtn.addEventListener('click', (event) => {
    event.preventDefault();
    currentIndex--;

    if (currentIndex < 0) {
      currentIndex = partsLength - 1;
    }

    SelectNumDisplay();
    PropOutput();
  });

  // TopかLeftの数値を変更
  inputValue.forEach((input) => {
    input.addEventListener('change', (event) => {
      event.preventDefault();

      InputMaxNum(input);

      // 変更したtopの数値を配列に代入
      let prop_topValueChanged = valueTop.value;
      prop_topValue = prop_topValueChanged;
      parts[currentIndex].top.value = prop_topValue;

      // 変更したleftの数値を配列に代入
      let prop_leftValueChanged = valueLeft.value;
      prop_leftValue = prop_leftValueChanged;
      parts[currentIndex].left.value = prop_leftValue;

      CheckInputNum();
    });
  });

  // TopかLeftの単位を変更
  inputUnit.forEach((unit) => {
    unit.addEventListener('change', (event) => {
      event.preventDefault();

      // 変更したtopの単位を配列に代入
      let prop_topUnitChanged = unitTop.value;
      prop_topUnit = prop_topUnitChanged;
      parts[currentIndex].top.unit = prop_topUnit;

      // 変更したleftの単位を配列に代入
      let prop_leftUnitChanged = unitLeft.value;
      prop_leftUnit = prop_leftUnitChanged;
      parts[currentIndex].left.unit = prop_leftUnit;

      ChangeMaxNum();
    });
  });

  // 完成ボタンをクリック
  completeBtn.addEventListener('click', (event) => {
    event.preventDefault();

    // 配列に代入した結果をそれぞれの画像と一緒に出力
    parts.forEach((element) => {
      const canvas = document.querySelector('.js_canvas');
      const imgElement = document.createElement('img');
      imgElement.src = element.image;
      imgElement.alt = '';
      imgElement.style.objectFit = 'contain';
      imgElement.style.width = element.width;
      imgElement.style.height = 'auto';
      imgElement.style.position = 'absolute';
      imgElement.style.top = element.top.value + element.top.unit;
      imgElement.style.left = element.left.value + element.left.unit;
      canvas.appendChild(imgElement);
    });

    // 顔の上のフィルターを非表示にする
    const canvasFilters = document.querySelectorAll('.js_canvas-filter');
    canvasFilters.forEach((canvasFilter) => {
      canvasFilter.classList.add('is-filter-hide');
    });

    // パーツ画像や入力欄を非表示にする
    const propertyDisplay = document.querySelector('.js_property-display');
    const partDisplay = document.querySelector('.js_part-display');
    propertyDisplay.style.visibility = 'hidden';
    partDisplay.style.visibility = 'hidden';

    // 完成ボタンを非表示にして、変換ボタンを表示
    completeBtn.style.display = 'none';
    convertBtn.style.display = 'block';
  });

  // 画像に変換してダウンロード
  const convertToImage = () => {
    const domData = document.getElementById('dom-data');
    domtoimage.toPng(domData)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'css-fukuwarai.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error);
      });
  };

  // 変換ボタンをクリック
  convertBtn.addEventListener('click', (event) => {
    event.preventDefault();
    convertToImage();

    // 変換ボタンを非表示にして、リトライボタンを表示
    retryBtn.style.display = 'block';

    // リトライボタンをクリック
    retryBtn.addEventListener('click', (event) => {
      event.preventDefault();
      location.reload();
    });
  });
});

// ページの高さを調整
window.addEventListener('load', () => {
  const windowHeight = window.innerHeight;
  const headerHeight = document.querySelector('.header').offsetHeight;
  const footerHeight = document.querySelector('.footer').offsetHeight;
  const mainHeight = windowHeight - (headerHeight + footerHeight);
  document.querySelector('.main').style.height = mainHeight + 'px';
});