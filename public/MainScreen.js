// 페이지 로드 시 실행되는 함수
window.addEventListener('load', () => {
  // 로그인 여부 확인
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userId = localStorage.getItem('userId');
  const loginText = document.getElementById('loginText');

  if (isLoggedIn) {
    // 사용자가 로그인되어 있는 경우, trip.html의 loginText 업데이트
    loginText.innerHTML = `${userId}님 환영합니다. 
      <button id="logoutButton" onclick="logout()">로그아웃</button>
      <button id="userDeleteButton" onclick="deleteUser()">회원탈퇴</button>`;
  }
});

// 로그아웃 버튼 클릭 시 호출되는 함수
function logout() {
  // 로그아웃 상태를 로컬 스토리지에서 제거
  localStorage.removeItem('isLoggedIn');

  // 서버에 로그아웃 요청
  fetch('http://localhost:5500/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('로그아웃 실패');
      }
      return response.json();
    })
    .then(() => {
      // 로그아웃 성공 시 화면에 메시지 표시
      const loginText = document.getElementById('loginText');
      loginText.textContent = '';
      alert('로그아웃 되었습니다.'); // 알림창으로 로그아웃 성공 메시지 표시
    })
    .catch(error => {
      console.error('클라이언트 오류:', error);
    });
}

// 회원탈퇴 버튼 클릭 시 호출되는 함수
function deleteUser() {
  const confirmWithdrawal = confirm('정말로 회원탈퇴하시겠습니까?');
  if (confirmWithdrawal) {
    const userId = localStorage.getItem('userId');

    // 서버로 회원탈퇴 요청을 보내고, 성공하면 로그아웃 함수 호출
    fetch('http://localhost:5500/deleteUser', {
      method: 'DELETE',  // 메소드를 DELETE로 변경
      headers: {
        'Content-Type': 'application/json',
        'User-Id': userId  // 사용자 아이디를 헤더에 추가
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('회원탈퇴 실패');
        }
        return response.json();
      })
      .then(data => {
        // 회원탈퇴 성공 시 응답 결과 처리 함수 호출
        handleResponse(data);
      })
      .catch(error => {
        console.error('클라이언트 오류:', error);
      });
  }
}

// 회원탈퇴 응답 결과 처리 함수
function handleResponse(data) {
  if (data) {
    if (data.success) {
      // 회원탈퇴 성공 시 알림창 보여줌
      alert('회원탈퇴가 정상적으로 처리되었습니다.');
      // 로그아웃 함수 호출
      logout();
    } else {
      // 회원탈퇴 실패 시의 처리
      alert('회원탈퇴에 실패했습니다. 다시 시도해주세요.');
    }
  }
}

// 네비게이션 토글 함수
function toggleNav() {
  var navList = document.querySelector('.nav_list1');
  navList.classList.toggle('active');
}

// 로그인 버튼 클릭 시 이동 함수
function clickLoginButton() {
  location.href = "LoginScreen.html";
}

// 회원가입 버튼 클릭 시 이동 함수
function clickJoinButton() {
  location.href = "JoinScreen.html";
}

function memoPage() {
  location.href = "Memo.html"; // 로그인 상태이면 메모 페이지로 이동
  /*
  if (isLoggedIn) {
    location.href = "memo.html"; // 로그인 상태이면 메모 페이지로 이동
  } else {
    alert('로그인이 필요한 페이지입니다.'); // 로그인이 필요한 경우 알림 표시
  }
  */
}
  
function review() {
  location.href = "review.html";
  /*
  if (isLoggedIn) {
    location.href = "review.html"; // 로그인 상태이면 리뷰 페이지로 이동
  } else {
    alert('로그인이 필요한 페이지입니다.'); // 로그인이 필요한 경우 알림 표시
  }
  */
}

function community() {
  location.href = "community.html";
  /*
  if (isLoggedIn) {
    location.href = "community.html"; // 로그인 상태이면 커뮤니티 페이지로 이동
  } else {
    alert('로그인이 필요한 페이지입니다.'); // 로그인이 필요한 경우 알림 표시
  }*/
}

const firstPhotos = [
  {
    imageSrc: 'images/lotte.jpeg',
    title: '서울 (롯데월드 어드벤처)',
    description: '서울 송파구 올림픽로 240',
    website: 'https://www.lotteworld.com/gate.html'
  },
  {
    imageSrc: 'images/everland.jpg',
    title: '경기 (에버랜드)',
    description: '경기 용인시 처인구 포곡읍 에버랜드로 199',
    website: 'https://www.everland.com/web/everland/main.html'
  },
  {
    imageSrc: 'images/chinatown.jpeg',
    title: '인천 (차이나타운)',
    description: '인천 중구 차이나타운로26번길 12-17',
    website: 'http://ic-chinatown.co.kr/'
  },    
  {
    imageSrc: 'images/oworld.jpeg',
    title: '대전 (대전오월드)',
    description: '대전 중구 사정공원로 70',
    website: 'https://www.oworld.kr/newkfsweb/kfs/dcco/dccoMainindex.do'
  },
  {
    imageSrc: 'images/sealife.jpg',
    title: '부산 (씨라이프부산아쿠아리움)',
    description: '부산 해운대구 해운대해변로 266',
    website: 'https://www.visitsealife.com/busan/'
  },         
  {
    imageSrc: 'images/daewangam.gif',
    title: '울산 (대왕암공원)',
    description: '울산 동구 일산동 산907',
    website: 'https://daewangam.donggu.ulsan.kr/'
  },    
  {
    imageSrc: 'images/e.webp',
    title: '대구 (이월드)',
    description: '대구 달서구 두류공원로 200 이월드',
    website: 'https://eworld.kr/'
  },
  {
    imageSrc: 'images/family.jpeg',
    title: '광주 (광주패밀리랜드)',
    description: '광주 북구 우치로 677 광주패밀리랜드',
    website: 'http://gjfamilyland.com/'
  }, 
  {
    imageSrc: 'images/dacheon.jpeg',
    title: '충남 (대천해수욕장)',
    description: '충남 보령시 신흑동',
    website: 'http://daecheonbeach.kr/'
  },
  {
    imageSrc: 'images/gosu.png',
    title: '충북 (고수동굴)',
    description: '충북 단양군 단양읍 고수동굴길 8 고수동굴',
    website: 'http://www.gosucave.co.kr/'
  },
  {
    imageSrc: 'images/lottewater.jpeg',
    title: '경남 (롯데워터파크 김해)',
    description: '경남 김해시 장유로 555',
    website: 'https://www.lotteworld.com/waterpark/index.asp'
  },    
  {
    imageSrc: 'images/bulguk.jpeg',
    title: '경북 (불국사)',
    description: '경북 경주시 보문로 544',
    website: 'https://www.gjw.co.kr/'
  },       
  {
    imageSrc: 'images/yeosucable.webp',
    title: '전남 (여수해상케이블카)',
    description: '전남 여수시 돌산읍 돌산로 3600-1',
    website: 'http://yeosucablecar.com/'
  },
  {
    imageSrc: 'images/hanok.jpeg',
    title: '전북 (전주한옥마을)',
    description: '전북 전주시 완산구 기린대로 99',
    website: 'https://hanok.jeonju.go.kr/'
  },    
  {
    imageSrc: 'images/nami.jpeg',
    title: '강원 (남이섬)',
    description: '강원 춘천시 남산면 남이섬길 1',
    website: 'https://www.namisum.com/'
  },
  {
    imageSrc: 'images/hill.jpeg',
    title: '제주 (카멜리아힐)',
    description: '제주 서귀포시 안덕면 병악로 166',
    website: 'https://www.camelliahill.co.kr/'
  }
  ];

