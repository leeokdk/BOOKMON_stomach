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


### Tip 31. 나머지 매개변수로 여러 개의 인수를 변수로 전달하라
