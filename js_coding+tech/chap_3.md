##3장 특수한 컬렉션을 이용해 `코드 명료성`을 극대화 해라.

###Tip 10. 객체를 이용해 정적인 키-값을 탐색해라.

- 변화가 없고 구조화된 키-값 데이터를 다루는 경우 : 객체 활용
- 자주 갱신되거나 실행되기 전엔 알 수 없는 동적 정보를 다루는 경우 : 맵
```
const arr = ['#asdfc','#qwerr','#zxcvv']
const obj = {
    red : '#asdfc',
    blue : '#qwerr',
    green : '#zxcvv'
} //객체 리터럴
const remind = `${stuff}` //템플릿 리터럴
```
- 정적인 객체의 프로그래밍적 정의
  - 데이터를 매번 같은 방식으로 설정하고 사용 (조작 x, 새로운 객체)
  - 키를 먼저 알고 있어 변수를 이용해 키를 설정하지 않는다
  - 다른 컬렉션보다 빠르고 명료함. `객체 해체 할당` 가능.
  - 허나 프로그래밍을 이용해서 객체에 많은 정보를 추가해야하는 경우에는 맵 객체처럼 다른 종류의 컬렉션이 더 적합할 수도 있다.

###Tip 11. Object.assign()으로 조작 없이 객체를 생성하라

```
Object.assign(defaults, changes); //기존 값에 조작이 일어남
Object.assign({}, defaults , changes); //빈 배열에 추가
```
단 중첩 객체의 경우 객체가 가지고 있는 참조값이 복사된다.
 - 복사한 객체를 변경하면 원본객체도 영향을 받는다.
 - assign도 중첩으로!
```jshelllanguage
  // # START:deepMerge
  const employee2 = Object.assign(
    {},
    defaultEmployee,
    {
      name: Object.assign({}, defaultEmployee.name),
    },
  );
  // # END:endMerge
```

###Tip 12. 객체 펼침 연산자로 정보를 갱신하라
- 키-값 쌍을 목록에 있는 것처럼 반환
- 새로운 정보는 펼침 연산자의 앞이나 뒤에 쉽게 추가
- (배열 펼침 연산자와 마찬가지로)독립적으로 사용할 수는 없고 객체에 펼쳐지게 해야 함
- 동일한 키에 서로 다른 값을 추가하면 어떤 값이든 가장 마지막에 선언된 값을 사용
```jshelllanguage
  const update = {...burger, year: 1955}
  const update2 = {...french, ...potato}
```
중첩객체 처리
```jshelllanguage
  // # START:deepMerge
  const employee = {
    ...defaultEmployee,
    name: {
      ...defaultEmployee.name,
    },
  };
  // # END:deepMerge
```
