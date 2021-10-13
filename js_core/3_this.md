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

obj.methodA(); // {inner: {…}, methodA: ƒ} (===obj)
obj['methodA'](); // {inner: {…}, methodA: ƒ} (===obj)

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
		console.log(this); // {outer: ƒ} (===obj1) 
		var innerFunc = function () {
			console.log(this);
		}
		innerFunc(); //Window {..} 함수로서 호출
		
		var obj2 = {
			innerMethod: innerFunc
		};
		obj2.innerMethod(); //{innerMethod: ƒ} (===obj2) 메서드로서 호출
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
			console.log(self); // { outer: f }
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
			console.log(this); 
		};
		innerFunc(); // { outer: f } 전역아님!
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

- call / apply 메서드 
  - 장점: 명시적으로 별도의 this를 바인딩하면서 함수 또는 메서드를 실행할 수 있다.
  - 단점: this를 예측하기 어렵게 만들어 코드 해석을 방해한다.

#### 유사배열객체array-like object에 배열 메서드를 적용
> `유사배열객체`<br>
> 숫자로 key를 갖고 있고 length를 프로퍼티로 갖고 있는 객체 <br>
> ex: arguments 객체, Node 선택자로 선택한 결과인 NodeList 등

- 배열과 구조가 유사하여 배열처럼 사용이 가능하다.
- 하지만 Array의 인스턴스가 아니므로 관련 메서드는 사용할 수 없다.
- 하지만! call/apply를 이용하면 사용할 수 있다!

```javascript
var obj = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3
} //직접 만든 유사배열객체

Array.prototype.push.call(obj, 'd'); 
//배열 메서드를 사용하기 위한 Array.prototype
//  배열 메서드 push('d'추가)
//      call 메서드를 통해 obj에 적용
// {0:'a',1:'b',2:'c',3:'d',length:4}

var arr = Array.prototype.slice.call(obj);
//배열 메서드를 사용하기 위한 Array.prototype
//  배열 메서드 slice(얕은 복사를 통해 배열 반환. 객체를 배열로 바꾼것)
//      call 메서드를 통해 obj에 적용
// ['a','b','c','d']

//arguments 객체
function a () {
    var argv = Array.prototype.slice.call(arguments); //유사배열객체 > 배열
    argv.forEach(function (arg) {
        console.log(arg);
    });
}
a(1,2,3);

//NodeList
document.body.innerHTML = '<div>a</div><div>b</div><div>c</div>';
var nodeList = document.querySelectorAll('div'); //유사배열객체
var nodeArr = Array.prototype.slice.call(nodeList); //배열
nodeArr.forEach(function (node) {
    console.log(node);
});
```

- 문자열도 index와 legnth 프로퍼티를 갖고 있기 때문에 위처럼 구사가 가능하다.
- 하지만 length가 읽기 전용이기 때문에 원본의 변형 메서드(push, pop, shift, unshift, splice)등은 에러가 난다.
- concat처럼 대상이 반드시 배열이어야하는 경우 에러는 나지 않지만 결과값이 이상해진다.

- ES6에서는 유사배열객체, 순회 가능한 모든 종류의 데이터 타입을 배열로 전환하는 `Array.from` 메서드를 새로 도입하였다.

#### 생성자 내부에서 다른 생성자를 호출

- 공통된 내용의 생성자를 만들고 call/apply로 호출하여 사용 가능

```javascript
//공통 함수
function Person(name, gender){
    this.name = name;
    this.gender = gender;
}
function Student(name, gender, school){
    Person.call(this, name, gender); //call로 구현
    this.school = school;
}
function Employee(name, gender, company){
    Person.apply(this,[name,gender]); //apply로 구현
    this.company = company;
}
//결과는 동일
```

#### 여러 인수를 묶어 하나의 배열로 전달하고 싶을때 - apply 활용

> apply로 인수배열을 전달 및 배열 메서드 활용을 통해 더 쉽게 코드 구현

