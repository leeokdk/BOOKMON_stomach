## 9장 외부 데이터에 접근하라

### Tip 43. 프라미스를 이용해 비동기적으로 데이터를 가져오라
> **비동기 언어**란? 👉 이전의 코드가 완전히 해결되지 않아도 이어지는 코드를 실행할 수 있는 언어

때문에 비동기 언어는 지연된 정보를 기다리는 동안 이 정보가 필요하지 않은 다른 코드를 실행할 수 있다.
비동기 데이터를 다룰 때 반복적으로 사용할 수 있는 기법으로 프라미스가 있다.

- 프라미스가 등장하기 전 콜백함수를 사용해 비동기 작업을 처리
```javascript
// API에서 데이터를 가져온 후 콜백으로 데이터를 전달
function getUserPreferences(cb) {
  // setTimeout 함수로 정보호출이 지연되는 것을 모방
  return setTimeout(() => {
    cb({
      theme: "dusk"
    });
  }, 1000);
}

function log(value) {
  return console.log(value);
}

log("starting");

getUserPreferences(preferences => {
  return log(preferences.theme.toUpperCase());
});

log('ending?');
// starting ending? dusk 순으로 출력

```
자바스크립트가 비동기 언어이므로 getUserPreferences()를 호출하기 전이나 호출한 후에 다른 함수를 호출할 수 있고, 
이렇게 호출한 함수들은 getUserPreferences()가 콜백 함수를 실행하기 **전에** 완료한다.

하지만 이런 작업은 너무 많은 콜백 함수가 중첩되는 경우(콜백지옥)를 발생시킬 수 있다.
(ex. 사용자의 취향에 맞는 음악 목록을 가져올 경우: getUserPreferences()를 호출하면서 API를 호출하는 getMusic()을 콜백함수로 전달, 또한 getMusic()의 인수로 preferences.theme와 콜백함수를 전달...)

- 프라미스를 사용해 지옥에서 탈출

프라미스는 콜백함수를 인수로 받는 대신 성공과 실패에 대응하는 메서드를 사용한다.

```javascript
// 프라미스를 반환
function getUserPreferences(cb) {
  const preferences = new Promise((resolve, reject) => {
    resolve({
      theme: 'dusk',
    });
  });
  return preferences;
}

getUserPreferences()
  //비동기 작업이 성공한 경우에 then() 메서드를 이용해서 코드 호출
  .then(preferences => {
    console.log(preferences.theme);
  })
  // 실패한 경우 catch. 연달아 작성해줌
  .catch(error => {
    console.log(`실패: ${error.type}`);
  });

```

위에서 묘사한 음악목록 가져오기도 콜백함수와 프라미스 버전으로 비교해보자

```javascript
//API 호출, 응답에 따라 실행될 콜백 함수를 가진 getMusic()
function getMusic(theme, cb){
  return setTimeout(() => {
    if(theme === 'dusk'){
      return cb({
        album: 'music for airports',
      });
    }
    return cb({
      album: 'kind of blue',
    });
  }, 1000);
}

//콜백 함수 두단계 중첩
getUserPreferences(preferences => {
  return getMusic(preferences.theme, music => {
    console.log(music.album);
  });
});
```
```javascript
//프라미스로 바꾼 getMusic
function getMusic(theme){
    if(theme === 'dusk'){
      return Promise.resolve({
        album: 'music for airports',
      });
    }
    return Promise.resolve({
      album: 'kind of blue',
    });
}

//여러개 중첩된 콜백함수에 데이터를 전달하는 대신 
//여러 개의 then() 메서드를 통해 데이터를 아래로 내려준다.
getUserPreferences()
.then(preferences => {
  return getMusic(preferences.theme);
})
.then(music => {
  console.log(music.album);
});
//한줄도 가능
getUserPreferences()
.then(preferences => getMusic(preferences.theme))
.then(music => { console.log(music.album); });

```

