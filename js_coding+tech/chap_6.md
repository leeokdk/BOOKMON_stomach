## 6장 매개변수와 return 문을 정리하라.

### Tip 28. 매개변수 기본값을 생성하라
- 매개변수가 추가되면 모든 함수에 적용시켜야 한다? No!
  - 자바스크립트에서는 함수에 모든 매개변수를 전달할 필요가 없다.
  - 매개변수를 누락하면 값은 `undefined`가 된다.
```javascript
function convertWeight(weight, ounces){
	const oz = ounces ? ounces/16 : 0;
	const total = weight + oz;
	return total  /2.2;
}
convertWeigt(10); //4.5454545456
```
> 부동소수점 이슈가 존재

- 단 변수가 추가될 때마다 함수 내용의 단락이 길어지고 코드에 대한 가독성이 떨어지는 걸 피할 수 없게 된다.
  - 이럴 때 본문의 기본값을 변수에 직접 줄 수 있다!
```javascript
function convertWeight(weight, ounces = 0, roundTo = 2){
	const total = weight + (ounces / 16);
	const conversion = total / 2.2;
	return roundToDecimalPlace(conversion, roundTo);
}
```
> 특정한 자료형이 필요하다는 단서를 다른 개발자에게 알려줄 수도 있다.
>> 물론 타입 스크립트를 쓰는 쪽이 더 낫다.

    값을 전달하고 싶지 않은 경우 매개변수에 0이 아닌 undefined를 전달하면 함수가 매개변수 기본값을 사용한다. 
    하지만 잘못 전달되어 null이들어가게 되면 설정한 기본값이 사용되지 않는 불상사가 일어난다.
    보통 변수로 객체를 전달하여 이 문제를 해결한다.

### Tip 29. 해체 할당으로 객체 속성에 접근하라
6 29 해체 할당으로 객체 속성에 접근하라
매개변수가 다수일때 중간을 건너 뛰고 변수를 입력하는 경우 기본값을 무시하는 문제가 있다,
보통 이 문제를 객체로 전달하는 방식으로 해결한다.
또한 변수의 양이 굉장히 많을 때 도 유용하게 쓰인다,.

하지만 객체 변수도 생각해야할 점이 존재한다.
미리 알 수 있는 값을 받아서 처리하는 것은 ₩객체.키값₩으로 쉽게 가져올 수 있다.
하지만 미리 알 수 없는 과도한 양의 정보를 다룰 때는?
=> 다른 곳에서 사용할 키-값 쌍은 제거하고 남은 값을 유지하는 것뿐이다.

function displayPhoto(photo){
	const title = photo.title;
	const photographer = photo.photographer || 'Anonymous';
	const location
	... 
이런식으로 기존 코드는 객체에서 정보를 가져오는 작업을 굉장히 길게 해줘야 한다.

자바스크립트에서는 해체 할당이라는 과정을 통해 객체에 있는 정보를 곧바로 변수에 할당할 수 있다.
	1. 먼저 객체에 있는 키와 같은 이름의 변수를 생성하고
	2. 객체에 있는 키에 연결된 값을 생성한 변수의 값으로 할당한다.
```
const landscape = {
	photographer: 'Nathan',
};
const { photographer } = landscape; 

photographer; //Nathan
```
키를 이용해서 변수를 할당할 때
> 여전히 변수의 형식으로 선언
> 값을 할당하는 변수의 이름은 객체에 있는 키와 반드시 일치
> 변수가 객체를 이용해서 선언됨

객체에 키가 존재하지 않을 때
> 값은 undefined가 되지만 해체 할당을 하면서 도오시에 기본값을 설정할 수 있다
```
const landscape = {};
const { photographer = 'Anonymous', title } = landscape;

photographer; //Anonymous

title; //undefined
```

객체에 키를 모를 때 
펼침연산자 가 아닌 나머지 연산자 사용.
> 나머지 연산자
 펼침 연산자와 모습과 방법이 같지만 목적(정보를 수집하기 위함)이 다르다

나머지 연산자를 사용하면 위에서 명시한 조건을 갖출 필요가 1도 없다.
변수에 할당되는 값이 객체에 남아있는 키-값 쌍을 모은 객체이기 때문에 
오히려 *일치하지 않아야 한다.*

```javascript
const landscape = {
	photographer: 'Nathan',
	equipment: 'Canon',
	format: 'digital',
};

const {
	photographer,
	...additional //같은 행에서 두 개의 변수를 할당할 수도 있음
} = landscape;

additional;
// { equipmet: 'Canon', format: 'digital' } 객체에서 꺼낸 photographer 제외
```

변수 이름으로 원래의 키와 다른 이름을 지정할 수 있다
```javascript
const landscae = {
	src: '/landscape-nm.jpg',
};
const { src: url } = landsscape;

src; //ReferenceError: src is not defined

url; //'/landscape-nm.jpg'
```
배열에도 해체 할당을 사용할 수 있다.
단 배열에 담긴 순서대로 할당해야 한다. Why? 배열은 키가 없기 때문에.
언제 사용하면 좋을까?
배열에 값이 쌍으로 담겨 있어서 담긴 값의 순서가 정보의 일부인 경우 유용!
```javascript
const landscape = {
	location: [32.7122222, -103.1405556]
};
/*
const { location } = landscape; // 먼저 객체에서 location 배열을 꺼내고
const [latitude, longitude] = location; // 각각 할당
*/

const { locatioon: [latitude, longigtude] } = landscape; // 한번에 가능

latitude; // 32.7122222
longitude; //-103.1405556
```

해체 할당을 적용하여 코드 작성하기
```javascript
function displayPhoto(photo){
	const {
		title,
		photographer = 'Anonymous",
		src: url,
		...other,
	} = photo;
	const additional = Object.keys(other).map(key => '${key}:${other[key]}`);
	return(`<tag~~~/>`);