const amusementParkPhotos = [
    {
      imageSrc: 'images/everland.jpg',
      title: '에버랜드',
      description: '경기 용인시 처인구 포곡읍 에버랜드로 199',
      website: 'https://www.everland.com/web/everland/main.html'
    },
    {
      imageSrc: 'images/lotte.jpeg',
      title: '롯데월드 어드벤처',
      description: '서울 송파구 올림픽로 240',
      website: 'https://www.lotteworld.com/gate.html'
    },
    {
      imageSrc: 'images/seouland.webp',
      title: '서울랜드',
      description: '경기 과천시 광명로 181',
      website: 'https://seoulland.co.kr/'
    },  
    {
      imageSrc: 'images/lottebusan.jpeg',
      title: '롯데월드 어드벤처 부산',
      description: '부산 기장군 기장읍 동부산관광로 42',
      website: 'https://adventurebusan.lotteworld.com/kor/main/index.do'
    },
    {
      imageSrc: 'images/oworld.jpeg',
      title: '대전오월드',
      description: '대전 중구 사정공원로 70',
      website: 'https://www.oworld.kr/newkfsweb/kfs/dcco/dccoMainindex.do'
    },
    {
      imageSrc: 'images/e.webp',
      title: '이월드',
      description: '대구 달서구 두류공원로 200 이월드',
      website: 'https://eworld.kr/'
    },
    {
      imageSrc: 'images/family.jpeg',
      title: '광주패밀리랜드',
      description: '광주 북구 우치로 677 광주패밀리랜드',
      website: 'http://gjfamilyland.com/'
    },
    {
      imageSrc: 'images/gyeongju.jpeg',
      title: '경주월드',
      description: '경북 경주시 보문로 544',
      website: 'https://www.gjw.co.kr/'
    },      
    {
      imageSrc: 'images/child.jpeg',
      title: '서울어린이대공원',
      description: '서울 광진구 능동로 216',
      website: 'https://www.sisul.or.kr/open_content/childrenpark/'
    },    
    {
      imageSrc: 'images/seouldae.jpeg',
      title: '서울대공원',
      description: '경기 과천시 대공원광장로 102',
      website: 'https://grandpark.seoul.go.kr/main/ko.do'
    },    
    {
      imageSrc: 'images/wungjin.jpeg',
      title: '웅진플레이도시',
      description: '경기 부천시 조마루로 2',
      website: 'http://www.playdoci.com/'
    },
    {
      imageSrc: 'images/farm.jpeg',
      title: '안성팜랜드',
      description: '경기 안성시 공도읍 대신두길 28',
      website: 'http://nhasfarmland.com/asfarm.php?device='
    },    
    {
      imageSrc: 'images/blue.jpeg',
      title: '해운대블루라인파크',
      description: '부산 해운대구 청사포로 116 청사포정거장',
      website: 'https://www.bluelinepark.com/'
    },    
    {
      imageSrc: 'images/rugi.png',
      title: '여수 유월드 루지 테마파크',
      description: '전남 여수시 소라면 안심산길 155',
      website: 'https://home-ticket.co.kr/uworld/'
    },
    {
      imageSrc: 'images/hasla.jpeg',
      title: '하슬라아트월드',
      description: '강원 강릉시 강동면 율곡로 1441',
      website: 'https://www.museumhaslla.com/'
    },    
    {
      imageSrc: 'images/ecoland.jpeg',
      title: '에코랜드테마파크',
      description: '제주 제주시 조천읍 번영로 1278-169',
      website: 'https://www.ecolandjeju.co.kr/'
    }   
    ];