프라미스를 연결하는 경우에는 catch() 메서드를 개별적으로 연결하지 않아도 된다.
catch() 메서드를 하나만 정의해서 프라미스가 거절되는 모든 경우를 처리할 수 있다.
```javascript
//예술가의 앨범을 반환하는 프라미스
function getArtist(album){
  return Promise.resolve({
    artist: 'Brian Eno',
  });
}

//거부 프라미스
function failMusic(theme){
  return Promise.reject({
    type: '네트워크 오류',
  });
}

getUserPreferences()
.then(preferences => failMusic(preferences.theme))
.then(music => { console.log(music.album); })
.catch(e => { //getMusic()이 거부될 때 실행
  console.log(e);
});
```
> ❓ 위의 방법과 초반 정의방법의 차이?


### Tip 44. async/await로 함수를 명료하게 생성하라
프라미스는 콜백함수에 비해 훌륭한 방법이긴 하나 여전히 메서드에서 콜백을 다루고 있다. 
이를 보완하고자 **비동기 프라미스 데이터를 단일 함수의 변수에 추가**해서 콜백 사용을 완전하게 피할 수 있는 방법이 생겼다.

- async / await 는 훌륭한 짝이지만 서로 분리된 동작이다!
  - async : 비동기 데이터를 사용한다는 의미
  - await : 값이 반환될 때까지 함수의 실행을 중지
> ☝️ 주의할 점.<br>
> async / await 는 더 나은 방법으로 프라미스를 보완하는 것이지 대체하는 것이 아니다.<br>
> 대부분의 최신 브라우저는 지원하지만 아닐 수도 있으니 확인할 것.
```javascript
/* 일반 프라미스 사용할 때
  // getUserPreferences() 함수의 then() 메서드에 함수를 넘기는 코드
  getUserPreferences()
  .then(preferences => {
    console.log(preferences.theme);
  });
*/

//async로 비동기임을 알려줌
async function getTheme(){
  //await로 프라미스를 반환한다는 것을 알려줌
  const { theme } = await getUserPreferences(); //dusk
  //const theme = await getUserPreferences();  //{theme: "dusk", ring: "me"}
  //해체할당으로 하는 이유
  return theme;
}

//비동기 함수는 프라미스로 변환된다. getTheme()을 호출해도 then()사용가능
getTheme().then(theme => {
  console.log(theme);
});
```

#### 💡 _사실 async 함수가 정말 빛나는 때는 여러 개의 프라미스를 다룰 때다._
```javascript
// 연결된 프라미스를 하나의 함수로 감싸진 여러 개의 함수 호출로 변환
async function getArtistByPreference(){
  const { theme } = await getUserPreferences();
  const { album } = await getMusic();
  const { artist } = await getArtist(); //awiat를 빼면 undefined를 반환.
  return artist;
}

getArtistByPreference()
  .then(artist => {
    console.log(artist);
  })
  .catch(e => { //오류처리용 catch
    console.log(e);
  });
```
프라미스의 용도 => 주로 API를 사용할 때!

> ❓ 비동기 언어로 이전 코드가 완료되지 않아도 코드가 진행될 수 있도록 해놨는데
> await로 값이 반환될 때까지 기다리면 비동기 언어를 쓰지 않을 때랑 무슨 차이가 있는지?

### Tip 45. fetch로 간단한 AJAX 호출을 처리하라
 
<small>
🧐 단일 페이지 웹앱은 자바스크립트가 인기를 끄는 이유 중 하나이지만, AJAX(비동기 자바스크립트와 XML)로 데이터를 가져오는 작업은
번거로운 과정이었다. 이 복잡도를 낮추기 위해 jQuery같은 라이브러리를 사용했다.
</small>

하지만 AJAX 호출을 처리할 수 있는 fetch()가 등장!
<details>
<summary>주의: fetch()는 자바스크립트 명세의 일부가 아니다</summary>
<div markdown="1">       

fetch()는 대부분의 최신 브라우저에서 지원되지만 Node.js에서는 기본적으로 지원되지 않는다.
Node.js에서 fetch()를 사용하려면 node-fetch 패키지를 사용해야 한다.

