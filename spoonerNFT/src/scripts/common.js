// 유지보수를 고려하여 mintList, gradeDetail 배열의 정보를 추가 및 수정 시 계산식이 적용되도록 처리 하였습니다.
const mintList = [1, 2, 3, 4];
const gradeDetail = [
  {
    gradeName: 'A CLASS',
    price: 100,
    revenue: 12.94747572,
    returnRate: 13,
  },
  {
    gradeName: 'K CLASS',
    price: 10,
    revenue: 1.257754784,
    returnRate: 13,
  },
  {
    gradeName: 'Q CLASS',
    price: 5,
    revenue: 0.616546463,
    returnRate: 12,
  },
  {
    gradeName: 'J CLASS',
    price: 1,
    revenue: 0.123309293,
    returnRate: 12,
  },
  {
    gradeName: '10 CLASS',
    price: 0.2,
    revenue: 0.024661859,
    returnRate: 12,
  },
];

// benefit 영역에 select된 값을 기준으로 수익율 정보를 계산해주는 함수입니다.
function setBenefitInfo() {
  let gradeSelect = document.getElementById('gradeSelect').value;
  let mintSelect = Number(document.getElementById('mintSelect').value);
  let priceBox = document.getElementById('priceBox');
  let returnRateBox = document.getElementById('returnRateBox');
  let revenueBox = document.getElementById('revenueBox');
  let gradeInfoBox = document.getElementById('gradeInfoBox');
  let price = 0;
  let revenue = 0;
  let returnRate = 0;
  let gradeInfo = '';

  if (gradeSelect !== 'default' && mintSelect !== 0) {
    for (let i = 0; i < gradeDetail.length; i++) {
      if (gradeDetail[i].gradeName === gradeSelect) {
        price = gradeDetail[i].price;
        benefit = gradeDetail[i].benefit;
        returnRate = gradeDetail[i].returnRate;
        revenue = gradeDetail[i].revenue;
        gradeInfo = mintSelect + ' ' + gradeDetail[i].gradeName;
      }
    }
    priceBox.innerHTML = Number((price * mintSelect).toFixed(2));
    returnRateBox.innerHTML = returnRate;
    revenueBox.innerHTML = revenue * mintSelect;
    gradeInfoBox.innerHTML = gradeInfo;
  }
}

// whitelist에 수량 선택 시 수량값 가져오는 함수
let qClassMint = 0;
let jClassMint = 0;
let tenClassMint = 0;
function onChangeWhiteList() {
  qClassMint = Number(document.getElementById('qClassMint').value);
  jClassMint = Number(document.getElementById('jClassMint').value);
  tenClassMint = Number(document.getElementById('tenClassMint').value);
}

// apply 버튼 클릭 시 예외처리 함수
function checkWhiteList() {
  if (qClassMint + jClassMint + tenClassMint > 0) {
    let whiteListCheck = document.getElementById('whiteListCheck');
    whiteListCheck.innerHTML =
      'Q CLASS : <em>' +
      qClassMint +
      '</em> J CLASS : <em>' +
      jClassMint +
      '</em> 10 CLASS : <em>' +
      tenClassMint +
      '</em>';
    modalPop('.modal-whitelist', true);
  } else {
    modalAlert('Select the amount to buy');
  }
}

// 선착순 지갑 400개 여부를 체크 함, true 라면 정상 등록, false 라면 알럿 문구 노출.
function whiteListSubmit() {
  modalPop('.modal-whitelist', false);
  // 선착순 지갑 400 개 승인 여부를 해당 조건문에서 판단이 필요.
  if (true) {
    document.querySelector('.whitelist-apply').style.display = 'none';
    document.querySelector('.apply-complete').style.display = 'block';
    document.getElementById('applyCountQ').innerHTML = qClassMint;
    document.getElementById('applyCountJ').innerHTML = jClassMint;
    document.getElementById('applyCountTen').innerHTML = tenClassMint;
  } else {
    modalAlert('Sorry, Whitelist application is ended.');
  }
}

// B안에서 쓰이는 함수
function whiteListSubmitB() {
  modalPop('.modal-whitelist', false);
  document.querySelector('.whitelist-apply').style.display = 'none';
  document.querySelector('.apply-complete').style.display = 'block';
}

// 페이지 스크롤 시 GNB 노출 여부 함수 입니다.
function navScroll() {
  const ScrollChk = window.scrollY || document.documentElement.scrollTop;
  const setScroll = document.querySelector('#root').classList;
  ScrollChk <= 0 ? setScroll.remove('nav-fixed') : setScroll.add('nav-fixed');
}

// 모바일 메뉴 노출 toggle 함수 입니다.
function mobileNavToggle() {
  const headerItem = document.querySelector('header');
  headerItem.classList.value.indexOf('mobile-nav') !== -1
    ? headerItem.classList.remove('mobile-nav')
    : headerItem.classList.add('mobile-nav');
}

// 모달 팝업 호출 시 modalPop(tagName, Boolean); 형태로 함수를 호출합니다.
function modalPop(tagName, modalBoolean) {
  let modalItem = document.querySelector(tagName);
  modalBoolean
    ? (modalItem.style.display = 'flex')
    : (modalItem.style.display = 'none');
}