const historyPhotos = [
    {
      imageSrc: 'images/gung.jpg',
      title: '경복궁',
      description: '서울 종로구 사직로 161 경복궁',
      website: 'https://www.royalpalace.go.kr/'
    },
    {
      imageSrc: 'images/changdeok.jpeg',
      title: '창덕궁',
      description: '서울 종로구 율곡로 99',
      website: 'https://www.cdg.go.kr/default.jsp'
    },
    {
      imageSrc: 'images/deoksu.jpeg',
      title: '덕수궁',
      description: '서울 중구 세종대로 99 덕수궁',
      website: 'https://www.deoksugung.go.kr/'
    },
    {
      imageSrc: 'images/baekje.jpeg',
      title: '백제문화단지',
      description: '충남 부여군 규암면 백제문로 455',
      website: 'https://www.bhm.or.kr/html/kr/'
    },
    {
      imageSrc: 'images/chumgsung.jpeg',
      title: '첨성대',
      description: '경북 경주시 인왕동 839-1',
    },
    {
      imageSrc: 'images/buseok.jpeg',
      title: '부석사',
      description: '경북 영주시 부석면 부석사로 345',
      website: 'http://www.pusoksa.org/main'
    },
    {
      imageSrc: 'images/seokgul.webp',
      title: '석굴암',
      description: '경북 경주시 석굴로 238',
      website: 'http://seokguram.org/'
    },  
    {
      imageSrc: 'images/bulguk.jpeg',
      title: '불국사',
      description: '경북 경주시 보문로 544',
      website: 'https://www.gjw.co.kr/'
    },      
    {
      imageSrc: 'images/town5.jpeg',
      title: '안동하회마을',
      description: '경북 안동시 풍천면 전서로 186',
      website: 'http://www.hahoe.or.kr/coding/main.asp'
    },    
    {
      imageSrc: 'images/nakan.jpeg',
      title: '낙안읍성',
      description: '전남 순천시 낙안면 평촌리 6-4',
      website: 'https://www.suncheon.go.kr/nagan/'
    },    
    {
      imageSrc: 'images/gwanghan.jpg',
      title: '광한루원',
      description: '전북 남원시 요천로 1447',
      website: 'https://www.namwon.go.kr/tour/index.do?menuCd=DOM_000001001007001000'
    },
    {
      imageSrc: 'images/manjang.jpeg',
      title: '만장굴',
      description: '제주 제주시 구좌읍 만장굴길 182',
    }
    ];

const animalPlantPhotos = [
    {
      imageSrc: 'images/nature.jpeg',
      title: '네이처파크',
      description: '대구 달성군 가창면 가창로 891',
      website: 'http://www.spavalley.co.kr/naturepark/'
    },
    {
      imageSrc: 'images/animal.jpeg',
      title: '전주동물원',
      description: '전북 전주시 덕진구 소리로 68 전주동물원',
      website: 'https://zoo.jeonju.go.kr/'
    },
    {
      imageSrc: 'images/bugyeong.jpeg',
      title: '부경동물원',
      description: '경남 김해시 유하로226번길 70',
      website: 'https://adventurebusan.lotteworld.com/kor/main/index.do'
    },
    {
      imageSrc: 'images/seoulplant.jpeg',
      title: '서울식물원',
      description: '서울 강서구 마곡동로 161 서울식물원',
      website: 'https://botanicpark.seoul.go.kr/front/main.do'
    },
    {
      imageSrc: 'images/hwadam.jpeg',
      title: '화담숲',
      description: '경기 광주시 도척면 도척윗로 278-1',
      website: 'https://www.hwadamsup.com/renewal/pc/ko/index.do'
    },
    {
      imageSrc: 'images/goyo.jpeg',
      title: '아침고요수목원',
      description: '경기 가평군 상면 수목원로 432',
      website: 'https://www.morningcalm.co.kr/html/main.php'
    },
    {
      imageSrc: 'images/hanbat.jpeg',
      title: '한밭수목원',
      description: '대전 서구 둔산대로 169',
      website: 'https://www.daejeon.go.kr/gar/index.do'
    },
    {
      imageSrc: 'images/sejong.jpeg',
      title: '국립세종수목원',
      description: '세종 수목원로 136',
      website: 'https://www.sjna.or.kr/main/main.do'
    },
    {
      imageSrc: 'images/bear.jpg',
      title: '베어트리파크',
      description: '세종 전동면 신송로 217',
      website: 'http://beartreepark.com/'
    },     
    {
      imageSrc: 'images/cheonli.jpeg',
      title: '천리포수목원',
      description: '충남 태안군 소원면 천리포1길 187',
      website: 'https://www.chollipo.org/'
    },      
    {
      imageSrc: 'images/jade.jpeg',
      title: '제이드가든',
      description: '강원 춘천시 남산면 햇골길 80',
      website: 'https://www.instagram.com/jadegardenkorea/'
    },    
    {
      imageSrc: 'images/hill.jpeg',
      title: '카멜리아힐',
      description: '제주 서귀포시 안덕면 병악로 166',
      website: 'https://www.camelliahill.co.kr/'
    }
    ];

 const museumPhotos = [
    {
      imageSrc: 'images/moon.jpeg',
      title: '서대문형무소역사관',
      description: '서울 서대문구 통일로 251 서대문형무소역사관',
      website: 'https://sphh.sscmc.or.kr/'
    },
    {
      imageSrc: 'images/medium.jpeg',
      title: '국립중앙박물관',
      description: '서울 용산구 서빙고로 137 국립중앙박물관',
      website: 'https://www.museum.go.kr/site/main/home'
    },
    {
      imageSrc: 'images/dokrip.jpeg',
      title: '독립기념관',
      description: '충남 천안시 동남구 목천읍 독립기념관로 1 독립기념관',
      website: 'https://i815.or.kr/'
    },
    {
      imageSrc: 'images/gongju.jpeg',
      title: '국립공주박물관',
      description: '충남 공주시 관광단지길 34 국립공주박물관',
      website: 'https://gongju.museum.go.kr/gongju/'
    },
    {
      imageSrc: 'images/buyeo.jpeg',
      title: '국립부여박물관',
      description: '충남 부여군 부여읍 금성로 5',
      website: 'https://buyeo.museum.go.kr/index.do'
    },
    {
      imageSrc: 'images/gyeongju.jpeg',
      title: '국립경주박물관',
      description: '경북 경주시 일정로 186 국립경주박물관',
      website: 'https://gyeongju.museum.go.kr/'
    },
    {
      imageSrc: 'images/otea.jpeg',
      title: '오설록 티 뮤지엄',
      description: '제주 서귀포시 안덕면 신화역사로 15 오설록',
      website: 'https://www.osulloc.com/'
    },    
    {
      imageSrc: 'images/artte.jpeg',
      title: '아르떼뮤지엄 제주',
      description: '제주 제주시 애월읍 어림비로 478',
      website: 'https://artemuseum.com/'
    },    
    {
      imageSrc: 'images/science3.jpeg',
      title: '국립과천과학관',
      description: '경기 과천시 상하벌로 110 지하철 4호선 대공원역 6번 출구',
      website: 'https://www.sciencecenter.go.kr/scipia/'
    }, 
    {
      imageSrc: 'images/science.jpeg',
      title: '국립중앙과학관',
      description: '대전 유성구 대덕대로 481 국립중앙과학관',
      website: 'https://www.science.go.kr/'
    },
    {
      imageSrc: 'images/science2.jpeg',
      title: '국립부산과학관',
      description: '부산 기장군 기장읍 동부산관광6로 59 국립부산과학관',
      website: 'https://www.sciport.or.kr/kor/Main.do'
    },       
    {
      imageSrc: 'images/science4.jpeg',
      title: '국립대구과학관',
      description: '대구 달성군 유가읍 테크노대로6길 20',
      website: 'https://www.dnsm.or.kr/'
    }   
    ];

 const aquariumPhotos = [
    {
      imageSrc: 'images/coex.jpeg',
      title: '코엑스아쿠아리움',
      description: '서울 강남구 영동대로 513',
      website: 'https://www.coexaqua.com/'
    },
    {
      imageSrc: 'images/aquailsan.png',
      title: '아쿠아플라넷 일산',
      description: '경기 고양시 일산서구 한류월드로 282 아쿠아플라넷 일산',
      website: 'https://www.aquaplanet.co.kr/ilsan/index.do'
    },
    {
      imageSrc: 'images/aquagwangwo.jpeg',
      title: '아쿠아플라넷 광교',
      description: '경기 수원시 영통구 광교호수공원로 300 갤러리아 광교 파사쥬 지하 1층',
      website: 'https://www.aquaplanet.co.kr/gwanggyo/index.do'
    },
    {
      imageSrc: 'images/expoaqua.jpeg',
      title: '대전엑스포아쿠아리움',
      description: '대전 유성구 엑스포로 1 대전 신세계 Art&Science 지하 1층',
      website: 'http://www.djexpoaqua.com/'
    },
    {
      imageSrc: 'images/dajeonaqua.jpeg',
      title: '대전아쿠아리움',
      description: '대전 중구 보문산공원로 469',
      website: 'http://www.djaquarium.com/default/'
    }, 
    {
      imageSrc: 'images/sealife.jpg',
      title: '씨라이프부산아쿠아리움',
      description: '부산 해운대구 해운대해변로 266',
      website: 'https://www.visitsealife.com/busan/'
    },    
    {
      imageSrc: 'images/daeguaqua.png',
      title: '대구아쿠아리움',
      description: '대구 동구 동부로 149 신세계백화점 대구점 9층',
      website: 'https://daeguaqua.com/'
    },
    {
      imageSrc: 'images/danuri.jpeg',
      title: '다누리아쿠아리움',
      description: '충북 단양군 단양읍 수변로 111 다누리아쿠아리움',
      website: 'https://www.danyang.go.kr/aquarium/1383'
    },       
    {
      imageSrc: 'images/aramaru.jpeg',
      title: '아라마루 아쿠아리움',
      description: '경남 사천시 사천대로 18',
      website: 'https://aramaruaquarium.com/'
    },
    {
      imageSrc: 'images/seaworld.jpeg',
      title: '거제씨월드',
      description: '경남 거제시 일운면 지세포해안로 15',
      website: 'http://www.geojeseaworld.com/'
    },    
    {
      imageSrc: 'images/aqua.webp',
      title: '아쿠아플라넷 여수',
      description: '전남 여수시 오동도로 61-11 아쿠아리움',
      website: 'https://www.aquaplanet.co.kr/yeosu/index.do'
    },
    {
      imageSrc: 'images/aquajeju.jpeg',
      title: '아쿠아플라넷 제주',
      description: '제주 서귀포시 성산읍 섭지코지로 95 아쿠아플라넷 제주',
      website: 'https://www.aquaplanet.co.kr/jeju/index.do'
    }
    ];

