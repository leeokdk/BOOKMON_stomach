# 01. 데이터 타입

## 01. 데이터 타입의 종류

- 기본형 primitive type : `값이 담긴 주솟값`을 바로 복제
    - number
    - string
    - boolean
    - null
    - undefined
    - symbol(new!)


- 참조형 reference type : `값이 담긴 주솟값들로 이루어진 묶음`을 가리키는 주솟값을 복제
    - Object
        - Array
        - Function
        - Date
        - RegExp
        - Map
        - WeakMap
        - Set
        - WeakSet

> 기본형은 `불변성immutability`을 띈다?<br>
이게 대체 무슨 말인지 이해하기 위해 ₩메모리₩와 `데이터`, `식별자`와, `변수`의 개념을 알아야 한다!<br>
그리고 메모리 영역에서 자바스크립트의 데이터가 처리되는 과정을 살펴보면 알 수 있다.

## 02. 데이터 타입에 관한 배경지식 

### 1-2-1 메모리와 데이터

- 비트: `고유한 식별자`를 통해 데이터 위치를 확인할 수 있는 최소단위.
- 바이트: 비트 단위로 위치를 확인하는 것은 매우 비효율적이라 몇 개씩 묶어서 확인하기로 함. 그 묶음의 단위, `메모리 주솟값`.(8비트)
  - 자주 사용하지 않을 데이터를 표현하기 위해 빈 공간을 남겨놓기 보다는 표현 가능한 개수에 어느 정도 제약이 따르더라도 크게 문제가 되지 않을 적정한 공간을 묶는 편이 낫다.

자바스크립트는 다른 언어에 비해 상대적으로 메모리 관리에 대한 압박에서 자유롭다. 숫자의 경우 정수형인지 부동소수형인지를 구분하지 않고 8바이트(64비트)를 확보한다.

### 1-2-2 식별자와 변수

변수variable과 식별자identifier은 혼용하는 경우가 많다. 명백히 따지자면 아래와 같다.

- 변수: 변할 수 있는 데이터
- 식별자: 변수명

## 03. 변수 선언과 데이터 할당

### 1-3-1 변수 선언

- 변수 선언식

```javascript
    var a; // 변할 수 있는 데이터를 만든다. 이 데이터의 식별자는 a로 한다.
            // 주솟값 000 {이름: a, 값: ,} 이런 느낌으로 저장
```
> 즉 변수란 변경가능한 데이터가 담길 수 있는 공간 또는 그릇

1-3-2 데이터 할당
```javascript
var a; //변수 a 선언
a = 'abc'; //변수 a에 데이터 할당

var a = 'abc'; //변수 선언과 할당을 한 문장으로 표현
```

📌 <ins>실제로는 a의 위치에 'abc'를 직접 저장하지 않는다!</ins>

주소를 저장하는 <span style="color:pink">변수영역</span>과 실제 값을 저장하는 <span style="color:skyblue">데이터 영역</span>이 존재

1. <span style="color:pink">변수 영역</span>에서 빈 공간(<span style="color:pink">@1003</span>)을 확보한다.
2. 확보한 공간(<span style="color:pink">@1003</span>)의 식별자를 <span style="color:pink">a</span>로 지정한다.
3. <span style="color:skyblue">데이터 영역</span>의 빈 공간(<span style="color:skyblue">@5004</span>)에 문자열 '<span style="color:skyblue">abc</span>'를 저장한다.
4. <span style="color:pink">변수 영역</span>에서 <span style="color:pink">a</span>라는 식별자를 검색한다. => <span style="color:pink">@1003</span>
5. 앞서 저장한 문자열의 주소(<span style="color:skyblue">@5003</span>)를 <span style="color:pink">@1003</span>의 공간에 대입한다.

🧐 직접 저장하지 않고 한 단계 거치는 이유

: 데이터 `변환`을 자유롭게 할 수 있게 함과 동시에 `메모리`를 더욱 효율적으로 관리하기 위하여.