</div>
</details>

[가상의 블로그 데이터로 연습하자](https://jsonplaceholder.typicode.com/)

[typicode에서 제공하는 JSON 서버로 로컬 환경에서 모의 API도 만들 수 있다](https://my-json-server.typicode.com/)

```javascript
//데이터를 가져오는 get 요청, 응답을 처리하는 프라미스 반환
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(data => {
    // catch() 블록으로는 요청이 실패하는 경우를 잡을 수 없음
    // ok 필드는 응답 코드가 200 ~ 299 사이인 경우 true 반환
    if(!data.ok){
      throw Error(data.status);
    }
    return data.json(); //json() 호출로 JSON으로 변환
    //json 메서드도 프라미스 반환
  })
  .then(post => {
    console.log(post.title); //파싱된 데이터 처리
  })
  .catch(e => {
    console.log(e);
  });

//데이터를 등록하는 post 요청
const update = {
  title: 'Clarence White Techniques',
  body: 'amazing',
  userId: 1,
};

const options = {
  method: 'post', //post 메서드 사용 선언
  headers: { //JSON 데이터를 보내기 위한 헤더의 설정
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(update),
};

//추가 설정을 위한 options 추가
fetch('https://jsonplaceholder.typicode.com/posts/',options).then(data => {
  if(!data.ok){
    throw Error(data.status);
  }
  return data.json(); 
}).then(update => {
    console.log(update); 
}).catch(e => {
  console.log(e);
});

```
### Tip 46. localStorage로 상태를 장기간 유지하라

사용자가 페이지를 떠나거나 새로고침하면 데이터가 갱신되고 다시 작성해야하는 번거로움이 생긴다.<br>
이 때 유용하게 사용할 수 있는 localStorage.

> 장점! 데이터를 브라우저에 저장하여 사용자의 번거로움을 줄이고 정보를 가져오는 수고를 줄이자!<br>
> 단점. 여러 기기에서 데이터를 공유/유지할 수 없다. 보안과 직결되는 정보는 로컬스토리지에 저장하면 위험.

<small>
기능의 목표: <br>
선호하는 견종을 브라우저에 저장하여 조건을 초기화(페이지 갱신 등)할 때 불러올 수 있다.
</small>

- localStorage 기본
```javascript
function saveBreed(breed){
	localStorage.setItem('breed', breed); //map의 형태
}

function getBreed(){
	return localStorage.getItem('breed'); 
}

function removeBreed(breed){
	localStorage.removeItem('breed'); 
}

// 저장한 데이터 모두 지우기
function clearPreferences(){
	localStorage.clear();
}
```

- localStorage 에 정보가 있으면 추가
```javascript
function applyBreedPreference(filters){ 
  const breed = getSavedBreed();
  if (breed) {
    filters.set('breed',breed);
  }
  return filters;
}
```

- localStorage 를 사용할 경우 반드시 `문자열`(배열, 객체 X)이어야 한다.
```javascript
// 데이터를 localStorage에 저장할 때
// 데이터를 문자열로 변환
function savePreferences(filters){
	const filterString = JSON.stringfy([...filters]); 
				// 조건을 처리할 때 맵을 사용했기 때문에 먼저 배열에 펼쳐 넣어야 한다.
	localStorage.setItem('preference', filterString);
}

// 저장한 데이터를 다시 사용하기 위해 불러올 때
// 데이터를 맵으로 변환
function retrievePreferences(){
	const preferences = JSON.parse(localStorage.getItem('preferences')); 
	return new Map(preferences);
}
```

- sessionStorage의 경우 서버 측 렌더링과 클라이언트 측 기능이 혼합되어 있는 경우 유용하다.<br>
<small>
ex) 새로 고침하면 저장한 데이터 유지, 페이지를 떠났다고 돌아오면 저장한 데이터가 없는 기본 상태
</small>

> ❓ 세션 스토리지와 세션은 같은 것인가?