const parkPhotos = [
    {
      imageSrc: 'images/hangang.jpg',
      title: '여의도한강공원',
      description: '서울 영등포구 여의동로 330 한강사업본부 여의도안내센터',
      website: 'https://hangang.seoul.go.kr/www/contents/669.do?mid=473'
    },
    {
      imageSrc: 'images/olympic.jpeg',
      title: '올림픽공원',
      description: '서울 송파구 올림픽로 424',
      website: 'https://www.ksponco.or.kr/olympicpark/'
    },
    {
      imageSrc: 'images/hangang.jpeg',
      title: '반포한강공원',
      description: '서울 서초구 신반포로11길 40 한강공원 반포 안내센터',
      website: 'https://hangang.seoul.go.kr/www/contents/663.do?mid=463'
    },
    {
      imageSrc: 'images/hosu.webp',
      title: '광교호수공원',
      description: '경기 수원시 영통구 광교호수로 165',
      website: 'http://www.gglakepark.or.kr/'
    },
    {
      imageSrc: 'images/central.jpeg',
      title: '송도센트럴파크',
      description: '인천 연수구 컨벤시아대로 160',
    },
    {
      imageSrc: 'images/incheon.jpeg',
      title: '인천대공원',
      description: '인천 남동구 장수동 산79',
      website: 'https://www.incheon.go.kr/park/index'
    },
    {
      imageSrc: 'images/expo.jpeg',
      title: '엑스포과학공원',
      description: '대전 유성구 대덕대로 480',
      website: 'http://www.djto.kr/kor/index.do'
    },    
    {
      imageSrc: 'images/busan.jpeg',
      title: '부산시민공원',
      description: '부산 부산진구 시민공원로 73',
      website: 'https://www.citizenpark.or.kr/'
    },    
    {
      imageSrc: 'images/ulsan.webp',
      title: '울산대공원',
      description: '울산 남구 대공원로 94',
      website: 'http://www.uic.or.kr/ulsanpark/main/mainPage.do'
    },    
    {
      imageSrc: 'images/tahwa.jpg',
      title: '태화강국가정원',
      description: '울산 중구 태화강국가정원길 154',
      website: 'https://www.ulsan.go.kr/garden/'
    },
    {
      imageSrc: 'images/daewangam.gif',
      title: '대왕암공원',
      description: '울산 동구 일산동 산907',
      website: 'https://daewangam.donggu.ulsan.kr/'
    },    
    {
      imageSrc: 'images/suncheon.jpg',
      title: '순천만국가정원',
      description: '전남 순천시 국가정원1호길 47',
      website: 'https://scbay.suncheon.go.kr/intro.jsp'
    }   
    ];

