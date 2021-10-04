// 1. 재생 버튼 클릭하면 시작
// 2. 아이템 생성(벌레, 당근), 초시계 작동, 당근 개수 표시, 중지 버튼으로 변경
// 3. 중지 버튼 누르면, 초시계 멈춤, 중지 버튼 숨김, 안내창 생성(재시도 버튼, 재시도 문구)
// 3. 시간 초과되거나 벌레 누르면 패배
//    - 초시계 멈춤, 안내창 생성(재시도 버튼, 패배 문구)
// 4. 당근 개수 0개 되면 성공
//    - 초시계 멈춤, 안내창 생성(재시도 버튼, 승리 문구)

const section = document.querySelector('.section');
const itemContainer = document.querySelector('.itemContainer');
const playBtn = document.querySelector('.playBtn');
const timer = document.querySelector('.timer');
let created = false;

playBtn.addEventListener('click', () => {
  const className = playBtn.classList.item(1);
  const iTag = document.querySelector('.playBtn .fas');

  // 플레이 버튼 누를 시
  if (className === 'play') {
    // 생성되지 않았을 때
    if (!created) {
      for(let i=0; i <10; i++) {
        createItems();
      }
      created = true;
    }
    
    // 중지 버튼으로 변경
    playBtn.classList.remove('play');
    playBtn.classList.add('stop');

    iTag.classList.remove('fa-play');
    iTag.classList.add('fa-stop');

    // 초시계 작동
    startTimer();
    
  } else { // 스탑 버튼 누를 시

    // 재개 버튼으로 변경
    playBtn.classList.remove('stop');
    playBtn.classList.add('play');

    iTag.classList.remove('fa-stop');
    iTag.classList.add('fa-play');

    // 초시계 일시정지
    

  }
  
  


  

});





// 아이템 랜덤 생성
function createItems() {
  const bug = document.createElement('img');
  const carrot = document.createElement('img');
  bug.setAttribute('class', 'bug');
  bug.setAttribute('src', 'img/bug.png');
  carrot.setAttribute('class', 'carrot');
  carrot.setAttribute('src', 'img/carrot.png');
  
  const width = itemContainer.clientWidth - 70;
  const MAX_height = section.clientHeight - 70;
  const MIN_height = section.clientHeight - itemContainer.clientHeight;

  bug.style.position = 'absolute';
  bug.style.top = (Math.random() * (MAX_height - MIN_height)) + MIN_height + 'px';
  bug.style.left = width * Math.random() + 'px';
  
  carrot.style.position = 'absolute';
  carrot.style.top = (Math.random() * (MAX_height - MIN_height)) + MIN_height + 'px';
  carrot.style.left = width * Math.random() + 'px';

  itemContainer.appendChild(bug);
  itemContainer.appendChild(carrot);
}


function startTimer() {
  const duration = 10;
  var time = duration, minutes, seconds;
  var interval = setInterval(function () {
    minutes = parseInt(time / 60, 10)
    seconds = parseInt(time % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    timer.textContent = minutes + ":" + seconds;

    if (--time < 0) {
      time = duration;
    }
    if(time === 0) {
      clearInterval(interval);
      timer.textContent = "시간 초과";
    }
  }, 1000);
}