```

해체 할당의 가장 큰 장점은 해체 할당을 함수의 매개 변수에 적용할 수 있다는 점이다. 그로인해 변수를 선언하지 않아도 마치 정보를 함수 몸체에서 할당한 것처럼 작동한다.
* 해체 할당은 let으로 변수를 할당하기 때문에 해당 변수를 재할당할 수 있다.,
```javascript
function displayPhoto({
	title,
	photographer = 'Anonymous',
	location: [latitude, longitude],
	src: url,
	...other
}) {
	 const additional = Object.keys(other).map(key => `${key}:${other[key] }` );
	return (`~~`);
}
```

해체 할당을 사용하면 변수 할당에 관한 문제를 해결할 뿐만 아니라 매개변수로 객체를 전달하기 때문에 키-값의 순서를 염려하지 않아도 된다. 또한 다른 키-값 쌍을 꺼내야 하는 경우에도 해체 할당에 새로운 변수를 추가하는 것만으로도 충분하다.
단 해체 할당의 유일한 단점은 키-값 쌍 또는 클래스의 인스턴스인 객체에서만 사용할 수 있다는 점이다.
* 맵에는 해체 할당을 사용할 수 없다. 

### Tip 30. 키-값 할당을 단순화하라

<details>
<summary>해체할당 개념 다시 잡기</summary>
<div markdown="1">       

구조분해 할당`destructuring assignment` 이라고도 한다. 말 그대로 내용물을 해체하여 할당하는 것. <br>
해체할 내용물이 있는 배열과 객체에 사용되는 개념.

</div>
</details>

- 변수와 이름이 같은 키를 갖는 키-값 쌍을 객체에 추가하려면 **변수 이름**만 적으면 된다.
```javascript
const landscape = {
	title:'Landscap',
	photographer: 'Nathan',
	location: [32.712, -103.140],
};
const region = {
	city: 'Hobbs',
	country: 'Lea',
	state: {
		name: 'New Mexico',
		abbreviation: 'NM',
	},
};
function getCityAndState({ location }){
	const { city, state } = determinCityAndState(location); //위경도 좌표를 이용해서 지역정보를 조회할 수 있는 헬퍼 함수 존재를 가정.
	return {
		city,
		state: state.obbreviation, //기존방식 혼용가능
	};
};
// city: 'Hobbs', state: 'NM'
```
- 객체 펼침 연산자와 일반적인 키-값 할당을 함께 사용해서 한 가지 정보를 제거하고 **나머지는 그대로 유지**할 수 있다.
```javascript
function setRegion({ location, ...details }){ //location 이외의 모든 것을 변수 details에 할당
	const { city, state } = determineCiAndState(location);
	return {
		city,
		state: state.abbreviation,
		...details, 
	};
};
```

### Tip 31. 나머지 매개변수로 여러 개의 인수를 변수로 전달하라

> ☝ 가정1. 사용자가 사진에 태그를 입력할 수 있게 하되 태그의 길이를 일정한 수준으로 제한하고자 함.

```javascript
//간단한 유효성 검사 함수
function validateCharacterCount(max, items){
	return items.every(iem => item.length < max); 
}
validateCharacterCount(10, ['Hobbs', 'Eagles']);
//true
```
<details>
<summary>➕ every() 배열메서드</summary>
<div markdown="1">       
	.filter()와 마찬가지로 참 또는 거짓인 값을 반환하는 콜백 함수를 인수로 전달한다. <br>
	모든 항목을 대상으로 콜백 함수를 실행해 모든 항목에서 참 값이 반환되면 결과적으로 true를 반환한다.
</div>
</details>

해당 함수를 실행할 때 두번째 매개변수인 items를 무조건 배열로 전달해야 정상적으로 출력이 된다. 이전에는 자바스크립트에 내장된 arguments 객체를 이용해 문제를 해결했다.
<details>
<summary>➕ arguments</summary>
<div markdown="1">       
	함수에 전달된 모든 인수를 담은 배열과 유사한 컬렉션
</div>
</details>

하지만 아쉽게도 arguments는 객체이므로 Array 객체에 정적으로 메서드를 호출해서 배열로 변환해야 한다.
```javascript
//이전의 해결방법
function getArguments(){
	return arguments;
};
getArguments('Bloomsday', 'June 16');
//{ '0': 'Bloomsday', '1': 'June 16' }
function validateCharacterCount(max){
	const items = Array.prototype.slice.call(arguments, 1)
	return items.every(iem => item.length < max); 
};
```

하지만 이제 인수가 배열인 경우가 달라진다. 

인수를 배열로 전환하기 때문에 배열 그대로가 아닌 인수 목록으로 변환해서 전달해야한다.

```javascript
// 펼침 연산자를 사용
validateCharacterCount(10, 'wvoguie');
validateCharacterCount(10, ...tags);
```

위의 방법은 arguments 객체를 다루는 문법이 난해하기 때문에 사용하기 어렵다.

⚠ 해당 코드를 보는 다른 개발자가 arguments 객체에 대해 모를 경우 함수 매개변수로 인수 목록을 받는다는 사실조차 알기 어려울 수 있다. 그로 인해 함수의 가독성이 저하되고 함수를 파악하는데 시간이 걸리게 된다. 지양해야할 점!

이 문제를 해결하기 위해 나머지 매개변수를 사용할 수 있다.

나머지 매개변수를 이용하면 인수 목록을 전달해 변수에 담을 수 있다!

```javascript
function getArguments(...arg){ //나머지 매개변수로 전달하고 할당할 변수 이름 작성
	return args; //이후 전달되는 매개벼눗는 이 변수에 배열로 담긴다.
};
getArguments('Bloomsday', 'June 16');
// ['Bloomsday', 'June 16']

