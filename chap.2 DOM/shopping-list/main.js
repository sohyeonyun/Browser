// 1. 사용자의 input 입력받음 (추가 버튼이나 엔터키 )
// 2. input 내용 리스트에 추가
// 3. 삭제 버튼 누를시 아이템 삭제

const items = document.querySelector('.items');
const input = document.querySelector('.footer__input');
const addBtn = document.querySelector('.footer__button');

function onAdd() {
  // 1. 사용자가 입력한 텍스트 받아옴
  const text = input.value;
  if( text === '' ) {
    input.focus();
    return;
  }
  
  // 2. 새로운 아이템을 만듦 (텍스트 + 삭제 버튼)
  const item = createItem(text);

  // 3. items 컨테이너 안에 새로 만든 아이템을 추가한다.
  items.appendChild(item);

  // 4. 새로 추가된 아이템으로 스크롤링
  item.scrollIntoView({block: 'center'});

  // 5. 인풋을 초기화 한다.
  input.value = '';
  input.focus(); // 입력 계속할 수 있다.
}

// 개선 후.. 아이템마다 고유 id 지정
let id = 0;  // 실제론 UUID를 써야 한다.
function createItem(text) {
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class', 'item__row');
  itemRow.setAttribute('data-id', id);
  itemRow.innerHTML = `
      <div class="item">
        <span class="item__name">${text}</span>
        <button class="item__delete">
          <i class="fas fa-trash-alt" data-id=${id}></i>
        </button>
      </div>
      <div class="item__divider"></div>`;
  id++;
  return itemRow;

  // ---------------------- 개선 전 --------------------------
  // 아이템 하나하나 다 만들어주면 됨.
  // const item = document.createElement('div');
  // item.setAttribute('class', 'item');

  // const span = document.createElement('span');
  // span.setAttribute('class', 'item__name');
  // span.innerText = text;

  // const deleteBtn = document.createElement('button');
  // deleteBtn.setAttribute('class', 'item__delete');
  // deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
  // deleteBtn.addEventListener('click', () => {
  //   items.removeChild(itemRow);
  // });

  // const itemDivider = document.createElement('div');
  // itemDivider.setAttribute('class', 'item__divider');
  
  // item.appendChild(span);
  // item.appendChild(deleteBtn);
  // itemRow.appendChild(item);
  // itemRow.appendChild(itemDivider);
  // return itemRow;
}

addBtn.addEventListener('click', () => {
  onAdd();
});

input.addEventListener('keypress', event => {
  if( event.key === 'Enter' ) {
    onAdd();
  }
})

// 개선 후.. delete 리스너 추가
items.addEventListener('click', event => {
  // 개발툴에서 target 확인
  const id = event.target.dataset.id;
  if (id) { //  && target.matches(.delete__btn) - 여백 생길 때 버그
    const toBeDeleted = document.querySelector(`.item__row[data-id="${id}"]`);
    toBeDeleted.remove();
  }
  
});