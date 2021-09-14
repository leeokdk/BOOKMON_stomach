## 5장 반복문을 단순하게 만들어라

### Tip 20. 화살표 함수로 반복문을 단순하게 만들어라
- 기명 함수 : 이름이 함수의 일부로 선언되어 있다
    ```js
    function namedFunction(){
    }
    ```
- 익명 함수 : 함수의 이름을 설정하지 않고 함수를 변수의 일부로 선언한다
    ```js
    const assignedFunction = function(){
    } 
    ```
- 화살표 함수 : 함수 작성을 짧고 간결하게! 필요하지 않은 정보를 걷어내자.
  - 쓰지 않는 것 : ~~function 키워드, 인수를 감싸는 괄효, return 키워드, 중괄호~~ 
  - 그대신 써야 하는 것 : __=>__
  - 매개변수가 없거나 2개 이상일 때 `()`를 사용한다.
    ```js
    const key = () => {
      return 'abc123';
    };
    const greet = (first, last) => {
      return `Hello, ${capitalize(first)} ${capitalize(last)}`;
    };
    ```
  - 중괄호 안이 한줄일 때 `{}`와 `return` 도 필요없이 정의 가능하다.
    ```js
    const formaUser = name => `${capitalize(name)} is logged in.`;
    ```
  - 콜백함수를 인수로 받는 함수에서 원본함수를 호출할 때 화살표 함수를 이용하면 더 간략하게 전달 가능하다.
    ```javascript
    //콜백함수
    function applyCustomGreeting(name, callback) {
      return callback(capitalize(name));
    };
    //호출
    applyCustomGreeting('mark', name => `안녕, ${name}!`);
    ```

### Tip 21. 배열 메서드로 반복문을 짧게 작성하라
- 배열 메서드의 목표: 불필요한 데이터 배제, 간결하고 예측 가능한 코드 만들기
- 치트시트
  - `map()` : **형태**를 바꿀 수 있지만 길이는 유지한다.
  - `sort()` : 형태나 길이는 변경되지 않고 **순서**만 바꾼다.
  - `filter()` : **길이**를 변경하지만 형태는 바꾸지 않는다.
  - `find()` : 배열을 반환하지 않는다. **한 개의 데이터가 반환**되고 형태는 바뀌지 않는다.
  - `forEach()` : 형태를 이용하지만 **아무것도 반환하지 않는다**.
  - `reduce()` :길이와 형태를 바꾸는 것을 비롯해 **무엇이든 처리할 수 있다**.
- 배열 메서드는 연결해서 사용할 수 있다.

### Tip 22. map() 메서드로 비슷한 길이의 배열을 생성하라
- band 배열에서 instrument만 가져오기
```
  const instruments = [];
  for (let i = 0; i < band.length; i++) {
    const instrument = band[i].instrument; 
    instruments.push(instrument); 
  }
```
- 3행과 4행 분리.
- instrument를 가져오는 로직 분리.
```
  function getInstrument(member) {
    return member.instrument;
  };
  const instruments = [];
  for (let i = 0; i < band.length; i++) {
    instruments.push(getInstrument(band[i]));
  };
```
- 본격적으로 map() 이용: 새로운 값을 담을 배열, push() 모두 사용하지 않는다.
- 실행 결과
  - `배열을 얻게 된다`. 실행 전에 미리 배열을 선언할 필요가 없다.
  - 원본 배열과 `같은 길이의 배열`이 생성된다.
  - 악기만 배열에 담기고 `다른 정보는 담기지 않는다`.
```
  function getInstrument(member) {
    return member.instrument;
  };
  const instruments = band.map(getInstrument);
```
- 화살표 함수로 리팩토링
```
  const instruments = band.map(member => member.instrument);
```

### Tip 23. filter()와 find()로 데이터의 부분집합을 생성하라
- 문자열 'Dav'를 포함하는 배열 daves를 작성
```
  const daves = [];
  for (let i = 0; i < team.length; i++) {
    if (team[i].match(/Dav/)) { //일치하는지 확인하는 match 함수
      daves.push(team[i]);
    }
  }
```
- filter() 사용
  - 새로운 배열에 참인 값만 담는다.
  - 반환 값을 유지하는게 아닌 반환 값이 true일 때는 값을 유지한다는 개념.
  - 반환되는 배열은 원본의 배열 순서도 그대로 유지.
  - 항상 배열을 반환하며 조건에 일치하는 값이 없는 경우에도 배열을 반환. (arr.length == 0)
```
  const daves = team.filter(member => member.match(/Dav/));
```

