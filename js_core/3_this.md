# 03. this
<hr>
<hr>

## 01. 상황에 따라 달라지는 this

this는 실행 컨텍스트가 생성될 때 함께 결정된다. 즉, **함수를 호출할 때** 결정된다.
> 함수를 어떻게 호출하느냐에 따라 값이 달라진다.

<hr>

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

<hr>

### 3-1-2 메서드로서 호출할 때 그 메서드 내부에서의 this

#### 함수 vs 메서드

- 함수를 호출하는 두 가지 방법, 1. 함수로서 호출하는 경우 2. 메서드로서 호출하는 경우
- 이 둘을 구분하는 것은 ₩독립성₩
- 함수는 그 자체로 독립적인 기능을 수행하는 반면 메서드는 자신을 호출한 대상 객체에 관한 동작을 수행
- 자바스크립트는 각각 this에 다른 값을 부여하는 것으로 이 두 가지를 구현했다.

> 어떻게 할당하는지가 아닌 어떻게 `호출`하는지에 따라 함수인지 메서드인지 나뉜다.

```javascript
var func = function (x) {
	console.log(this x);
};

//변수에 담아 호출한 경우
func(1); // Window { ... } 1

//객체의 프로퍼티에 할당해서 호출한 경우
var obj = {
	method: func
};
obj.method(2); // { method: f } 2

//모두 첫번째 줄에서 선언한 func를 참조하고 있지만 this가 달라졌다
```

- 두 가지의 간단한 구분법: 점 표기법, 대괄호 표기법
```.javascript
var obj = {
	method: function (x) { console.log(this, x); }
};
obj.method(1); // 점표기법
obj['method'](2); // 대괄호표기법
```
점/대괄호가 있는 경우(함수를 호출할 때 함수 이름 앞에 객체가 명시되어 있는 경우) 메서드로 호출
그렇지 않은 경우 함수로 호출

#### 메서드 내부에서의 this

> 함수명 앞에 명시되어 있는 객체가 바로 this
```javascript
var obj = {
	methodA: function () { console.log(this); },
	inner: {
		methodB: function () { console.log(this); }
	}
};

obj.methodA(); // { methodA: f, inner: {...} } (===obj)
obj['methodA'](); // { methodA: f, inner: {...} } (===obj)

obj.inner.methodB(); // { methodB: f } (===obj.inner)
obj.inner['methodB'](); // { methodB: f } (===obj.inner)
obj['inner'].methodB(); // { methodB: f } (===obj.inner)
obj['inner']['methodB'](); // { methodB: f } (===obj.inner)
```

<hr>

### 3-1-3 함수로서 호출할 때 그 함수 내부에서의 this

#### 함수 내부에서의 this

함수로서 호출하는 것은 호출 주체(객체지향 언어에서의 객체)를 명시하지 않고 개발자가 코드에 직접 관여해서 실행한 것이기 때문에 호출 주체의 정보를 알 수 없다. this가 지정되지 않은 경우 this는 전역객체를 바라본다.

* 이것은 명백한 설계상의 오류라고 지적함..

#### 메서드의 내부함수에서의 this

```javascript
var obj1 = {
	outer: function () {
		console.log(this); 
		var innerFunc = function () {
			console.log(this);
		}
		innerFunc(); //Window. 함수로서 호출
		
		var obj2 = {
			innerMethod: innerFunc
		};
		obj2.innerMethod(); //obj2. 메서드로서 호출
	}
};
obj1.outer(); //obj1
```

this 바인딩에 관해서는 함수를 실행하는 당시의 주변 환경(메서드 내부인지, 함수 내부인지 등)은 중요하지 않고, 오직 해당 함수를 호출하는 구문 앞에 점 또는 대괄호 표기가 있는지 없는지가 관건이다.

#### 메서드의 내부 함수에서의 this를 우회하는 방법

> 상위 스코프의 this를 변수에 저장한다. (변하지 않게)

```javascript
var obj = {
	outer: function () {
		console.log(this); // { outer: f }
		var innerFunc1 = function () {
			console.log(this); // Window..
		}
		innerFunc1(); 
		
		var self = this;
		var innerFunc2 = function () {
			console.log(self); //{ outer: f }
		};
		innerFunc2();
	}
};
obj.outer();
```

#### this를 바인딩하지 않는 함수(단 화살표 함수는 ES6 이상)

함수 내부에서 this가 전역객체를 바라보는 문제를 보완하고자 this를 바인딩하지 않는 화살표 함수를 새로 도입했다. 화살표 함수는 실행 컨텍스트를 생성할 때 this 바인딩 과정 자체가 빠지게 되어, 상위 스코프의 this를 그대로 활용할 수 있다.

```javascript
var obj = {
	outer: function () {
		console.log(this); // { outer: f }
		var innerFunc = () => {
			console.log(this); // { outer: f } 전역아님!
		};
	}
};
obj.outer();
```

그 밖에 명시적으로 this를 지정하는 방법(call, apply)이 있다. 3-2에서 계쏙.