const waterparkPhotos = [
    {
      imageSrc: 'images/caribeean.jpeg',
      title: '캐리비안베이',
      description: '경기 용인시 처인구 포곡읍 에버랜드로 199',
      website: 'https://www.everland.com/web/caribbean/main.html'
    },
    {
      imageSrc: 'images/aquafield.jpeg',
      title: '아쿠아필드 하남',
      description: '경기 하남시 미사대로 750 스타필드 하남 3층',
      website: 'https://www.aquafield-ssg.co.kr/hanam/index.af'
    },
    {
      imageSrc: 'images/termeden.jpeg',
      title: '이천 테르메덴',
      description: '경기 이천시 모가면 사실로 984',
      website: 'https://termeden.com/'
    },
    {
      imageSrc: 'images/spabelly.jpeg',
      title: '워터파크 스파밸리',
      description: '대구 달성군 가창면 가창로 891 워터파크 스파밸리',
      website: 'http://www.spavalley.co.kr/'
    },
    {
      imageSrc: 'images/sonobel.jpeg',
      title: '소노벨 천안 오션어드벤처',
      description: '충남 천안시 동남구 성남면 종합휴양지로 200',
      website: 'https://www.sonohotelsresorts.com/daemyung.saupjang.ca.ocean.oceanInfo.ds/dmparse.dm'
    },
    {
      imageSrc: 'images/lottewater.jpeg',
      title: '롯데워터파크 김해',
      description: '경남 김해시 장유로 555',
      website: 'https://www.lotteworld.com/waterpark/index.asp'
    },    
    {
      imageSrc: 'images/callifornia.jpeg',
      title: '경주월드캘리포니아비치',
      description: '경북 경주시 보문로 544',
      website: 'https://www.gjw.co.kr/California/contents.php'
    },    
    {
      imageSrc: 'images/blueone.jpeg',
      title: '블루원 워터파크',
      description: '경북 경주시 보불로 391',
      website: 'https://wp.blueone.com/'
    },    
    {
      imageSrc: 'images/docean.jpeg',
      title: '디오션 워터파크',
      description: '전남 여수시 소호로 295 (전라남도 여수시 소호동 923)',
      website: 'https://theoceanresort.co.kr/main.do'
    },
    {
      imageSrc: 'images/oceanworld.jpeg',
      title: '오션월드',
      description: '강원 홍천군 서면 한치골길 262',
      website: 'https://www.sonohotelsresorts.com/oceanworld/'
    },    
    {
      imageSrc: 'images/hanhwa.jpeg',
      title: '한화리조트 설악워터피아',
      description: '강원 속초시 미시령로2983번길 111',
      website: 'https://www.hanwharesort.co.kr/irsweb/resort3/tpark/tp_intro.do?tp_cd=0100'
    },
    {
      imageSrc: 'images/hione.jpeg',
      title: '하이원 워터월드',
      description: '강원 정선군 고한읍 하이원길 424',
      website: 'https://kangwonland.high1.com/waterworld/index.do'
    }
    ];

const beachPhotos = [
    {
      imageSrc: 'images/gwanganri.jpeg',
      title: '광안리해수욕장',
      description: '부산 수영구 광안해변로 219',
      website: 'https://www.suyeong.go.kr/tour/index.suyeong?menuCd=DOM_000001102001001000&link=success&cpath=%252Ftour'
    },
    {
      imageSrc: 'images/haeundae.jpeg',
      title: '해운대해수욕장',
      description: '부산 해운대구 우동',
      website: 'https://www.haeundae.go.kr/tour/index.do?menuCd=DOM_000000302000000000'
    },
    {
      imageSrc: 'images/dadaepo.jpeg',
      title: '다대포해수욕장',
      description: '부산 사하구 다대동',
      website: 'https://www.saha.go.kr/tour/contents.do?mId=0101030000'
    },
    {
      imageSrc: 'images/dacheon.jpeg',
      title: '대천해수욕장',
      description: '충남 보령시 신흑동',
      website: 'http://daecheonbeach.kr/'
    },
    {
      imageSrc: 'images/youngildae.jpeg',
      title: '영일대해수욕장',
      description: '경북 포항시 북구 두호동 685-1',
    },
    {
      imageSrc: 'images/sokcho.jpeg',
      title: '속초해수욕장',
      description: '강원 속초시 조양동 속초해수욕장',
      website: 'https://www.sokchotour.com/tour'
    },    
    {
      imageSrc: 'images/gyeongpo.jpeg',
      title: '경포해변',
      description: '강원 강릉시 강문동  산1-1',
      website: 'https://www.gn.go.kr/tour/prog/lod/Sights/S01/sub02_02_01/view.do?cid=434&orderBy=B&pageIndex=1&searchCondition=sj&searchKeyword=%EA%B2%BD%ED%8F%AC%ED%95%B4%EB%B3%80'
    },
    {
      imageSrc: 'images/anmok.jpeg',
      title: '안목해변',
      description: '강원 강릉시 창해로14번길 20-1',
      website: 'http://anmokbeach.co.kr/'
    },
    {
      imageSrc: 'images/eho.jpeg',
      title: '이호테우해수욕장',
      description: '제주 제주시 이호일동',
    },    
    {
      imageSrc: 'images/hamdeok.jpeg',
      title: '함덕해수욕장',
      description: '제주 제주시 조천읍 조함해안로 525',
      website: 'https://www.visitjeju.net/kr/detail/view?contentsid=CONT_000000000500693'
    },    
    {
      imageSrc: 'images/jae.jpeg',
      title: '협재해수욕장',
      description: '제주 제주시 한림읍 협재리 2497-1',
      website: 'https://www.visitjeju.net/kr/detail/view?contentsid=CONT_000000000500697'
    },
    {
      imageSrc: 'images/woljung.jpeg',
      title: '월정리해수욕장',
      description: '제주 제주시 구좌읍 월정리 33-3',
      website: 'https://www.visitjeju.net/kr/detail/view?contentsid=CONT_000000000500496'
    },    
    ];