- 근무 중인 도서관이 '기념도서관'인 사서 찾기
```
  let memorialInstructor;
  for (let i = 0; i < instructors.length; i++) {
    if (instructors[i].libraries.includes('기념 도서관')) {
      memorialInstructor = instructors[i];
      break;
    }
  }
```
- find() 사용
  - 일치하는 항목이 최대 하나거나 하나만 필요로 할 때.
  - 참 값을 반환하는 첫번째 항목만 반환.
  - 특히 반복문에서 break 문을 사용하는 경우가 바로 find를 쓸 때.
  - 하드코딩이 필요하며 배열 메서드의 콜백 함수는 인수가 하나뿐.
```
  const librarian = instructors.find(instructor => {
    return instructor.libraries.includes('기념 도서관');
  });
```

### Tip 24. forEach()로 동일한 동작을 적용하라
- 개별 회원정보에서 이메일 가져와 이메일 보내기
```
  for (let i = 0; i < sailingClub.length; i++) {
    sendEmail(sailingClub[i]);
  }
```
- forEach() 사용
  - 다른 메서드처럼 간단하게 만들기 위해서가 아닌 예측 가능하면서도 다른 배열 메서드와 같이 작동해 함께 연결(`체이닝`)할 수 있기 때문에 사용한다.
  - forEach에서 처리하는 동작은 모두 함수 외부에 영향을 준다.
  - 부수 효과 없이는 아무 소용이 없다. (코드 테스트 필요)
  - **반드시 부수효과가 필요한 경우** forEach를 사용한다.
```
  sailingClub.forEach(member => sendEmail(member));
```

### Tip 25. 체이닝으로 메서드를 연결하라

간단히 말하자면 메서드를 연이어 호출할 수 있다는 것이다.

- 각자 계산.
```
  // 비활동 회원 걸러내기
  const active = sailors.filter(sailor => sailor.active);
  // 이메일 있으면 사용 없으면 기본 이메일주소
  const emails = active.map(member => member.email || `${member.name}@wiscsail.io`);
  // 이메일전송
  emails.forEach(sailor => sendEmail(sailor));
```

- 체이닝

  👉 [주의] forEach()는 아무것도 반환하지 않기 때문에 다른 배열을 호출할 수도 없고 변수에 할당할 수도 없다.

```
  sailors
    .filter(sailor => sailor.active)
    .map(sailor => sailor.email || `${sailor.name}@wiscsail.io`)
    .forEach(sailor => sendEmail(sailor));
```

장점: 각 배열 메서드가 고유의 작업을 수행하기 때문에 코드를 한 눈에 이해할 수 있다.

단점: 일반문보다 더 많이 반복하여 대규모 작업의 경우 성능이 저하된다.

### Tip 26. reduce()로 배열 데이터를 변환하라

- reduce()에 대해 더 자세히.
  - 배열을 이용해서 근본적으로 다른 새로운 데이터를 만들어야 할 때 사용한다.
  - 배열의 길이와 데이터 형태를 모두 또는 각각 변경할 수 있다.
  - 반드시 배열을 반환할 필요도 없다.
  - 맨 뒷부분부터 보면 결괏값을 쉽게 알 수 있다.

```
  const colors = dogs.reduce((colors, dog) => { 
    if (colors.includes(dog.color)) { 
      return colors;
    }
    return [...colors, dog.color]; // return 으로 값을 반환시켜줘야.
  }, []); 
```

- map() vs reduce()
  - 한 가지 속성의 값을 모을 때엔 map()이 더 간편.
  - 유연성 및 가독성이 필요할 경우 reduce().
  
### Tip 27. for...in 문과 for...of 문으로 반복문을 정리하라.

- 매번 베열 메서드만 쓰는게 아니다!
  - 필요한 결과와 일치하지 않을 때 반복문을 빠져나오고 싶음.
  - 배열이 아닌 컬렉션을 다룰 때 배열 메서드를 사용하면 지나치게 복잡함.

- for...of 문의 장점 단점
  - 단점 : 반복문으로 무엇이든 가능하기에 예측가능성이 무너지는 문제.
  - 장점 : 위가 유일한 단점.
  - 그렇다고 무조건적으로 반복문이 좋은 것만은 아니다. 조작의 위험성이 있기 때문에 메서드를 사용해서 해결할 수 있다면 하고 반복문은 차선책으로 두는 편이 좋다.

- for...in 의 경우.
  - for...of 와 매우 유사하지만 키-값 객체에서만 작동.
  - 객체의 속성적인 부분 때문에 여러 문제가 있음. *MDN 참고
  - for...of 문과 다르게 값을 받는 것이 아니여서 매번 키를 사용해 전체 컬렉션을 참조해야 함.
  - 반복문은 차선책!


    🚨 객체를 순회하면서 객체를 조작하지 말 것.