<hr>

### 3-1-4 콜백 함수 호출 시 그 함수 내부에서의 this

사전 개념을 위한 간단한 정의
- 콜백함수: 함수 가의 제어권을 다른 함수(또는 메서드) 나에게 넘겨주는 경우, 함수 가
- 함수 가는 함수 나의 내부로직에 따라 실행되며, this 역시 함수 나 내부로직에서 정한 규칙을 따름
- 콜백 함수도 함수라서 기본적으로 전역객체를 참조
- 단 제어권을 받은 함수에서 콜백 함수에 별도로 this가 될 대상 지정 가능

```javascript
setTimeout(function () { console.og(this); }, 300); 
// 300초마다 전역객체 출력

[1,2,3,4,5].forEach( function (x) {
	console.log(this, x);
});
// 전역객체와 함께 각 요소 출력

document.body.innerHTML += '<butto id="a">클릭</button>';
document.body.querySelector('#a').addEventListener('click', function (e) {
	console.log(this, e);
});
// 버튼 누르면 지정한 엘리먼트와 이벤트정보 출력 
```

setTimeout 함수와 forEach 메서드는 그 내부에서 콜백 함수를 호출할 때 대상이 될 this를 지정하지 않았다. 그래서 전역객체를 참조하였다.

하지만 addEventListener 메서드는 콜백 함수를 호출할 때 자신의 this를 상속하도록 정의되어 있다. 곧 메서드명의 앞부분이 this가 되는 것이다.

즉 기본적으로는 전역객체지만 제어하는 함수(메서드)에 의해 바뀔 수 있다.

<hr>

### 3-1-5 생성자 함수 내부에서의 this

생성자 함수는 어떤 공통된 성질을 지니는 객체들을 생성하는데 사용하는 함수이다.

객체지향 언어에서는 생성자를 class, 클래스를 통해 만든 객체를 instance라고 한다.
즉 생성자는 구체적인 인스턴스를 만들기 위한 일종의 틀이며 여기에 구체적인 인스턴스의 개성을 더해 개별 인스턴스를 만들 수 있다.

자바스크립트는 함수에 생성자로서의 역할을 함께 부여했다.
1. 생성자 함수 호출(new 명령어와 함께 함수 호출)
2. 생성자의 prototype 프로퍼티를 참조하는 __proto__라는 프로퍼티가 있는 객체(인스턴스) 생성
3. 준비된 공통 속성 및 개성을 해당 객체(this)에 부여

```javascript
var Cat = function (name, age) {
	this.bark = 'meow';
	this.name = name;
	this.age = age;
};
var choco = new Cat('Choco',7);
var nabi = new Cat('Nabi',5);
console.log(choco, nabi);

/* result
Cat { bark: 'meow', name: 'Choco', age: 7 }
Cat { bark: 'meow', name: 'Nabi', age: 5 }
*/
```

> 생성자 함수 내부에서의 this는 각각의 인스턴스(choco, nabi)를 가리킴

<hr>
<hr>

## 02. 명시적으로 this를 바인딩하는 방법

<hr>

### 3-2-1 call 메서드

- 메서드의 호출 주체인 함수를 즉시 실행하도록 하는 명령
- 첫번째 인자를 this로 바인딩하고, 이후의 인자들을 호출할 함수의 매개변수로 설정.

```javascript
// 예제1
var func = function (a, b, c) {
    console.log(this, a, b, c);
};
func(1,2,3); // Window{ ... } 1 2 3 (전역객체를 참조)
func.call({x:1},4,5,6); // { x:1 } 4 5 6 (명시된 {x:1}을 참조)

// 예제2
var obj = {
    a:1,
    method: function(x,y){
        console.log(this.a, x,y);
    }
};
obj.method(2,3); // 1 2 3 (메서드명 앞에 있는 객체)
obj.method.call({a:4},5,6); // 4 5 6 (a 값을 4로 바꿔줌)
```

<hr>

### 3-2-2 apply 메서드

- call 메서드와 매우 흡사.
- 두번째 인자를 배열로 받아 그 배열의 요소들을 호출할 함수의 매개변수로 지정

```javascript
var func = function(a, b, c){
    console.log(this, a,b,b);
};
func.apply({x:1},4,5,6); // {x:1} 4 5 6

var obj = {
    a: 1,
    method: function (x, y){
        console.log(this.a, x, y);
    }
};
obj.mehtod.apply({a:4},[5,6]); // 4 5 6
```

<hr>

### 3-2-3 call / apply 메서드의 활용

#### 유사배열객체array-like object에 배열 메서드를 적용

#### 생성자 내부에서 다른 생성자를 호출

#### 여러 인수를 묶어 하나의 배열로 전달하고 싶을때 - apply 활용

<hr>

### 3-2-4 bind 메서드

<hr>

### 3-2-5 화살표 함수의 예외사항

<hr>

### 3-2-6 별도의 인자로 this를 받는 경우(콜백 함수 내에서의 this)



<hr>
<hr>

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
