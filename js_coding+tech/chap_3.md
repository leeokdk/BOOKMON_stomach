## 3장 특수한 컬렉션을 이용해 `코드 명료성`을 극대화 해라.

### Tip 10. 객체를 이용해 정적인 키-값을 탐색해라.

- 변화가 없고 구조화된 키-값 데이터를 다루는 경우 : 객체 활용
- 자주 갱신되거나 실행되기 전엔 알 수 없는 동적 정보를 다루는 경우 : 맵
```js
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

### Tip 11. Object.assign()으로 조작 없이 객체를 생성하라

```js
Object.assign(defaults, changes); //기존 값에 조작이 일어남
Object.assign({}, defaults , changes); //빈 배열에 추가
```
단 중첩 객체의 경우 객체가 가지고 있는 참조값이 복사된다.
 - 복사한 객체를 변경하면 원본객체도 영향을 받는다.
 - assign도 중첩으로!
```js
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

### Tip 12. 객체 펼침 연산자로 정보를 갱신하라
- 키-값 쌍을 목록에 있는 것처럼 반환
- 새로운 정보는 펼침 연산자의 앞이나 뒤에 쉽게 추가
- (배열 펼침 연산자와 마찬가지로)독립적으로 사용할 수는 없고 객체에 펼쳐지게 해야 함
- 동일한 키에 서로 다른 값을 추가하면 어떤 값이든 가장 마지막에 선언된 값을 사용
```js
  const update = {...burger, year: 1955}
  const update2 = {...french, ...potato}
```
중첩객체 처리
```js
  // # START:deepMerge
  const employee = {
    ...defaultEmployee,
    name: {
      ...defaultEmployee.name,
    },
  };
  // # END:deepMerge
```

### Tip 13. 맵으로 명확하게 키-값 데이터를 갱신하라
- 키-값 쌍이 자주 추가되거나 삭제되는 경우, 키가 문자열이 아닌 경우에는 **맵Map**을 사용하는게 좋다.
  - 키-값 쌍이 자주 추가되거나 삭제되는 경우 : 맵의 메서드를 활용, 훨씬 쉽고 간편하게 사용. 
  - 키가 문자열이 아닌 경우 : 특히 객체는 정수를 키로 활용할 수 없다. 맵은 가능.
- map.keys() 메서드는 배열이 아닌 `맵이터레이터MapIterator`를 반환한다.

### Tip 14. 맵과 펼침 연산자로 키-값 데이터를 순회하라
- 반복문 또는 펼침 연산자를 이용해 키-값 데이터를 순회할 수 있다.
- 객체와 달리 맵은 직접 순회가 가능.
- 맵이터레이터는 키-값 쌍을 넘긴다. entries() 메서드는 맵의 키-값 쌍을 반환.
- 정렬 메서드 대신 펼침 연산자를 사용한다. 맵의 펼침 연산자는 키-값 쌍을 반환.
  - 비교함수를 사용하면 코드의 의도를 더욱 명확하게 전달.
  - map(), sort(), join() 등 메서드 적극 활용
```js
// START:sort
function getSortedAppliedFilters(filters) {
  const applied = [...filters] //맵을 배열로 변환 
    .sort(sortByKey) //배열을 정렬
    .map(([key, value]) => {
      return `${key}:${value}`; //배열에 담긴 키-값 쌍을 '키:값' 형식의 문자열로 변환
    })
    .join(', '); //배열을 연결해서 문자열로

  return `Your filters are: ${applied}.`; //템플릿 리터럴을 이용해 다른 정보와 함께 문자열로 병합
}
// 'Your filters are: breed:labrador, color:black.'
// END:sort
```

### Tip 15. 맵 생성 시 부수 효과를 피하라
- 맵을 병합하고 새로운 맵을 만드는 간단한 방법, 펼침 연산자 활용하기.
```js 
// START:apply
function applyDefaults(map, defaults) {
  return new Map([...defaults, ...map]);
}
// END:apply
```
### Tip 16. 세트를 이용해 고윳값을 관리하라
- 세트Set는 한가지 특화기술 전문
- 값을 추가할 때는 add(), 검증할 때는 has(), 비울 땐 delete(), clear() 등 사용.
```js
// #START:unique
function getUnique(attributes) {
  return [...new Set(attributes)]; //기존 정보가 담긴 배열을 순회 후 배열을 조작해서 고윳값을 분류.
}
// #END:unique

// #START:uniqueColors
function getUniqueColors(dogs) {
  const unique = new Set(); 
  for (const dog of dogs) {
    unique.add(dog.color);
  }
  return [...unique]; //각종 메서드 활용
}
// #END:uniqueColors

function getUniqueColorsReduce(dogs) {
  const colors =
// #START:uniqueReduce
[...dogs.reduce((colors, { color }) => colors.add(color), new Set())]; //reduce() 활용
  // #END:uniqueReduce
  return colors;
}
```
