# 04. 클로저
<hr>
<hr>

## 01. 클로저의 의미 및 원리 이해
> 클로저는 여러 함수형 프로그래밍 언어에서 등장하는 보편적인 특성이다.

### 클로저의 다양한 정의

```text
- 자신을 내포하는 함수의 컨텍스트에 접근할 수 있는 함수
- 함수가 특정 스코프에 저븐할 수 있도록 의도적으로 그 스코프에서 정의하는 것
- 함수를 선언할 때 만들어지는 유효범위가 사라진 후에도 호출할 수 있는 함수
- 이미 생명 주기상 끝난 외부 함수의 변수를 참조하는 함수
- 자유변수가 있는 함수와 자유변수를 알 수 있는 환경의 결합
- 로컬 변수를 참조하고 있는 함수 내의 함수
- 자신이 생성될 때의 스코프에서 알 수 있었던 변수들 중 언젠가 자신이 실행될 때 사용할 변수들만을 기억하여 유지시키는 함수
```

### MDN 정의
> A closure is the combination of a function and the lexical environment within which that function was delcared.<br>
> (클로저는 함수와 그 함수가 선언될 당시의 lexical environment의 상호관계에 따른 현상이다)<br>

- 선언될 당시의 lexcial environment === outerEnvironmentReference
- 내부함수에서 외부변수를 참조하는 경우에서만 combination 즉 '선언될 당시의 LexicalEnvironment와의 상호관계가 의미가 있을 것

> 클로저란 어떤 함수에서 선언한 변수를 참조하는 `내부함수`에서만 발생하는 현상

```javascript
var outer1 = function () {
	var a = 1; // 외부함수의 변수
	var inner = function () {
		console.log(++a); // 내부함수가 외부변수를 사용
	};
	inner();
};
outer();
```
outer함수의 실행컨텍스트가 종료되면 LexicalEnvironment에 저장된 식별자들(a, inner)에 대한 참조를 지운다. 그러면 각 주소에 저장되어 있던 값들은 자신을 참조하는 변수가 하나도 없게 되므로 가비지 컬렉터의 수집 대상이 될 것이다.

```javascript
var outer2 = function () {
	var a = 1;
	var inner = function () {
		return ++a;
	};
	return inner(); // 실행 결과를 리턴
};
var outer22 = outer();
console.log(outer2); // 2
console.log(outer2); // 2
console.log(outer2()); // error
```
outer1, outer2 둘 다 외부함수의 실행 컨텍스트가 종료되기 이전에 inner 함수의 실행 컨텍스트가 종료되어 있으며, 이후 별도로 inner 함수를 호출할 수 없다.

<img src="https://i.imgur.com/xfAmb2E.jpg">

```javascript
var outer = function () {
	var a = 1;
	var inner = function () {
		return ++a;
	};
	return inner; // 실행결과가 아닌 inner 함수 자체를 반환
};
var outer2 = outer(); // outer 함수 실행 컨텍스트 종료 > outer2가 inner함수를 참조
console.log(outer2()); // 2
console.log(outer2()); // 3
console.log(outer2); // inner f...
```

어떤 값을 참조하는 변수가 하나라도 있다면 GC는 그 값을 수집대상을 삼지 않는다.
- 외부 함수인 outer의 실해이 종료되더라도 내부 함수인 inner 함수는 언젠가 outer2를 실행함으로써 호출될 가능성이 열린 것.
- outer2에 의해 inner 함수가 호출될 수 있어서 그 함수가 호출하는 a변수 또한 사라지지 않는 것.

<img src="https://i.imgur.com/kjLLigs.jpg">

### 이를 바탕으로 재정의
> 클로저란 어떤 함수 A에서 선언한 변수 a를 참조하는 내부함수 B를 외부로 전달할 경우 A의 실행 컨텍스트가 종료된 이후에도 변수 a가 사라지지 않는 현상