const experiencePhotos = [
    {
      imageSrc: 'images/namsan.jpg',
      title: '남산서울타워',
      description: '서울 용산구 남산공원길 105',
      website: 'https://www.seoultower.co.kr/'
    },
    {
      imageSrc: 'images/ddp.avif',
      title: '동대문디자인플라자',
      description: '서울 중구 을지로 281',
      website: 'https://ddp.or.kr/?menuno=228'
    },
    {
      imageSrc: 'images/bukchon.jpg',
      title: '북촌한옥마을',
      description: '서울 종로구 계동길 37',
      website: 'https://bukchon.seoul.go.kr/front/index.do'
    },
    {
      imageSrc: 'images/minsok.jpg',
      title: '한국민속촌',
      description: '경기 용인시 기흥구 민속촌로 90 한국민속촌',
      website: 'https://www.koreanfolk.co.kr/'
    },
    {
      imageSrc: 'images/artbelly.jpeg',
      title: '포천아트밸리',
      description: '경기 포천시 신북면 아트밸리로 234',
      website: 'https://artvalley.pocheon.go.kr/'
    },
    {
      imageSrc: 'images/htown.jpeg',
      title: '헤이리 예술마을',
      description: '경기 파주시 탄현면 헤이리마을길 70-21 헤이리 갈대광장',
      website: 'https://www.heyri.net/'
    },    
    {
      imageSrc: 'images/chinatown.jpeg',
      title: '차이나타운',
      description: '인천 중구 차이나타운로26번길 12-17',
      website: 'http://ic-chinatown.co.kr/'
    },    
    {
      imageSrc: 'images/songdo.jpeg',
      title: '송도해상케이블카',
      description: '부산 서구 송도해변로 171',
      website: 'http://busanaircruise.co.kr/main/main.html'
    },    
    {
      imageSrc: 'images/dongpirang.jpeg',
      title: '동피랑 벽화마을',
      description: '경남 통영시 동피랑1길 6-18',
    },
    {
      imageSrc: 'images/yeosucable.webp',
      title: '여수해상케이블카',
      description: '전남 여수시 돌산읍 돌산로 3600-1',
      website: 'http://yeosucablecar.com/'
    },
    {
      imageSrc: 'images/hanok.jpeg',
      title: '전주한옥마을',
      description: '전북 전주시 완산구 기린대로 99',
      website: 'https://hanok.jeonju.go.kr/'
    },    
    {
      imageSrc: 'images/yangtte.jpeg',
      title: '대관령양떼목장',
      description: '강원 평창군 대관령면 대관령마루길 483-32 대관령양떼목장',
      website: 'http://www.yangtte.co.kr/'
    },
    {
      imageSrc: 'images/samyang.jpeg',
      title: '대관령삼양목장',
      description: '강원 평창군 대관령면 꽃밭양지길 708-9',
      website: 'https://www.samyangroundhill.com/'
    },
    {
      imageSrc: 'images/snupi.jpeg',
      title: '스누피가든',
      description: '제주 제주시 구좌읍 금백조로 930',
      website: 'https://www.instagram.com/snoopygardenkorea/'
    },
    {
      imageSrc: 'images/jejuminsok.jpeg',
      title: '제주민속촌',
      description: '제주 서귀포시 표선면 민속해안로 631-34',
      website: 'https://jejufolk.com/index.php'
    },
    {
      imageSrc: 'images/light.png',
      title: '빛의 벙커',
      description: '제주 서귀포시 성산읍 서성일로1168번길 89-17 A동',
      website: 'https://www.deslumieres.co.kr/bunker'
    }
    ];

const mountainPhotos = [
    {
      imageSrc: 'images/yongin.jpeg',
      title: '용인자연휴양림',
      description: '경기 용인시 처인구 모현읍 초부로 220',
      website: 'https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030031'
    },
    {
      imageSrc: 'images/jangtae.jpeg',
      title: '장태산자연휴양림',
      description: '대전 서구 장안로 461',
      website: 'https://www.jangtaesan.or.kr:454/index.asp'
    },
    {
      imageSrc: 'images/youngin.jpeg',
      title: '영인산자연휴양림',
      description: '충남 아산시 영인면 아산온천로 16-26',
      website: 'https://forest.asanfmc.or.kr/forest/'
    },
    {
      imageSrc: 'images/juknok.png',
      title: '죽녹원',
      description: '전남 담양군 담양읍 죽녹원로 119',
      website: 'https://www.juknokwon.go.kr/index.juknok'
    },
    {
      imageSrc: 'images/jeollmul.jpeg',
      title: '절물자연휴양림',
      description: '제주 제주시 명림로 584',
      website: 'https://www.foresttrip.go.kr/indvz/main.do?hmpgId=ID02030053'
    },
    {
      imageSrc: 'images/gyeyang.jpeg',
      title: '계양산',
      description: '인천 계양구 계산동',
    },    
    {
      imageSrc: 'images/mani.jpeg',
      title: '마니산',
      description: '인천 강화군 화도면 상방리 산35',
    },    
    {
      imageSrc: 'images/jiri.jpeg',
      title: '지리산',
      description: '경남 함양군 마천면 추성리',
      website: 'https://www.knps.or.kr/front/portal/visit/visitCourseMain.do?parkId=120100&menuNo=7020100'
    },
    {
      imageSrc: 'images/seolaksan.jpeg',
      title: '설악산',
      description: '강원 인제군 북면 한계리',
      website: 'https://www.knps.or.kr/front/portal/visit/visitCourseMain.do?parkId=120400&menuNo=7020093'
    },    
    {
      imageSrc: 'images/wolmi.jpg',
      title: '월미도',
      description: '인천 중구 북성동1가 98-352',
      website: 'http://wolmi-do.co.kr/'
    },    
    {
      imageSrc: 'images/odongdo.jpeg',
      title: '오동도',
      description: '전남 여수시 수정동 산1-11',
      website: 'https://www.yeosu.go.kr/tour/'
    },
    {
      imageSrc: 'images/nami.jpeg',
      title: '남이섬',
      description: '강원 춘천시 남산면 남이섬길 1',
      website: 'https://www.namisum.com/'
    }
    ];