//굳이 getArguments 함수를 사용하지 않고 나머지 매개변수를 활용하여 함수 작성
function validateCharacterCount(max, ...items){
	return items.every(iem => item.length < max); 
};
```

나머지 매개변수를 활용하여 코드 작성이 간단해졌으며 예측가능성이 높아졌다. 또한 기존에 작성했던 함수와 동일한 방법으로 인수 목록을 전달하거나 배열을 펼쳐 넣어 함수를 호출할 수 있다. 그러므로 arguments 객체를 사용했던 **이전의 코드와 전혀 차이가 없다.**

- 그외에도 나머지 매개변수를 사용하는 이유!
1. 인수를 배열로 다루는 것을 다른 개발자들에게 알려야 하는 경우 적합하다.
2. 나머지 매개변수는 코드 디버깅에 좋은 방법이 될 수 있다.
3. 나머지 인수는 함수 간에 속성을 전달하면서 해당 속성을 조작할 필요가 없을 때 사용하면 좋다. 
	> 상황: 변경 사항을 저장할 때 다른 함수로 정보를 갱신하면서 동시에 창을 닫아야 하는 경우
	```javascript
	function applyChanges(...args){
		updateAccount(...args);
		closeModat();
	}
	```

‼ 주의할점. 나머지 매개변수가 매개변수만을 위한 것은 아니다!

=> 객체의 키-값 쌍이나 배열에 담긴 나머지 값을 가져올 때도 사용 가능.

펼침 연산자와 마찬가지로 부수 효과를 제거하면서 일반적인 배열 메서드를 다시 만들 수 있다.

```javascript
const queue = ['stop', 'collaborate', 'listen'];
const [first, ...remaining] = queue;
first; //'stop'
remaining; //['collaborate', 'listen']
//원본배열 그대로 유지
```

> But 나머지 매개변수를 사용할 경우 언제나 **마지막 인수**에 사용해야 한다.
> 반드시 함수의 마지막 매개변수여야 하며 해체 할당의 경우에도 마지막 값이어야 한다.
> 그러므로 위의 함수를 역전한 마지막 인수를 반환하는 메서드는 나머지 매개변수로 불가능하다.

 하지만 여전히 유용하게 사용할 수 있는 기술이다. ❤