```text
- 함수를 선언할 때 만들어지는 유효범위가 사라진 후에도 호출할 수 있는 함수
- 이미 생명 주기가 끝난 외부 함수의 변수를 참조하는 함수
- 자시니 생성될 때의 스코프에서 알 수 있었던 변수들 중 언젠가 자신이 실행될 때 사용할 변수드란을 기억하여 유지시키는 함수

모두 클로저를 함수로 정의하고 있지만 사실 클로저는 함수보다 클로저 현상에 의해 메모리에 남겨진 변수의 집합이라고 보는 것이 더 맞다
``` 

### 외부로 전달하는 것이 꼭 return 만을 말하는게 아니다

- return 없이도 클로저가 발생하는 경우
```javascript
// setInterval/setTimeout
(function () {
	var a = 0;
	var intervalId = null;
	var inner = function () {
		if(++a >= 10){
			clearInterval(intervalId);
		}
		console.log(a);
	};
	intervalId = setInterval(inner, 1000);
})();
// 별도의 외부객체인 window의 메서드(setTimeout or setInterval) 에 전달할 콜백 함수 내부에서 지역변수를 참조

// eventListener
(function () {
	var count = 0;
	var button = document.createElement('button');
	button.innerText = 'click';
	button.addEventListener('click', function (){
		console.log(++count, 'times clicked');
	});
	document.body.appendChild(button);
})();
// 별도의 외부객체인 DOM의 메서드(addEventListener)에 등록할 handler함수 내부에서 지역변수를 참조
```
지역변수를 참조하는 내부 함수를 외부에 전달했기 때문에 클로저이다.

<hr>
<hr>

## 02. 클로저와 메모리 관리
클로저는 의도적으로 GC가 특정 변수를 수거하지 못하게 만든 것이므로 당연히 따로 메모리 관리를 해줘야한다.
그 필요성이 사라진 시점에서 식별자에 참조형이 아닌 기본형 데이터(null or undefined)를 할당하여 참조 카운트를 0으로 만들어주면 알아서 GC가 수거해갈 것이다.
```javascript
// return 에 의한 크로저의 메모리 해제
var outeer = (function () {
	var a = 1;
	var inner = function () {
		return ++a;
	};
	return inner;
})();
console.log(outer());
console.log(outer());
outer = null; // outer 식별자의 inner함수 참조를 끊음

// setInterval에 의한 클로저의 메모리 해제
(function () {
	var a = 0;
	var intervalId = null;
	var inner = function () {
		if(++a >= 10){
			clearInterval(intervalId);
			inner = null; // inner 식별자의 함수 참조를 끊음
		}
		console.log(a);
	};
	intervalId = setInterval(inner, 1000);
})();

// eventListener에 의한 클로저의 메모리 해제
(function () {
	var count = 0;
	var button = document.createElement('button');
	button.innerText = 'click';
	var clickHandler = function() {
		console.log(++count, 'times clicked');
		if(count >= 10){
			button.removeEventListener('click', cilckHandler);
			clickHandler = null; // clickHandler 식별자의 함수 참조를 끊음
		}
	};
	button.addEventListener('click', clickHandler);
	document.body.appendChild(button);
})();
```

<hr>
<hr>

## 03. 클로저 활용 사례

<hr>

### 5-3-1 콜백 함수 내부에서 외부 데이터를 사용하고자 할 때

<hr>

### 5-3-2 접근 권한 제어(정보 은닉)

<hr>

### 5-3-3 부분 적용 함수

<hr>

### 5-3-4 커링 함수


<hr>
<hr>

## 04. 정리
`클로저란`<br>
어떤 함수에서 선언한 변수를 참조하는 내부함수를 외부로 전달할 경우, 함수의 실행 컨텍스트가 종료된 후에도 해당 변수가 사라지지 않는 현상<br>
<small>
내부함수를 외부로 전달하는 방법에는 함수를 return하는 경우뿐 아니라 콜백으로 전달하는 경우도 포함된다.<br>
</small>

`클로저의 메모리관리`<br>
클로저는 그 본질이 메모리를 계속 차지하는 개념이므로 더는 사용하지 않게 된 클로저에 대해서는 메모리를 차지하지 않도록 관리해줄 필요가 있다.<br>