function displayFirstInfo() {
    const photoContainer = document.querySelector('.photo-container');
    photoContainer.innerHTML = '';

    for (const photoInfo of firstPhotos) { // firstPhotos 배열에 있는 정보들을 반복하여 화면에 추가
        // createPhotoDiv 함수를 호출하여 사진 정보를 담은 div 요소 생성
        const photoDiv = createPhotoDiv(photoInfo.imageSrc, photoInfo.title, photoInfo.description, photoInfo.website);
        photoContainer.appendChild(photoDiv); // 생성한 div 요소를 .photo-container에 추가
    }
}

function displayAmusementParkInfo() {
    const photoContainer = document.querySelector('.photo-container');
    photoContainer.innerHTML = '';

    for (const photoInfo of amusementParkPhotos) {
        const photoDiv = createPhotoDiv(photoInfo.imageSrc, photoInfo.title, photoInfo.description, photoInfo.website);
        photoContainer.appendChild(photoDiv);
    }
}

function displayHistoryInfo() {
  const photoContainer = document.querySelector('.photo-container');
  photoContainer.innerHTML = '';

  for (const photoInfo of historyPhotos) {
    const photoDiv = createPhotoDiv(photoInfo.imageSrc, photoInfo.title, photoInfo.description, photoInfo.website);
    photoContainer.appendChild(photoDiv);
  }
}

function displayAnimalPlantInfo() {
    const photoContainer = document.querySelector('.photo-container');
    photoContainer.innerHTML = '';

    for (const photoInfo of animalPlantPhotos) {
        const photoDiv = createPhotoDiv(photoInfo.imageSrc, photoInfo.title, photoInfo.description, photoInfo.website);
        photoContainer.appendChild(photoDiv);
    }
}

function displayMuseumInfo() {
    const photoContainer = document.querySelector('.photo-container');
    photoContainer.innerHTML = '';

    for (const photoInfo of museumPhotos) {
        const photoDiv = createPhotoDiv(photoInfo.imageSrc, photoInfo.title, photoInfo.description, photoInfo.website);
        photoContainer.appendChild(photoDiv);
    }
}

function displayParkInfo() {
    const photoContainer = document.querySelector('.photo-container');
    photoContainer.innerHTML = '';

    for (const photoInfo of parkPhotos) {
        const photoDiv = createPhotoDiv(photoInfo.imageSrc, photoInfo.title, photoInfo.description, photoInfo.website);
        photoContainer.appendChild(photoDiv);
    }
}

function displayWaterParkInfo() {
    const photoContainer = document.querySelector('.photo-container');
    photoContainer.innerHTML = '';

    for (const photoInfo of waterparkPhotos) {
        const photoDiv = createPhotoDiv(photoInfo.imageSrc, photoInfo.title, photoInfo.description, photoInfo.website);
        photoContainer.appendChild(photoDiv);
    }
}

function displayAquariumInfo() {
  const aquariumPhotos = [
    {
      imageSrc: 'images/coex.jpeg',
      title: '코엑스아쿠아리움',
      description: '서울 강남구 영동대로 513',
      website: 'https://www.coexaqua.com/'
    },
    {
      imageSrc: 'images/aquailsan.png',
      title: '아쿠아플라넷 일산',
      description: '경기 고양시 일산서구 한류월드로 282 아쿠아플라넷 일산',
      website: 'https://www.aquaplanet.co.kr/ilsan/index.do'
    },
    {
      imageSrc: 'images/aquagwangwo.jpeg',
      title: '아쿠아플라넷 광교',
      description: '경기 수원시 영통구 광교호수공원로 300 갤러리아 광교 파사쥬 지하 1층',
      website: 'https://www.aquaplanet.co.kr/gwanggyo/index.do'
    },
    {
      imageSrc: 'images/expoaqua.jpeg',
      title: '대전엑스포아쿠아리움',
      description: '대전 유성구 엑스포로 1 대전 신세계 Art&Science 지하 1층',
      website: 'http://www.djexpoaqua.com/'
    },
    {
      imageSrc: 'images/dajeonaqua.jpeg',
      title: '대전아쿠아리움',
      description: '대전 중구 보문산공원로 469',
      website: 'http://www.djaquarium.com/default/'
    }, 
    {
      imageSrc: 'images/sealife.jpg',
      title: '씨라이프부산아쿠아리움',
      description: '부산 해운대구 해운대해변로 266',
      website: 'https://www.visitsealife.com/busan/'
    },    
    {
      imageSrc: 'images/daeguaqua.png',
      title: '대구아쿠아리움',
      description: '대구 동구 동부로 149 신세계백화점 대구점 9층',
      website: 'https://daeguaqua.com/'
    },
    {
      imageSrc: 'images/danuri.jpeg',
      title: '다누리아쿠아리움',
      description: '충북 단양군 단양읍 수변로 111 다누리아쿠아리움',
      website: 'https://www.danyang.go.kr/aquarium/1383'
    },       
    {
      imageSrc: 'images/aramaru.jpeg',
      title: '아라마루 아쿠아리움',
      description: '경남 사천시 사천대로 18',
      website: 'https://aramaruaquarium.com/'
    },
    {
      imageSrc: 'images/seaworld.jpeg',
      title: '거제씨월드',
      description: '경남 거제시 일운면 지세포해안로 15',
      website: 'http://www.geojeseaworld.com/'
    },    
    {
      imageSrc: 'images/aqua.webp',
      title: '아쿠아플라넷 여수',
      description: '전남 여수시 오동도로 61-11 아쿠아리움',
      website: 'https://www.aquaplanet.co.kr/yeosu/index.do'
    },
    {
      imageSrc: 'images/aquajeju.jpeg',
      title: '아쿠아플라넷 제주',
      description: '제주 서귀포시 성산읍 섭지코지로 95 아쿠아플라넷 제주',
      website: 'https://www.aquaplanet.co.kr/jeju/index.do'
    }
    ];

    const photoContainer = document.querySelector('.photo-container');
    photoContainer.innerHTML = '';

    for (const photoInfo of aquariumPhotos) {
        const photoDiv = createPhotoDiv(photoInfo.imageSrc, photoInfo.title, photoInfo.description, photoInfo.website);
        photoContainer.appendChild(photoDiv);
    }
}

