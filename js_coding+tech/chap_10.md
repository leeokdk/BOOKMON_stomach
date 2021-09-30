
## chap 10 컴포넌트 아키텍처를 이용해 관련 파일을 모아라

### tip 47 가져오기와 내보내기로 기능을 분리하라

> export 로 내보내기
> inport 로 가져오기

#### 함수 내보내기와 가져오기

- method.js
```javascript
function getPower(decimalPlaces) {
  return 10 ** decimalPlaces;
}

function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1);
}

function roundToDecimalPlace(number, decimalPlaces = 2) {
  const round = getPower(decimalPlaces);
  return Math.round(number * round) / round;
}

// 함수 두 개는 내보내고 한 개는 비공개하기
export { capitalize, roundToDecimalPlace };
```

- index.js
```javascript
import { capitalize, roundToDecimalPlace } from "./method";
// import { capitalize } from "./method"; 하나만 가져오기도 가능

function giveTotal(name, total) {
  return `${capitalize(name)}님, 합계는 ${roundToDecimalPlace(total)}입니다.`;
}

let mainText = document.getElementById("app");
mainText.innerText = giveTotal("sara", 10.33333333);

```

#### 함수 뿐만 아니라 변수와 클래스도 가능

- method.js
```javascript
const PI = 3.14;
const E = 2.71828;

export { PI, E };
// 해체할당과 매우 비슷
```

#### 별표(*)를 이용해서 모든 함수를 불러오고 변수명을 지정할 수 있다
- index.js
```javascript
import * as utils from './method'; //as를 사용해 utils란 이름을 붙임.

function giveTotal(name, total) {
  return `${utils.capitalize(name)}님, 합계는 ${utils.roundToDecimalPlace(total)}입니다.`;
}

console.log(giveTotal("sara", 10.33333333));

function greet(name) {
  return `Hello, ${utils.capitalize(name)}`;
}

console.log(greet("ashley"));

console.log(utils.E);

```

#### 파일의 끝에서 export할 목록을 추가하는 대신 각각의 함수 앞에 export 키워드를 붙여 선언한다

- method.js
```javascript
function getPower(decimalPlaces) {
  return 10 ** decimalPlaces;
}

export function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1);
}

export function roundToDecimalPlace(number, decimalPlaces = 2) {
  const round = getPower(decimalPlaces);
  return Math.round(number * round) / round;
}

```

#### 파일 내보내기 기본값 설정

- address.js
```javascript
import { capitalize } from "./method";

export function parseRegion(address) {
  const region = address.state || address.providence || "";
  return region.toUpperCase();
}

export function parseStreet({ street }) {
  return street
    .split(" ")
    .map((part) => capitalize(part))
    .join(" ");
}

//export 뒤에 default를 붙여서 normalize()를 내보내기 기본값으로 설정함
export default function normalize(address) { 
  const street = parseStreet(address);
  const city = address.city;
  const region = parseRegion(address);
  return `${street} ${city}, ${region}`;
}

```

- main.js
```javascript
// 기본값으로 명명된 normalize()를 가져올 땐 괄호 없이 가져온다
// 이름을 다른걸로 해도 괄호가 없으면 기본값으로 인식하나 가독성을 위해 같은 이름을 사용하는게 좋다
import normalize, { parseRegion } from "./address"; //혼합해서 가져오기도 가능. 쉼표로 분리.

function getAddress(user) {
  return normalize(user.address);
}

export function getAddressByRegion(users) {
  return users.reduce((regions, user) => {
    const { address } = user;
    const region = parseRegion(address);
    const addresses = regions[region] || [];
    regions[region] = [...addresses, normalize(address)];
    return regions;
  }, {});
}

const bars = [
  {
    name: "Saint Vitus",
    address: {
      street: "1120 manhattan ave",
      city: "Brooklyn",
      state: "NY"
    }
  }
];

console.log(getAddressByRegion(bars));

```
> ❓ default는 export 된 모든 것 중에 하나만 사용할 수 있는지.

- 가져오기 기본값은 특히 `클래스`를 불러올 때 좋다. (하나만 필요하니까)
> ❓ 해당 예제는 export default인데 왜 가져오기 기본값이라고 하는지.

### tip 48 npm으로 커뮤니티 코드를 끌어와라

#### npm 사용하는 목적
- 다른 사람이 만든 코드를 가져오기 위해
- 프로젝트의 메타데이터와 구성정보를 설정하기 위해
- 명령줄 스크립트를 실행하기 위해
- 다른 사람이 쓸 수 있도록 프로젝트를 게시하기 위해

0. npm 사용을 위해 Node.js 설치 (package.json 파일 설치확인)
1. 오픈 소스 코드 검토
2. npm install --save lodash(코드명) 으로 다운로드 (package.json 파일 변경확인)
3. import로 코드 적용. 라이브러리를 설치했기 때문에 경로작성 X (import lodash, { fromPairs } from 'lodash';)

> npm install --save 와 npm install --save-dev 의 차이.

> 직접해보니 node_module에 패키지가 생성까진 되는데 package.json이 갱신되진 않음...

### tip 49 컴포넌트 아키텍처를 이용해 애플리케이션을 만들어라
### tip 50 빌드 도구를 이용해 컴포넌트를 결합하라
### tip 51 CSS 애니메이션을 활용하라
