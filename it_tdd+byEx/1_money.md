## 00.들어가기 전에

#### 테스트 코드 작성의 절대적인 흐름

1. 작은 테스트를 하나 추가한다.
2. 모든 테스트를 실행해서 테스트가 실패하는 것을 확인한다.
3. 조금 수정한다.
4. 모든 테스트를 실행해서 테스트가 성공하는 것을 확인한다.
5. 중복을 제거하기 위해 리팩토링을 한다.

```text
당신이 천재라면 당신에게 이런 법칙은 필요 없다. 
또 당신이 멍청이라면 역시 이런 법칙이 도움이 되지 않을 것이다.
..kent.B
```

- 어떤 코드건 `작성하기 전에` 실패하는 자동화된 테스트를 작성하라.
- `중복`을 제거하라.

## 01.화폐예제

### 1장 다중 통화를 지원하는 Money 객체

> 앞으로 어떤 일을 해야 하는지 알려주고, 지금 하는 일에 집중할 수 있도록 도와주며, 언제 일이 다 끝나는지 알려 줄 수 있게끔 할일 목록을 작성해보자.

📌 할일 목록
- $5 + 10CHF = $10 (환율이 2:1일 경우 자동계산)
- __$5 * 2 = $10__
- amount를 private로 만들기
- Dollar 부작용 (side effect)?
- Money 반올림?

#### 곱셈 메서드 구현을 위해 테스트를 작성

```java
public void testMultiplication() {
  Dollar five = new Dollar(5);
  five.times(2);
  assertEquals(10, five.amount);
}
```

네가지의 컴파일 에러가 발생
- Dollar 클래스가 없음
- 생성자가 없음
- times(int) 메서드가 없음
- amount 필드가 없음

테스트의 컴파일 에러를 우선적으로 잡기 위해 코드 추가
```java
public class Dollar() {
  int amount;

  Dollar(int amount) {
    // todo
  }

  void times(int multiplier) {
    // todo
  }
}
```

> 위의 코드를 작성하자 컴파일이 수행되어 코드의 `실패여부`를 알 수 있게 되었다.

놀랍게도 가장 처음의 수정은 아래와 같이 일어난다.
```java
public class Dollar() {
  int amount = 10;
  ...
}
```

이제 우리는 흐름의 4번째(Green Bar)의 흐름까지 도착했다.<br>
보이지 않는 중복을 제거해보자.
```java
public class Dollar() {
  // int amount = 10; 10은 5 * 2 이가 순식간에 계산된 값이다.
  int amount;

  Dollar(int amount) {
    // todo
  }

  void times(int multiplier) {
    amount = 5 * 2;
  }
}
```

생성자에게서 넘어오는 5를 변수로 저장하자.
```java
public class Dollar() {
  int amount;

  Dollar(int amount) {
    this.amount = amount; // 매개변수 넘어온 값을 amount에 저장
  }

  void times(int multiplier) {
    amount = amount * 2; // amount를 times 함수에서 사용
  }
}
```

multiplier의 값이 2 이므로 상수를 인자로 대체할 수 있다.
```java
public class Dollar() {
  ...
  void times(int multiplier) {
    amount = amount * multiplier; // times에서도 매개변수를 활용
  }
}
```

마저 중복 제거를 위해 연산자를 활용한다.
```java
public class Dollar() {
  ...
  void times(int multiplier) {
    amount *= multiplier;
  }
}
```

📌 할일 목록
- $5 + 10CHF = $10 (환율이 2:1일 경우 자동계산)
- ~~$5 * 2 = $10~~
- amount를 private로 만들기
- Dollar 부작용 (side effect)?
- Money 반올림?

첫번째 테스트는 이렇게 마무리가 되었다.

### 2장 타락한 객체

✍️<br>
우리의 목적은 `작동하는 깔끔한 코드`를 얻는 것이다.<br>
작동하는 깔끔한 코드를 얻는 것은 때로는 최고의 프로그래머들조차 도달하기 힘든 목표고,<br>
나같은 대부분의 평범한 프로그래머들에게는 거의 불가능한 일이다.<br>
그렇다면 `나누어서 정복하자.` <br>

