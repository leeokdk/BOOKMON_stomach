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

### Tip 45. fetch로 간단한 AJAX 호출을 처리하라

### Tip 46. localStorage로 상태를 장기간 유지하라