function displayBeachInfo() {
    const photoContainer = document.querySelector('.photo-container');
    photoContainer.innerHTML = '';

    for (const photoInfo of beachPhotos) {
        const photoDiv = createPhotoDiv(photoInfo.imageSrc, photoInfo.title, photoInfo.description, photoInfo.website);
        photoContainer.appendChild(photoDiv);
    }
}

function displayExperienceInfo() {
    const photoContainer = document.querySelector('.photo-container');
    photoContainer.innerHTML = '';

    for (const photoInfo of experiencePhotos) {
        const photoDiv = createPhotoDiv(photoInfo.imageSrc, photoInfo.title, photoInfo.description, photoInfo.website);
        photoContainer.appendChild(photoDiv);
    }
}

function displayMountainInfo() {
    const photoContainer = document.querySelector('.photo-container');
    photoContainer.innerHTML = ''; 

    for (const photoInfo of mountainPhotos) {
        const photoDiv = createPhotoDiv(photoInfo.imageSrc, photoInfo.title, photoInfo.description, photoInfo.website);
        photoContainer.appendChild(photoDiv);
    }
}

function createPhotoDiv(imageSrc, title, description, website) {
  const photoDiv = document.createElement('div');
  photoDiv.classList.add('photo');

  const photoLink = document.createElement('a'); // 사진 링크를 담은 a 요소 생성
  photoLink.href = website; // 해당 사진의 홈페이지로 링크 설정
  photoLink.innerHTML = `<img src="${imageSrc}" alt="Photo" class="photo">`; // 템플릿 리터럴 사용, 이미지 태그 생성 및 속성 설정, 변수 imageSrc의 값을 문자열로 삽입하여 이미지의 소스 경로가 동적으로 설정됨
  photoDiv.appendChild(photoLink);

  const descriptionParagraph = document.createElement('p'); // 설명을 담은 p 요소 생성
  descriptionParagraph.innerHTML = `${title}<br><br>${description}`; // 제목과 설명을 추가
  photoDiv.appendChild(descriptionParagraph);

  return photoDiv;
}

function search() {
  // 검색어 가져오기
  var searchTerm = document.getElementById('searchTerm').value.toLowerCase();
  
  // 검색 결과를 저장할 배열
  var searchResults = [];

  const allPhotos = amusementParkPhotos.concat(historyPhotos, animalPlantPhotos, museumPhotos, aquariumPhotos, parkPhotos, waterparkPhotos, beachPhotos, experiencePhotos, mountainPhotos);
  // 검색어와 일치하는 여행지를 찾아서 결과 배열에 추가
  for (var i = 0; i < allPhotos.length; i++) {
    var title = allPhotos[i].title.toLowerCase();
    if (title.includes(searchTerm)) {
      searchResults.push(allPhotos[i]);
    }
  }

  // 결과를 화면에 표시
  displaySearchResults(searchResults);

  // 검색 결과가 있을 때만 .search-results를 표시
  var searchResultsDiv = document.getElementById('searchResults');
  if (searchResults.length > 0) {
    searchResultsDiv.style.display = 'flex';
  } else {
    searchResultsDiv.style.display = 'none'; // 검색 결과가 없을 때 숨김
  }

  // 닫기 버튼에 이벤트 리스너 추가
  var closeButton = document.getElementById('closeButton');
  closeButton.addEventListener('click', function() {
    searchResultsDiv.style.display = 'none';
    // searchTerm 칸을 공백으로 설정
    document.getElementById('searchTerm').value = '';
  });
}

function displaySearchResults(results) {
  var searchResultsDiv = document.getElementById('searchResults');
  searchResultsDiv.innerHTML = ''; // 이전 검색 결과를 지움

  if (results.length === 0) {
    searchResultsDiv.style.display = 'none'; // 검색 결과가 없을 때 숨김
    searchResultsDiv.innerHTML = '<p>검색 결과가 없습니다.</p>';
  } else {
    searchResultsDiv.style.display = 'flex'; // 검색 결과가 있을 때 표시
    // 검색 결과를 화면에 표시
    for (var i = 0; i < results.length; i++) {
      var result = results[i];
      var resultDiv = document.createElement('div');
      resultDiv.classList.add('search-result-item');

      // 이미지 추가
      var img = document.createElement('img');
      img.src = result.imageSrc;
      resultDiv.appendChild(img);

      // 제목 추가
      var title = document.createElement('h2');
      title.textContent = result.title;
      resultDiv.appendChild(title);

      // 주소 추가
      var description = document.createElement('p');
      description.textContent = result.description;
      resultDiv.appendChild(description);

      // 웹사이트 링크 추가
      var websiteLink = document.createElement('a');
      websiteLink.href = result.website;
      websiteLink.textContent = '자세히 보기';
      resultDiv.appendChild(websiteLink);

      // 닫기 버튼 추가
      var closeButton = document.createElement('button');
      closeButton.id = 'closeButton';
      closeButton.textContent = '닫기';
      resultDiv.appendChild(closeButton);

      searchResultsDiv.appendChild(resultDiv);
    }
  }
}