#### Dollar 부작용 해결

📌 할일 목록
- $5 + 10CHF = $10 (환율이 2:1일 경우 자동계산)
- ~~$5 * 2 = $10~~
- amount를 private로 만들기
- __Dollar 부작용 (side effect)?__
- Money 반올림?

Dollar에 대한 연산을 수행한 후에 해당 Dollar 값이 바뀌는 점은 좋지 않다.<br>
테스트 코드를 다음과 같이 바꿔보자.
```java
public void testMultiplication() {
  Dollar five = new Dollar(5);
  five.times(2); // 5 * 2
  assertEquals(10, five.amount);
  five.times(3); // 10 * 3
  assertEquals(15, five.amount); // error!
}
```

times()를 처음 호출한 이후에 five는 더이상 5가 아니다.<br>
이 문제를 해결하기 위해 times()에서 새로운 객체를 반환하게 만들면 어떨까?
```java
public void testMultiplication() {
  Dollar five = new Dollar(5);
  Dollar product = five.times(2);
  assertEquals(10, product.amount);
  product = five.times(3);
  assertEquals(15, product.amount);
}
```

새 테스트가 컴파일 되기 위해 간단하게 코드를 수정한다.
```java
public class Dollar() {
  int amount;

  Dollar(int amount) {
    this.amount = amount;
  }

  void times(int multiplier) {
    amount *= multiplier;
    return null;
  }
}
```

테스트를 통과하기 위해서는 올바른 금액을 갖는 새 Dollar를 반환해야 한다.
```java
public class Dollar() {
  ...
  void times(int multiplier) {
    return new Dollar(amount * multiplier);
  }
}
```

📌 할일 목록
- $5 + 10CHF = $10 (환율이 2:1일 경우 자동계산)
- ~~$5 * 2 = $10~~
- amount를 private로 만들기
- ~~Dollar 부작용 (side effect)?~~
- Money 반올림?

우리는 Dollar 부작용을 해결했다!

#### 최대한 빨리 초록색을 보기 위한 전략 세가지

- `가짜로 구현하기`: 상수를 반환하게 만들고 진짜 코드를 얻을 때까지 단계적으로 상수를 변수로 바꾸어 간다.
- `명백한 구현 사용하기`: 실제 구현을 입력한다.
- 🔒미공개

보통 실무에서 TDD를 사용할 때 두 방법을 번갈아가며 사용한다.<br>
모든 일이 자연스럽게 잘 진행되고 내가 뭘 입력해야 할지 알 때는 명백한 구현을 계속 더해 나간다.<br>

지금까지 배운 것을 검토해보면
- 설계상의 결함(Dollar 부작용)을 그 결함으로 인해 실패하는 테스트로 변환했다.
- 스텁 구현으로 빠르게 컴파일을 통과하도록 만들었다.
- 올바르다고 생각하는 코드를 입력하여 테스트를 통과했다.

느낌(부작용에 대한 혐오감)을 테스트(하나의 Dollar 객체에 곱하기를 두 번 수행하는 것)로 변환하는 것은 TDD의 일반적인 주제이다.<br>
이런 작업을 오래 할수록 미적 판단을 테스트로 담아내는 것에 점점 익숙해지게 된다.

### 3장 모두를 위한 평등

✍️<br>
지금의 Dollar 객체같이 객체를 값처럼 쓸 수 있는데 이것을 `값 객체 패턴`이라고 한다.<br>
값 객체의 제약사항 중에 하나는 객체의 인스턴스 변수가 생성자를 통해서 일단 설정된 후에는 결코 변하지 않는다는 것이다.<br>
값 객체가 암시하는 것 중 하나는 2장에서 했던 것 처럼 `모든 연산은 새 객체를 반환해야 한다`는 것이다.<br>
또다른 암시는 값 객체는 equals()를 구현해야 한다는 것인데 $5 라고 정의한 것은 항상 다른 $5만큼이나 똑같아야하기 때문이다.<br>
덧붙여 만약 Dollar를 해시 테이블의 키로 쓸 생각이라면 equals()를 구현할 때에 hashCode()를 같이 구현해야 한다.(일단 할일목록에 추가하고 나중에 생각하자)<br>

