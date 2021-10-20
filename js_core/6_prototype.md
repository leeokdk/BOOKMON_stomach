# 06. 프로토타입
> 자바스크립트는 프로토타입 기반 언어이다.
<hr>
<hr>

## 01. 프로토타입의 개념 이해

<hr>

### 6-1-1 constructor, prototype, instance
var instance = new Constructor();
도식화 이미지 첨부
- 어떤 생성자 함수(Constructor)를 new 연산자와 함께 호출하면
- Constructor에서 정의된 내용을 바탕으로 새로운 인스턴스(instance)가 생성된다.
- 이 때 instance에는 __proto__라는 프로퍼티가 자동으로 부여되는데,
- 이 프로퍼티는 Constructor의 prototype이라는 프로퍼티를 참조한다.

prototype이라는 프로퍼티와 __proto__라는 프로퍼티의 관계가 개념의 핵심.

> 주의이모지 학습용으로 __proto__를 사용하는 것이지 현장에서는 직접 프로퍼티를 사용하지 않고
그 대신 Object.getPrototypeOf(), Object.create() 등을 이용한다.

예제
```javascript
var Person = function(name){
	this._name = name;
};
Person.prototype.getName = function(){
	return this._name;
};
```
Person이라는 생성자 함수의 prototype에 getName이라는 메서드를 지정했다.
이제 Person의 인스턴스는 __proto__ 프로퍼티를 통해 getName을 호출할 수 있다.
왜냐하면 instance의 __proto__가 Constructor의 prototype 프로퍼티를 참조하므로 결국 둘은 같은 객체를 바라보기 때문이다.

```javascript
var ok = new Person('ok');
ok.__proto__.getName(); //undefined
Person.prototype === ok.__proto__ // true
```

getName을 호출할 때 에러가 발생하지 않았다는 점에서 해당 변수가 `호출할 수 있는 함수`에 해당한다는 것을 의미한다.
즉 getName이 실제로 실행되었으며 함수라는 점이 입증되었다.

반환된 값을 살펴보자면 getName은 this.name 값을 리턴한다. 이 때 this에 바인딩된 대상이 잘못 지정되어 있다.
ok.__proto__getName()에서 getName 함수 내부에서의 this는 ok가 아니라 ok.__proto__라는 객체가 되는 것이다.
이 객체 내부에는 name 프로퍼티가 없으므로 찾고자 하는 식별자가 정의되어 있지 않을 때는 undefined를 반환하는 규칙에 따라 undefined의 결과를 받아보게 된 것이다.
__proto__ 객체에 name 프로퍼티를 따로 지정해준다면 당연지사 해당 프로퍼티를 반환한다.

이 문제는 매우 간단히 해결되는데, __proto__를 빼면된다.
놀랍게도 __proto__ 는 생략 가능한 프로퍼티라서, 제외하여 원하는대로 this를 바라보게 할 수 있다.
```javascript
var okdk = new Person('okdk');
okdk.getName(); // okdk
```

> 전구이모지 new 연산자로 Constructor를 호출하면 instance가 만들어지는데, 이 instance의 생략 가능한 프로퍼티인 __proto__는 Constructor의 prototype을 참조한다!

더 자세히
- 자바스크립트는 함수에 자동으로 객체인 prototype 프로퍼티를 생성한다.
- 해당 함수를 생성자 함수로 사용할 경우(new로 함수 호출)
  - 생성된 인스턴스에 __proto__(생성자 함수의 prototype 참조)가 자동으로 생성된다.
  - __proto__는 생략 가능하기 때문에
    - 생성자 함수의 prototype에 어떤 메서드나 프로퍼티가 있다면
    - 인스턴스에서도 마치 자신의 것처럼 해당 메서드나 프로퍼티에 접근할 수 있게 된다.

Array 예시
```javascript
var arr = [1,2];
console.dir(arr);
console.dir(Array);;
```

Array의 prototype.부분을 arr의 __proto__로 가져간 걸 볼 수 있다.
prototype 내부에 있지 않은 정적 메서드(form,isArray,of etc)와 기본 프로퍼티(arguments, caller, name etc.)을 arr이 사용하지 못하는 이유다.
Array.isArray(arr) 같은 방식으로 생성자 함수에 직접 접근해야 실행이 가능하다.

<hr>

### 6-1-2 constructor 프로퍼티
생성자 함수의 prototype 프로퍼티 객체 내부에는 constructor라는 프로퍼티가 존재한다.
prototype을 참조하는 __proto__ 또한 마찬가지 이다.
해당 프로퍼티는 원래의 생성자 함수(자기자신)을 참조한다.
쓸모 없어 보이는 기능이지만 이 역시 인스턴스와의 관계에 있어서 필요한 정보이다.
인스턴스로부터 그 `원형이 무엇인지`를 알 수 있는 수단이기 때문이다.
```javascript
var arr = [1,22];
Array.prototype.constructor === Array;
arr.__proto__.constructor === Array;
arr.constructor === Array;
// all true
var arr2 = new arr,constructor(3,4_;
console.log(arr2); // [3,4]
```

<hr>
<hr>

## 02.

<hr>
<hr>

## 03. 정리
어떤 생성자 함수를 new 연산자와 함께 호출하면 `Constructor`에서 정의된 내용을 바탕으로 새로운 인스턴스가 생성되는데,<br>
이 인스턴스에는 `__proto__`라는 `Constructor의 prototype 프로퍼티`를 참조하는 프로퍼티가 자동으로 부여된다.<br>
- __proto__: 생략 가능한 속성. 인스턴스는 Constructor.prototype의 메서드를 마치 자신의 메서드인 것처럼 호출할 수 있다.
- constructor: Constructor.prototype의 프로퍼티. 생성자 함수 자신을 가리킨다. 이 프로퍼티는 인스턴스가 자신의 생성자 함수가 무엇인지를 알고자 할 때 필요한 수단이다.
- 프로토타입 체이닝: __proto__방향(직각삼각형의 대각선 방향)을 계속 찾아가면 최종적으로 `Object.prototype`에 도달한다. 이런식으로 __proto__안에 다시 __proto__를 찾아가는 과정. 이 프로토타입 체이닝 기능을 통해 각 프로토타입 메서드를 자신의 것처럼 호출할 수 있다.(자신으로부터 가장 가까운 대상부터 나아가 원하는 값을 찾으면 중단) 반드시 2단계로만 이뤄지는 것이 아니라 무한대로 생성이 가능하다.
    - Object.prototype: 모든 데이터 타입에서 사용할 수 있는 범용적인 메서드만이 존재. 객체 전용 메서드는 여느 데이터 타입과 달리 Object 생성자 함수에 스태틱하게 담겨 있다.