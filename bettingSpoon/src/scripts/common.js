// 글자줄임함수 (MetaMask 지갑 ID의 글자수 줄임용 함수입니다.)
// 매개변수 key : 글자수 줄임이 필요한 문구를 넣습니다.
// frontLength, endLength : 노출이 필요한 처음과 끝지점의 글자수를 선언합니다. 초과하는 문자열은 ...로 생략 표기됩니다.
// ex) wordResize('12345678901234567890', 8, 8) // return : 12345678...34567890
function wordResize(key, frontLength, endLength) {
  if (key.length >= frontLength + endLength) {
    return key.substring(0, frontLength) + '...' + key.substring(key.length - endLength, key.length);
  } else {
    return key;
  }
}

// GNB 로그인 (GNB의 metamask login 시 임시로 적용된 버튼 함수입니다.)
// 로그인 성공 시 .gnb-login 영역에 버튼을 삽입합니다.
// 버튼 안에는 metamask id 값이 적용되며, wordResize 함수를 통해 "처음8자리 + ... + 끝에서 8자리" 문자열을 리턴하여 표기되도록 설정했습니다.
function setLogin(id) {
  const gnbLogin = document.querySelector('.gnb-login');
  gnbLogin.innerHTML =
    '<button type="button" class="btn-gnb-login" onclick="sampleLogout();">' + wordResize(id, 8, 8) + '</button>';
}

// GNB 로그아웃 (임시로 적용된 로그아웃 함수입니다. 초기 버튼으로 노출되도록 지정되어 있습니다.)
function sampleLogout() {
  const gnbLogin = document.querySelector('.gnb-login');
  gnbLogin.innerHTML =
    '<button type="button" class="btn-metamask" onclick="setLogin(\'0x72f29ef34139313246a1a4s4f24de372aaf3e0\');">INSTALL METAMASK</button>';
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
  modalBoolean ? (modalItem.style.display = 'flex') : (modalItem.style.display = 'none');
}

// 모달 알럿 팝업을 띄우는 함수 입니다. 매개변수 comment에 알럿 문구를 입력하여 선언 시 OK 버튼이 노출되는 알럿 입니다. 짧은 문구의 comment 정도만 가능합니다.
// ex) modalAlert('Sorry, Whitelist application is ended.');
function modalAlert(comment, btnText) {
  let commentItem = document.querySelector('.modal-alert-comment');
  let btnClose = document.querySelector('.btn-alert-close');
  commentItem.innerHTML = comment;
  btnClose.innerHTML = btnText !== undefined ? btnText : 'CHECK';
  modalPop('.modal-alert', true);
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

function playGame(gameName) {
  if (gameName === 'videoPoker') {
    document.querySelector('.game-video-poker').classList.add('active');
    document.getElementById('iframeVideoPoker').src = 'game/videoPoker/index.html';
  }
}
function endGame(gameName) {
  if (gameName === 'videoPoker') {
    document.querySelector('.game-video-poker').classList.remove('active');
    document.getElementById('iframeVideoPoker').src = '';
  }
}
function newWindowGame(gameName) {
  if (gameName === 'videoPoker') {
    document.querySelector('.game-video-poker').classList.remove('active');
    document.getElementById('iframeVideoPoker').src = '';
    window.open(
      'game/videoPoker/index.html',
      'window',
      'location=no, directories=no, resizable=no,status=no,toolbar=no, menubar=no, width=1280, height=720,left=0, top=0, scrollbars=yes'
    );
  }
}

function fullscreen(element) {
  if (document.querySelector(element).requestFullscreen) {
    document.querySelector(element).requestFullscreen();
    document.querySelector(element).classList.add('full-screen');
  }
  if (document.querySelector(element).webkitRequestFullscreen) {
    document.querySelector(element).webkitRequestFullscreen();
    document.querySelector(element).classList.add('full-screen');
  }
  if (document.querySelector(element).mozRequestFullScreen) {
    document.querySelector(element).mozRequestFullScreen();
    document.querySelector(element).classList.add('full-screen');
  }
  if (document.querySelector(element).msRequestFullscreen) {
    document.querySelector(element).msRequestFullscreen();
    document.querySelector(element).classList.add('full-screen');
  }
}

function exitFullScreen(element) {
  if (document.exitFullscreen) {
    document.exitFullscreen();
    document.querySelector(element).classList.remove('full-screen');
  }
  if (document.webkitCancelFullscreen) {
    document.webkitCancelFullscreen();
    document.querySelector(element).classList.remove('full-screen');
  }
  if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
    document.querySelector(element).classList.remove('full-screen');
  }
  if (document.msExitFullscreen) {
    document.msExitFullscreen();
    document.querySelector(element).classList.remove('full-screen');
  }
}