```javascript
var numbers = [10, 20, 3, 16, 40]; //인수배열
//max min 구하기

// (1)
var max = min = numbers[0];
numbers.forEach(function(number){
    if(number > max){
        max = number;
    }
    if(number < min){
        min = number;
    }
});

// (2) apply 이용
var max = Math.max.apply(null, numbers);
var min = Math.min.apply(null, numbers);

// (3) ES6 펼치기 연산자 이용
var max = Math.max(...numbers);
var min = Math.min(...numbers);
```

<hr>

### 3-2-4 bind 메서드

- ES5에서 추가된 기능
- call과 비슷하지만 `즉시 호출하지는 않고` 넘겨받은 this 및 인수들을 바탕으로 `새로운 함수를 반환하기만 하는` 메서드
- 사용하는 목적은 두 가지
  - 함수에 this를 미리 지정하는 것
  - 부분 적용 함수를 구현하는 것

```javascript
var func = function(a,b,c,d){
    console.log(this,a,b,c,d);
};
func(1,2,3,4); // 여기서 this는 window

var bindFunc1 = func.bind({x:1}); //this를 미리 지정
bindFunc1(5,6,7,8); // 여기서 this는 지정값 {x:1}

var bindFunc2 = func.bind({x:1},4,5); //부분 함수 구현
bindFunc2(6,7); // 여기서 this와 a,b는 지정값 {x:1} 4 5
bindFunc2(8,9); // 마찬가지 
```

#### name 프로퍼티

- bind 메서드를 적용해 새로 만든 함수는 name 프로퍼티에 bound 접두어가 붙는다.
- 코드 추적이 용이.

```javascript
...
console.log(func.name); // func
console.log(bindFunc.name); // bound func
```

#### 상위 컨텍스트의 this를 내부함수나 콜백 함수에 전달하기

- 3-1-3에서 내부함수의 this를 사용할때 self를 이용한 우회법이 있었다.
- call/apply 또는 bind 메서드를 이용하면 더 깔끔하다.
```javascript
var obj = {
	outer: function () {
		console.log(this); // { outer: f }
		var innerFunc1 = function () {
			console.log(this); 
		}
		innerFunc1(); // Window..
		//call 방식
		innerFunc1.call(this); // { outer: f }
        //bind 방식
        var innerFunc2 = function () {
			console.log(this); 
		}.bind(this);
		innerFunc2(); // { outer: f }
	}
};
obj.outer();
```

- bind 메서드를 사용하면 콜백함수 내에서의 this에 관여하는 함수와 메서드에 대해서 this 값을 바꿀 수 있다.

```javascript
var obj = {
    logThis: function () {
        console.log(this);
    },
    logThisLater1: function (){
        setTimeout(this.logThis, 500);
    },
    logThisLater2: function (){
        setTimeout(this.logThis.bind(this), 1000);
    }
};
obj.logThisLater1(); // window ..
obj.logThisLater2(); // {logThis:f ...}
```

<hr>

### 3-2-5 화살표 함수의 예외사항

- ES6에서 도입된 화살표 함수는 실행 컨텍스트 생성 시 this를 바인딩하지 않는다.
- 즉 화살표 함수 내부에는 this가 아예 없으며, 접근하고자 하면 스코프체인상 가장 가까운 this에 접근한다.
- 우회하거나 메서드를 사용할 필요없이 아주 간편!

```javascript
var obj = {
	outer: function () {
		console.log(this); // obj { outer: f }
		var innerFunc1 = () => {
			console.log(this); 
		}
		innerFunc1(); // obj { outer: f }
	}
};
obj.outer();
```

<hr>

### 3-2-6 별도의 인자로 this를 받는 경우(콜백 함수 내에서의 this)

- 인자로 아예 this를 받아서 명시함.
- 주로 배열 메서드에 많이 존재.
```javascript
var report = {
    sum: 0,
    count: 0,
    add: function() { 
        var args = Array.prototype.slice.call(arguments);
        args.forEach(function (entry) {
            this.sum += entry;
            ++this.count;
        }, this); // add의 this(report)를 바인딩해서 forEach에서 사용함
    },
    average: function () {
        return this.sum / this.count;
    }
};
```

- 콜백 함수와 함께 thisArg를 인자로 받는 메서드
  - Array.prototype: forEach, map, filter, some, every, find, findIndex, flatMap, from
  - Set.prototype: forEach
  - Map.prototype: forEach

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