📌 할일 목록
- $5 + 10CHF = $10 (환율이 2:1일 경우 자동계산)
- ~~$5 * 2 = $10~~
- amount를 private로 만들기
- ~~Dollar 부작용 (side effect)?~~
- Money 반올림?
- __equals()__
- hashCode()

#### 잊지말자, 테스트코드 부터 구현

```java
public void testEquality() {
  assertTrue(new Dollar(5).equals(new Dollar(5)));
}
```

빨간 막대다. 가짜로 구현하는 방법은 equals()가 단순히 true를 반환하는 것이다.<br>
자, 이제 최대한 빨리 초록색 막대를 보기위한 마지막 방법인 `삼각측량법`을 이용할 때이다.<br>
삼각측량법을 이용하기 위해서는 예제가 한가지 더 필요하다.<br>
```java
public void testEquality() {
  assertTrue(new Dollar(5).equals(new Dollar(5)));
  assertFalse(new Dollar(5).equals(new Dollar(6)));
}
```

이제 동치성(equality)을 일반화해야 한다.
```java
...
public boolean equals(Object object) {
  Dollar dollar = (Dollar) object;
  return amount == dollar.amount;
}
```

📌 할일 목록
- $5 + 10CHF = $10 (환율이 2:1일 경우 자동계산)
- ~~$5 * 2 = $10~~
- amount를 private로 만들기
- ~~Dollar 부작용 (side effect)?~~
- Money 반올림?
- ~~equals()~~
- hashCode()

#### 기묘한 삼각측량

> 어떻게 리팩토링해야 하는지 전혀 감이 안 올 때만 삼각측량을 사용하자.

일반적으로 해결방법이 보일 경우 굳이 돌아갈 필요는 없지만<br>
설계를 어떻게 할지 떠오르지 않을 때면, 삼각측량은 문제를 조금 다른 방향에서 생각해볼 기회를 제공한다.<br>

자, 동일성 문제는 일시적으로 해결됐다. 하지만 널 값이나 다른 객체들과 비교한다면 어떻게 될까?<br>
이런 상황은 일반적이지만 지금 당장은 필요하지 않으니 할일 목록에 추가만 하도록 하자.<br>

📌 할일 목록
- $5 + 10CHF = $10 (환율이 2:1일 경우 자동계산)
- ~~$5 * 2 = $10~~
- amount를 private로 만들기
- ~~Dollar 부작용 (side effect)?~~
- Money 반올림?
- ~~equals()~~
- hashCode()
- Equal null
- Equal object

이제 동질성 기능을 구현했으므로 Dollar와 Dollar를 직접 비교할 수 있게 됐다.<br>
따라서 모든 올바른 인스턴스 변수들이 그렇듯이 amount를 private로 만들 수 있게 됐다.<br>

### 4장 프라이버시

개념적으로 Dollar.times() 연산은 호출을 받은 객체의 값에 인자로 받은 곱수만큼 곱한 값을 갖는 Dollar를 반환해야 하지만<br>
테스트가 정확히 그것을 말하지는 않는다.

📌 할일 목록
- $5 + 10CHF = $10 (환율이 2:1일 경우 자동계산)
- ~~$5 * 2 = $10~~
- __amount를 private로 만들기__
- ~~Dollar 부작용 (side effect)?~~
- Money 반올림?
- ~~equals()~~
- hashCode()
- Equal null
- Equal object

```java
// 기존의 테스트코드
public void testMultiplication() {
  Dollar five = new Dollar(5);
  Dollar product = five.times(2);
  assertEquals(10, product.amount);
  product = five.times(3);
  assertEquals(15, product.amount);
}
```

단언(assertion)을 Dollar와 Dollar를 비교하는 것으로 재작성할 수 있다.
```java
public void testMultiplication() {
  Dollar five = new Dollar(5);
  Dollar product = five.times(2);
  assertEquals(new Dollar(10), product);
  product = five.times(3);
  assertEquals(new Dollar(15), product);
}
```

이제 임시변수인 product는 쓸모없어 보이니 인라인을 시킨다.
```java
public void testMultiplication() {
  Dollar five = new Dollar(5);
  assertEquals(new Dollar(10), five.times(2));
  assertEquals(new Dollar(15), five.times(3));
}
```

