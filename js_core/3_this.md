# 03. this

## 01. 상황에 따라 달라지는 this

this는 실행 컨텍스트가 생성될 때 함께 결정된다. 즉, **함수를 호출할 때** 결정된다.
> 함수를 어떻게 호출하느냐에 따라 값이 달라진다.

### 3-1-1 전역 공간에서의 this

> `전역공간`에서의 this는 `전역객체`를 가리킨다.

```javascript
console.log(this); 
console.log(window);
console.log(this===window); //true
```

* 브라우저 환경에서 전역객체는 window, Node.js 환경에서는 global이다.

#### 3-1-1-1 전역객체에 대해 더 알아보자

- 전역변수를 선언하면 자바스크립트 엔진은 이를 전역객체의 프로퍼티로도 할당한다.

```javascript
var a = 1;
console.log(a); //1
console.log(window.a); //1
console.log(this.a); //1
```

- 대체 왜 이런 현상이?
```text
전역 공간에서 window.a 와 this.a 가 같은 것은 맞다. 
하지만 왜, 어떤 매커니즘으로 1이 출력되는 것일까??
그 이유는 자바스크립트의 모든 변수는 사실 `특정 객체`의 프로퍼티이기 때문이다.
여기서 특정 객체는 바로 실행 컨텍스트의 `LexicalEnvironment`이다.
	1. 실행 컨텍스트는 변수를 수집하여 L.E의 프로퍼티로 저장.
	2. 어떤 변수를 호출하면 L.E를 조회해서 일치하는 프로퍼티가 있을 경우 그 값을 반환.
전역 컨텍스트의 경우 L.E는 전역객체를 그대로 참조한다.
```

- 이런식이면 왜 a를 직접 호출해도 1을 반환하느냐는 의문이 새로 생긴다.

변수 a에 접근하고자 할 경우
1. 스코프 체인에서 a를 검색
2. 가장 마지막에 도달하는 전역 스코프의 L.E(즉 전역객체)에서 해당 프로퍼티 a를 발견, 그 값을 반환.

a를 호출할 때 앞에 window.이 생략되어 있다고 생각해도 무방하다.

- 전역공간에서 var를 선언하는 대신 window의 프로퍼티를 직접 할당한다면 같을까?

> 대부분의 경우는 맞지만 다른 경우도 존재한다.

```javascript
var a = 1;
window.b = 2;
console.log(a, window.a, this.a); // 1 1 1
console.log(b, window.b, this.b); // 2 2 2

var c1 = 1;
var c2 = 2;
delete window.c1; //false
delete c2; //false
console.log(c1, window.c1, this.c1); // 1 1 1
console.log(c2, window.c2, this.c2); // 2 2 2

window.d1 = 3;
window.d2 = 4;
delete window.d1 //true
delete d2; //true
console.log(d1, window.d1, this.d1); //Uncaught ReferenceError: d is not defined at..
console.log(d2, window.d2, this.d2); //Uncaught ReferenceError: d is not defined at..
```

전역변수로 선언할 경우: 전역객체 프로퍼티 할당 후 해당 프로퍼티 configurable 속성을 false로 만듦.
전역객체의 프로퍼티로 할당할 경우: 말 그대로 전역객체 프로퍼티 할당 까지만.
이 때문에 전자는 삭제가 되지 않고 후자는 삭제가 되는 것.

> 이처럼 var로 선언한 전역변수와 전역객체의 프로퍼티는 `호이스팅 여부`와 `configurable 여부`에서 차이를 보인다.


### 3-1-2 메서드로서 호출할 때 그 메서드 내부에서의 this
### 3-1-3 함수로서 호출할 때 그 함수 내부에서의 this
### 3-1-4 콜백 함수 호출 시 그 함수 내부에서의 this
### 3-1-5 생성자 함수 내부에서의 this

## 02. 명시적으로 this를 바인딩하는 방법

### 3-2-1 call 메서드
### 3-2-2 apply 메서드
### 3-2-3 call / apply 메서드의 활용
### 3-2-4 bind 메서드
### 3-2-5 화살표 함수의 예외사항
### 3-2-6 별도의 인자로 this를 받는 경우(콜백 함수 내에서의 this)

## 03. 정리

- 명시적 this 바인딩이 없는 한 늘 성립하는 규칙
> 전역공간에서의 this는 `전역객체`(브라우저에서는 window, Node.js에서는 global)를 참조한다.<br>
> 어떤 함수를 `메서드`로서 호출한 경우 this는 `메서드 호출 주체`(메서드명 앞의 객체)를 참조한다.<br>
> 어떤 함수를 `함수`로서 호출한 경우 this는 `전역객체`를 참조한다. 메서드의 내부함수에서도 같다.<br>
> 콜백 함수 내부에서의 this는 해당 콜백함수의 제어권을 넘겨받은 함수가 정의한 바에 따르며, 정의하지 않는 경우에는 전역객체를 참조한다.<br>
> `생성자 함수`에서의 this는 생성될 `인스턴스`를 참조한다.<br>

- 명시적 this 바인딩
> call, apply 메서드는 this를 명시적으로 지정하면서 함수 또는 메서드를 호출한다.<br>
> bind 메서드는 this 및 함수에 넘길 인수를 일부 지정해서 새로운 함수를 만든다.<br>
> 요소를 순회하면서 콜백 함수를 반복 호출하는 내용의 일부 메서드는 별도의 인자로 this를 받기도 한다.<br>