// 모달 알럿 팝업을 띄우는 함수 입니다. 매개변수 comment에 알럿 문구를 입력하여 선언 시 OK 버튼이 노출되는 알럿 입니다. 짧은 문구의 comment 정도만 가능합니다.
// ex) modalAlert('Sorry, Whitelist application is ended.');
function modalAlert(comment) {
  let commentItem = document.querySelector('.modal-alert-comment');
  commentItem.innerHTML = comment;
  modalPop('.modal-alert', true);
}

// 메뉴 이동 함수 입니다. 매개변수로 tagName 값을 받고, 해당 tagName으로 지정한 위치로 스크롤 이동 시킵니다.
let intervalScroll;
function scrollMove(tagName, gap) {
  if (document.querySelector(tagName) === null) {
    return false;
  }
  gap !== undefined ? gap : (gap = 25);
  let positionY =
    window.pageYOffset +
    document.querySelector(tagName).getBoundingClientRect().top;
  let scrollPosition = window.scrollY || document.documentElement.scrollTop;
  let scrollMoving = scrollPosition;
  clearInterval(intervalScroll);

  intervalScroll = setInterval(function () {
    if (Math.floor(positionY / gap) === Math.floor(scrollMoving / gap)) {
      scrollMoving = positionY;
      window.scrollTo({ top: positionY });
      clearInterval(intervalScroll);
    } else if (positionY < scrollMoving) {
      window.scrollTo({ top: scrollMoving });
      scrollMoving -= gap;
    } else if (positionY > scrollMoving) {
      window.scrollTo({ top: scrollMoving });
      scrollMoving += gap;
    }
  }, 1);
}

// 숫자가 한자리일 때 앞에 0 표시해주는 함수
function handleToString(num) {
  if (String(num).length == 1) {
    return '0' + num;
  } else {
    return num;
  }
}

Math.trunc =
  Math.trunc ||
  function (x) {
    if (isNaN(x)) {
      return NaN;
    }
    if (x > 0) {
      return Math.floor(x);
    }
    return Math.ceil(x);
  };

// 기준점 기준으로 카운트 다운 함수
function countDown() {
  let eventStartDt = '2022-02-22 09:00:00'; // 기준점
  let CountYear = parseInt(eventStartDt.substring(0, 4), 10);
  let CountMonth = parseInt(eventStartDt.substring(5, 7), 10);
  let CountDate = parseInt(eventStartDt.substring(8, 10), 10);
  let CountHours = parseInt(eventStartDt.substring(11, 13), 10);
  let CountMinutes = parseInt(eventStartDt.substring(14, 16), 10);
  let CountSeconds = parseInt(eventStartDt.substring(17, 19), 10);
  let CountMilliseconds = 0;
  let date = new Date(
    CountYear,
    CountMonth - 1,
    CountDate,
    CountHours,
    CountMinutes,
    CountSeconds,
    CountMilliseconds
  );

  let timer = date.getTime();
  let now = new Date();
  let gap = Math.round(timer - now.getTime());
  let DD = handleToString(Math.trunc(gap / 1000 / 60 / 60 / 24));
  let HH = handleToString(Math.trunc((gap / 1000 / 60 / 60) % 24));
  let MM = handleToString(Math.trunc((gap / 1000 / 60) % 60));

  document.getElementById('days').innerHTML = DD + HH + MM < 0 ? '00' : DD;
  document.getElementById('hours').innerHTML = DD + HH + MM < 0 ? '00' : HH;
  document.getElementById('min').innerHTML = DD + HH + MM < 0 ? '00' : MM;
}

// 영상 노출 팝업 함수입니다. 매개변수로 url(영상URL), popWid(영상 가로길이), popHei(영상 세로높이) 값을 받으며, 길이, 높이 값을 지정하지 않을 시 70rem x 70rem으로 고정됩니다.
// 영상 주소는 공유하기 주소 형태로 들어가야 합니다.
// ex)
// X : https://vimeo.com/673045195
// O : https://player.vimeo.com/video/673045195
function modalPlayer(url, popWid, popHei) {
  let modalContent =
    '<button type="button" class="btn-close" onclick="modalPop(\'.modal-player\', false); document.querySelector(\'.modal-content-player\').innerHTML=\'\';">닫기</button>' +
    '<iframe src="' +
    url +
    '" width="100%" height="100%" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';

  document.querySelector('.modal-content-player').innerHTML = modalContent;
  document.querySelector('.modal-content-player').style.width =
    (popWid !== undefined ? Math.floor(popWid / 10) : 70) + 'rem';
  document.querySelector('.modal-content-player').style.height =
    (popHei !== undefined ? Math.floor(popHei / 10) : 70) + 'rem';
  modalPop('.modal-player', true);
}

window.addEventListener('load', function () {
  // 페이지 로드 시 mintList, gradeDetail 값을 기준으로 benefit 영역의 selectbox 에 목록을 그려줍니다.
  gradeDetail.forEach(function (data) {
    document.getElementById('gradeSelect').innerHTML +=
      '<option value="' + data.gradeName + '">' + data.gradeName + '</option>';
  });

  let mintSelectLists = document.querySelectorAll('.mint-select');
  mintList.forEach(function (data) {
    mintSelectLists.forEach(function (mintSelectItem) {
      mintSelectItem.innerHTML +=
        '<option value="' + data + '">' + data + '</option>';
    });
  });
  countDown();
  setInterval(countDown, 3000);
});

window.addEventListener('scroll', function () {
  navScroll();
});