// begin : 2022-04 (1/2)

// 정규식 체크 함수입니다.
// id, password, email 타입으로 구분하여 입력된 문자열이 정규식에 맞는지 체크 후 결과를 return 합니다.
function validCheck(type, obj) {
  let pattern = '';
  if (type === 'id') {
    pattern = /^[a-zA-Z0-9]{6,18}$/;
  } else if (type === 'password') {
    pattern = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&()*])(?=.*[0-9]).{6,18}$/;
  } else if (type === 'email') {
    pattern = /^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/;
  }
  return obj.value.match(pattern) != null;
}

// 회원가입 시 아이디 입력란의 유효성 체크 입니다.
// 유효성 체크 후 해당 input의 형제 요소(.warning-text) 태그 안에 안내 문구를 보여줍니다.
function validUserId(obj) {
  let warningText = obj.parentNode.querySelector('.warning-text');
  if (obj.value === '') {
    warningText.innerHTML = 'Please enter a valid username.';
    obj.focus();
    return false;
  } else if (obj.value.length < 6 || obj.value.length > 18) {
    warningText.innerHTML = 'Your username should be 6~18 characters long.';
    obj.focus();
    return false;
  } else if (validCheck('id', obj) === false) {
    warningText.innerHTML = 'Your username has invalid characters, you can only use letters and numbers.';
    obj.focus();
    return false;
  } else {
    obj.parentElement.classList.add('active');
    warningText.innerHTML = '';
    return true;
  }
}

// 회원가입 시 패스워드 입력란의 유효성 체크 입니다.
// 유효성 체크 후 해당 input의 형제 요소(.warning-text) 태그 안에 안내 문구를 보여줍니다.
function validUserPwd(obj) {
  let warningText = obj.parentNode.querySelector('.warning-text');
  if (obj.value === '') {
    warningText.innerHTML = 'Please enter a valid password.';
    obj.focus();
    return false;
  } else if (obj.value.length < 6 || obj.value.length > 18) {
    warningText.innerHTML = 'Your password should be 6~18 characters long.';
    obj.focus();
    return false;
  } else if (validCheck('password', obj) === false) {
    warningText.innerHTML =
      'Your password must contain at least one letter, number and symbol (!@#$%^&()*) are allowed.';
    obj.focus();
    return false;
  } else {
    obj.parentElement.classList.add('active');
    warningText.innerHTML = '';
    return true;
  }
}

// 회원가입 시 패스워드 확인 입력란의 유효성 체크 입니다.
// 유효성 체크 후 해당 input의 형제 요소(.warning-text) 태그 안에 안내 문구를 보여줍니다.
function validMatchPwd(obj, targetObj) {
  let warningText = obj.parentNode.querySelector('.warning-text');

  if (obj.value === '') {
    warningText.innerHTML = 'Please enter a valid password.';
    obj.focus();
    return false;
  } else if (obj.value !== targetObj.value) {
    warningText.innerHTML = 'Your passwords do not match. Please try again.';
    obj.focus();
    return false;
  } else {
    obj.parentElement.classList.add('active');
    warningText.innerHTML = '';
    return true;
  }
}

// 회원가입 시 이메일 입력란의 유효성 체크 입니다.
// 유효성 체크 후 해당 input의 형제 요소(.warning-text) 태그 안에 안내 문구를 보여줍니다.
function validEmail(obj) {
  let warningText = obj.parentNode.querySelector('.warning-text');
  if (obj.value === '') {
    warningText.innerHTML = 'Please enter a valid email address.';
  } else if (validCheck('email', obj) === false) {
    warningText.innerHTML = 'Please ensure you enter a valid email address.';
    obj.focus();
    return false;
  } else {
    obj.parentElement.classList.add('active');
    warningText.innerHTML = '';
    return true;
  }
}

