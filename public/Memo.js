// 페이지 로드 시 실행되는 이벤트
window.addEventListener('DOMContentLoaded', () => {
    // 페이지가 로드될 때 서버에서 메모 가져오기
    fetch('http://localhost:5500/getMemos')
      .then((response) => response.json())
      .then((memos) => {
        // 서버에서 받은 메모 목록을 반복하여 화면에 표시
        memos.forEach((memo) => {
          createMemoElement(memo);
        });
      });
  });
  
  // 메모 엘리먼트를 생성하고 화면에 추가하는 함수
  function createMemoElement(memo, memoDiv = null) {
    if (!memoDiv) {
      // 새로운 메모 엘리먼트를 생성하고 고유한 ID를 할당
      memoDiv = document.createElement('div');
      memoDiv.classList.add('memo-item');
      memoDiv.id = memo.id;
    }
  
    // 메모 내용을 담을 p 엘리먼트 생성 또는 기존 엘리먼트 사용
    var memoContent = memoDiv.querySelector('p');
    if (!memoContent) {
      memoContent = document.createElement('p');
      memoDiv.appendChild(memoContent);
    }
    memoContent.textContent = memo.memoText;
  
    // 수정, 삭제, 저장 버튼을 추가
    var editButton = memoDiv.querySelector('.edit-btn');
    if (!editButton) {
      editButton = document.createElement('span');
      editButton.classList.add('edit-btn');
      editButton.textContent = '수정';
      editButton.onclick = function () {
        console.log('수정 버튼 클릭됨'); // 콘솔에 출력
        editMemo(memo.id);
      };
      memoDiv.appendChild(editButton);
    }
  
    var deleteButton = memoDiv.querySelector('.delete-btn');
    if (!deleteButton) {
      deleteButton = document.createElement('span');
      deleteButton.classList.add('delete-btn');
      deleteButton.textContent = '삭제';
      deleteButton.onclick = function () {
        // 클라이언트 측에서 메모 삭제 요청을 보냄
        deleteMemo(memo.id);
  
        // 화면에서 삭제된 메모를 제거
        memoDiv.remove();
      };
      memoDiv.appendChild(deleteButton);
    }
  
    // "저장 버튼" 생성
    var saveButton = memoDiv.querySelector('.save-btn');
    if (!saveButton) {
      saveButton = document.createElement('span');
      saveButton.classList.add('save-btn');
      saveButton.textContent = '저장';
      saveButton.style.display = 'none'; // 초기에는 숨겨둠
      saveButton.onclick = function () {
        modifyMemo(memo.id); // "저장 버튼" 클릭 시 업데이트 함수 호출
      };
      memoDiv.appendChild(saveButton);
    }
  
    // 생성한 메모 엘리먼트를 화면에 추가
    var savedMemos = document.getElementById('savedMemos');
    savedMemos.appendChild(memoDiv);
  }
  
  // 메모 작성 페이지로 이동
  function clickMemoWriteButton() {
    window.open('MemoWriteScreen.html');
    window.close();
  }
  
  // 이전 페이지로 이동
  function goBack() {
    window.open('MainScreen.html');
    window.close();
  }
  