<small>
가변적인 문자열 데이터의 경우 데이터를 변환할 때마다 데이터의 크기에 관해 고민해야 함.<br>
'abc'를 'abcdef'로 바꿀경우 데이터 영역의 @5003이 'abcdef'로 바뀌는 것이 아닌 
'abcdef'라는 값을 가진 새로운 데이터 영역(@5004)가 생성되어 @1003에 주솟값이 @5004로 바뀐다.<br>
500개의 변수에 모두 'abc'를 할당한다면 이미 데이터 영역에 @5003이 존재하기 때문에
새로 생겨난 변수 영역에 모두 주솟값을 연결해주기만 하면 된다.(중복데이터 처리 효율 증가)
</small>

## 04. 기본형 데이터와 참조형 데이터

### 1-4-1 불변값

- 변수variable와 상수constant 그리고 불변값
    - 변수와 상수는 `변경가능성`으로 구분.
    - 바꿀 수 있으면 변수, 바꿀 수 없으면 상수.
    - 상수와 불변값도 비슷하지만 `메모리 영역`으로 구분.
    - 변수와 상수의 변경 대상은 <span style="color:pink">변수 영역 메모리</span>.
    - 불변성 여부에 대한 변경 대상은 <span style="color:skyblue">데이터 영역 메모리</span>.
    - 즉 변수와 상수는 주솟값을 바꾸냐 마냐이며 불변값은 실제 데이터값을 바꾸냐 마냐이다.
    - 기본형 데이터인 숫자, 문자열, boolean, null, undefined, Symbol은 모두 불변값이다.

- 예제
```javascript
var a = 'abc';
a = a + 'def'; //'abcdef'의 값을 가진 새로운 데이터 영역을 변수영역a에 할당한다

var b = 5; //5의 값을 가진 데이터영역이 생성됨
var c = 5; //위에서 이미 생성되었으므로 재활용하여 c에 할당한다
b = 7; //7의 값을 가진 데이터영역을 생성하여 b에 할당한다
```

문자열 값도 한 번 만든 값을 바꿀 수 없고, 숫자 값도 다른 값으로 변경할 수 없다.<br>
변경 자체가 새로 만드는 동작으로밖에 이루어지지 않기 때문에 불변이라고 하는 것이다.<br>
한 번 만들어진 값은 가비지 컬렉팅을 당하지 않는 한 영원히 변하지 않는다.

### 1-4-2 가변값

- 가변값
  - 기본형 데이터와 달리 참조형 데이터는 기본적으로 가변값이 맞다.
  - 하지만 상황에 따라 변경 불가능한 경우도 있고 아예 불변값으로 활용하는 방안도 존재한다. (예외가 있음을 인식해둘 것)

- 참조형 데이터를 변수에 할당하기
```javascript
var obj1 = {
    a: 1,
    b: 'bbb',
};
```

1. 컴퓨터는 우선 <span style="color:pink">변수 영역의 빈 공간(@1002)</span>를 확보하고, 그 주소의 이름을 <span style="color:pink">obj1</span>로 지정한다.
2. <span style="color:skyblue">임의의 데이터 저장 공간(@5001)</span>에 데이터를 저장하려고 보니 여러 개의 프로퍼티로 이뤄진 데이터 그룹이다. 
이 그룹 내부의 프로퍼티들을 저장하기 위해 <span style="color:pink">별도의 변수 영역</span>을 마련하고, <span style="color:skyblue">그 영역의 주소(@7103~?)</span>를 <span style="color:skyblue">@5001</span>에 저장한다.
3. <span style="color:pink">@7103 및 @7104</span>에 각각 <span style="color:pink">a와 b</span>라는 프로퍼티 이름을 지정한다.
4. 데이터 영역에서 숫자 <span style="color:skyblue">1</span>을 검색한다. 검색 결과가 없으므로 임의로 <span style="color:skyblue">@5003</span>에 저장하고, 이 주소를 <span style="color:pink">@7103</span>에 저장한다. 문자열 'bbb' 역시 임의로 @5004에 저장하고, 이 주소를 @7104에 저장한다.