// 회원가입 시 필수동의 체크박스 함수 입니다.
// 체크여부 확인 후 해당 input의 부모 형제 요소(.warning-text) 태그 안에 안내 문구를 보여줍니다.
function validAgeAgree(obj) {
  let warningText = obj.parentNode.parentNode.querySelector('.warning-text');
  if (!obj.checked) {
    warningText.innerHTML = 'Please show that you agree to our terms and conditions.';
    ageAgree.focus();
    return false;
  } else {
    warningText.innerHTML = '';
    return true;
  }
}

// 회원가입 Join 버튼 선택 시 submit 함수 입니다. 타 페이지에서 사용될 수 있다고 판단되어 매개변수로 form name 값을 받습니다.
// 각 항목별 유효성 검사 후 알럿 메세지를 띄워줍니다.
function joinSubmit(formName) {
  let targetForm = document.getElementsByName(formName)[0];
  let userId = targetForm.userId;
  let userPassword = targetForm.userPassword;
  let matchPassword = targetForm.matchPassword;
  let emailId = targetForm.emailId;
  let ageAgree = targetForm.ageAgree;

  if (!validUserId(userId)) {
    alert('Please enter a valid username.');
    return false;
  } else if (!validUserPwd(userPassword)) {
    alert('Please enter a valid password.');
    return false;
  } else if (!validMatchPwd(matchPassword, userPassword)) {
    alert('Your passwords do not match. Please try again.');
    return false;
  } else if (!validEmail(emailId)) {
    alert('Please enter a valid email address.');
    return false;
  } else if (!validAgeAgree(ageAgree)) {
    alert('Please show that you agree to our terms and conditions.');
    return false;
  }

  alert('* 회원가입 성공.');
  // targetForm.submit();
}

// 이메일 변경 함수 입니다.
// 이메일 유효성 검사 후 이메일 주소를 변경합니다.
function changeEmail(idName) {
  const emailId = document.getElementsByName(idName)[0];
  if (!validEmail(emailId)) {
    alert('Please enter a valid email address.');
    return false;
  }
  alert('* 이메일 변경 성공.\n* 변경한 이메일 주소 : ' + emailId.value);
}

// 비밀번호 변경 함수 입니다.
// 유효성 검사 후 비밀번호를 변경합니다.
function changePassword(pwMatchObj, pwObj) {
  if (!validUserPwd(pwObj)) {
    alert('Please enter a valid password.');
    return false;
  } else if (!validMatchPwd(pwMatchObj, pwObj)) {
    alert('Your passwords do not match. Please try again.');
    return false;
  }
  alert('* 비밀번호 변경 성공.\n* 변경한 비밀번호 : ' + pwObj.value);
}

// end : 2022-04 (1/1)

window.addEventListener('load', function () {
  // GNB active
  // nav의 li > a 요소에 id 값과 pageURL을 비교하여 동일한 문자열이 발견되면 해당 메뉴에 active를 시켜줍니다.
  const pageURL = window.location.href;
  const navList = document.querySelector('nav').querySelectorAll('li');
  navList.forEach(function (item) {
    if (pageURL.indexOf(item.querySelector('a').id) !== -1) {
      item.querySelector('a').classList.add('active');
    }
  });
  navScroll();

  // begin : 2022-04 (2/2)

  // 로그인 + metamask 지갑 주소가 있을때 지갑주소 표기 처리.
  let metamaskId = '0x72f29ef34139313246a1a4s4f24de372aaf3e0';
  typeof metamaskId !== undefined && document.getElementById('metamaskId') !== null
    ? (document.getElementById('metamaskId').innerHTML = wordResize(metamaskId, 8, 8))
    : null;

  // end : 2022-04 (2/2)
});

window.addEventListener('scroll', function () {
  navScroll();
});