이 테스트는 일련의 오퍼레이션이 아니라 참인 명제에 대한 단언들이므로 우리의 의도를 더 명확하게 이야기해준다.

테스트를 고치고 나니 이제 Dollar 인스턴스 변수를 사용하는 코드는 Dollar 자신 밖에 없게 됐다.<br>
따라서 변수를 private로 변경할 수 있다.
```java
public class Dollar() {
  private int amount;

  Dollar(int amount) {
    this.amount = amount;
  }

  void times(int multiplier) {
    return new Dollar(amount * multiplier);
  }

  public boolean equals(Object object) {
    Dollar dollar = (Dollar) object;
    return amount == dollar.amount;
  }
}
```

📌 할일 목록
- $5 + 10CHF = $10 (환율이 2:1일 경우 자동계산)
- ~~$5 * 2 = $10~~
- ~~amount를 private로 만들기~~
- ~~Dollar 부작용 (side effect)?~~
- Money 반올림?
- ~~equals()~~
- hashCode()
- Equal null
- Equal object

하지만 주의해야 할 점이 있다.<br>
만약 동치성 테스트가 동치성에 대한 코드가 정확히 작동한다는 것을 검증하는데 실패한다면<br>
곱하기 테스트 역시 곱하기에 대한 코드가 정확하게 작동한다는 것을 검증하는 데 실패하게 된다.<br>
이것은 TDD를 하면서 적극적으로 관리해야 할 위험 요소이다.

### 5장 솔직히 말하자면

할일 목록의 첫번째의 경우 언뜻 함부로 다가설 수 없다.<br>
우선은 Dollar 객체와 비슷하지만 달러 대신 프랑(Franc)을 표현할 수 있는 객체가 필요할 것 같다.<br>
만약 Dollar 객체와 비슷하게 작동하는 Franc이라는 객체를 만든다면<br>
단위가 섞인 덧셈 테스트를 작성하고 돌려보는 데 더 가까워질 것이다.<br>

📌 할일 목록
- $5 + 10CHF = $10 (환율이 2:1일 경우 자동계산)
- ~~$5 * 2 = $10~~
- ~~amount를 private로 만들기~~
- ~~Dollar 부작용 (side effect)?~~
- Money 반올림?
- ~~equals()~~
- hashCode()
- Equal null
- Equal object
- __5CHF * 2 = 10CHF__

Franc테스트를 만들기 위해 Dollar테스트를 복사하고 수정해보자.
```java
public void testFrancMultiplication() {
  Franc five = new Franc(5);
  assertEquals(new Franc(10), five.times(2));
  assertEquals(new Franc(15), five.times(3));
}
```

마찬가지로 기존의 코드를 가져와 활용한다.
```java
public class Franc() {
  private int amount;

  Franc(int amount) {
    this.amount = amount;
  }

  void times(int multiplier) {
    return new Franc(amount * multiplier);
  }

  public boolean equals(Object object) {
    Franc Franc = (Franc) object;
    return amount == Franc.amount;
  }
}
```

중복된 코드가 불편할 수 있다.<br>
하지만 4단계까지의 과정은 그 어떠한 것 보다 속도가 중요하다.<br>
가능한 방법이 있다면 그것이 어떤 종류의 최악의 코드이건 간에 실현한다.<br>

덕분에 컴파일되게 하기 단계는 순식간에 넘어갈 수 있었다.<br>
하지만 우리 모두가 알고 있는 것처럼 중복이 엄청나게 많다.<br>
다음 테스트로 넘어가기 전에 이것들을 제거해야 할 필요가 있다.<br>

📌 할일 목록
- $5 + 10CHF = $10 (환율이 2:1일 경우 자동계산)
- ~~$5 * 2 = $10~~
- ~~amount를 private로 만들기~~
- ~~Dollar 부작용 (side effect)?~~
- Money 반올림?
- ~~equals()~~
- hashCode()
- Equal null
- Equal object
- ~~5CHF * 2 = 10CHF~~
- Dollar/Franc 중복
- 공용 equals
- 공용 times
