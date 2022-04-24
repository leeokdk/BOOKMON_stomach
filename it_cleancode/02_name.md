## 02. MEANING NAME

### DAY 2

🔖 오늘 읽은 범위 : 2장 의미있는 이름

---

<aside>
😃 <b>기억하고 싶은 내용</b>

</aside>

- 주석으로 설명하지말고 변수 자체에 의도를 넣자.
    
    ```java
    int d; // 날짜 단위 경과 시간 -- X
    
    int elapsedTimeInDays;
    ```
    
    - 추가 예시
        
        ```java
        // -- worst
        public List<int[]> getThem() {
        	List<int[]> list1 = new ArrayList<int[]>();
        	for (int[] x : theList)
        		if (x[0] == 4)
        			list1.add(x);
        	return list;
        }
        
        // -- good
        public List<int[]> getFlaggedCells() {
        	List<int[]> flaggedCells = new ArrayList<int[]>();
        	for (int[] cell : gameBoard)
        		if (cell[STATUS_VALUE] == FLAGGED)
        			flaggedCells.add(cell);
        	return flaggedCells;
        }
        
        // -- best
        public List<Cell> getFlaggedCells() {
        	List<Cell> flaggedCells = new ArrayList<Cell>();
        	for (Cell cell : gameBoard)
        		if (cell.isFlagged())
        			flaggedCells.add(cell);
        	return flaggedCells;
        }
        ```
        
- 다음과 같은 잘못된 정보를 주지 않으려고 노력하자.
    - 약어의 사용(hp 등)
    - 기존 개념의 사용(List 등)
    - 유사한 개념이 아닌데도 서로 흡사한 이름을 사용
    - 소문자 L과 대문자 O를 변수명 등에 사용(0 1과 유사함)
- 무의미한 나열(a1, a2, b1...)과 불용어의 사용(variable, table..)을 지양하라. **이름이 달라야 한다면 의미도 달라져야 한다. 읽는 사람이 차이를 알도록 이름을 지어라.**
    
    > moneyAmount vs money
    customerInfo    vs customer
    accountData     vs account
    theMessage      vs message
    > 
- 줄임말로 말도 안되게 쓰는 것이 아닌 말하기 쉬운 이름으로 작성해라.
- 변수명이 짧으면 검색하기 어렵다. `이름 길이`는 `범위 크기`에 비례해야 한다.
    
    ```java
    // -- worst
    for (int j=0; j<34; j++) {
    	s += (t[j]*4)/5;
    }
    
    // -- good
    int realDaysPerIdealDay = 4;
    const int WORK_DAYS_PER_WEEK = 5;
    int sum = 0;
    for (int j=0; j<NUMBER_OF_TASKS; j++) {
    	int realTaskDays = taskEstimate[j] * realDaysPerIdealDay;
    	int realTaskWeeks = (realTaskDays / WORK_DAYS_PER_WEEK);
    	sum += realTaskWeeks;
    }
    ```
- 굳이 이름에서 타입이나 접두어, 인터페이스 여부 등을 표현하지 않아도 된다.
- 클래스의 이름: `명사`나 `명사구`를 사용. (Customer, WikiPage 등)
- 메서드의 이름: `동사`나 `동사구`를 사용. (postPayment, deletePage 등) 접근자(get-), 변경자(set-), 조건자(is-) 정도는 javabean 표준에 따라 사용하면 좋다. 생성자를 중복정의 할 때에는 new로 정의하기보단 정적 팩토리 메서드를 사용하면 좋다.        
    ```java
    // -- better
    Complex fulcrumPoint = Complex.FromRealNumber(23.0);
    
    // -- than
    Complex fulcrumPoint = new Complex(23.0);
    ```
        
- 한 개념에는 하나의 단어만. 하지만 맥락이 다르면 다르게 짓자.
- 맥락을 명확하게 해라.
    
    ```java
    // -- worst
    private void printGuessStatistics(char candidate, int count) {
    	String number;
    	String verb;
    	String pluralModifier;
    	if (count == 0) {
    		number = "no";
    		verb = "are";
    		pluralModifier = "s";
    	} else if (count == 1) {
    		number = "1";
    		verb = "is";
    		pluralModifier = "";
    	} else {
    		number = Integer.toString(count);
    		verb = "are";
    		pluralModifier = "s";
    	}
    	String guessMessage = String.format(
    		"There %s %s %s%s", verb, number, candidate, pluralModifier
    	);
    	print(guessMessage);
    }
    
    // -- best
    public class GuessStatisticsMessage {
    	private String number;
    	private String verb;
    	private String pluralModifier;
    
    	public String make(char candidate, int count) {
    		createPluralDependentMessageParts(count);
    		return String.format(
    			"There %s %s %s%s",
    			verb, number, candidate, pluralModifier);
    	}
    }
    
    private void createPluralDependentMessageParts(int count) {
    	if (count == 0) {
    		thereAreNoLetters();
    	} else if (count == 1) {
    		thereIsOneLetter();
    	} else {
    		thereAreManyLetters();
    	}
    }
    
    private void thereAreManyLetters(int count) {
    	number = Integer.toString(count);
    	verb = "are";
    	pluralModifier = "s";
    }
    
    private void thereIsOneLetter() {
    	number = "1";
    	verb = "is";
    	pluralModifier = "";
    }
    
    private void thereAreNoLetters() {
    	number = "no";
    	verb = "are";
    	pluralModifier = "s";
    }
    ```
    
- 불필요한 맥락을 없애라.
    
    > 의미가 분명한 경우에 한해서 짧은 이름이 긴 이름보다 좋다.
    > accountAddress와 customerAddress는 Address 클래스의 인스턴스로는 좋은 이름이지만 클래스명으로는 적합하지 않다.
    

---

<aside>
🤔 <b>오늘의 파트에 대한 소감</b>

</aside>

- 코드를 배우던 초기에는 긴 변수나 코드가 좋지 않은 것으로만 보였다. 당연하다. 초짜의 눈으로 장황하게 써져 있는 코드는 참 알아먹기 힘들다. 그래서 긴 코드나 변수를 무조건 지양했고 그것이 잘못된 선입견이라는 것을 최근에 알게 되었다. 무의미한 나열 또한 굉장히 애용하는 방법인데, 역시 고쳐야할 습관이었다. 아주 고칠 것 투성이다.
- 책을 읽으며 검색에 쉽게 걸리게 하도록 정확히 변수명을 짓는 것, 단어를 검색할 때 유사한 개념이 함께 나오도록 짓는 것 등은 생각하지 못 했던 부분이었다. 기억 또 기억!
- 오늘 읽은 부분의 마지막에 질책을 두려워하지 말고 나아가라! 라는 식의 이야기가 있었지만 글쎄.. 이 부분은 조금 해석을 잘못할 여지가 있지 않나 싶다. 물론 나의 동료가 함께 설계하는 프로젝트의 코드를 더 낫게 개선한다면 나도 물론 환영이다. 하지만 어디까지나 프로젝트는 팀 단위로 굴러간다는 걸 잊지 말아야한다. 어느날 내가 사용하던 변수가 순식간에 다른 단어로 교체되고 ‘아 그거 잘못 쓰는 것 같아서 전부 바꿨어요^^’ 같은 식의 답을 듣게 된다면 굉장히 당황스러울 것 같다. 질책같은걸 두려워하지 않는 것은 맞지만 설계에서 했던 약속도 중요하다고 생각한다. 물론 저자가 말하는건 어디까지나 좋은 의미일 것이다.
- 뭐, 서로 으쌰으쌰하고 자주 소통하는 조직문화가 있다면 하등 문제될 것이 없다. 대체로 그러지 않기 때문에 슬퍼서 좀 끄적거렸다..

---

<aside>
🔎 <b>추가로 알게 된 것</b>

</aside>

- 헝가리안 표기법

변수 및 함수의 인자 이름 앞에 데이터 타입을 명시하는 코딩 규칙. 현재는 굳이 사용하지 않아도 될 정도로 도구가 발전했을 뿐더러 오히려 유연한 타입 설정을 막고 잘못된 정보를 줄 가능성이 있어 지양하고 있다. 

- 이름 잘 짓는 법

[네이밍 관련 글 정리](https://sheerheart.tistory.com/entry/%EC%A2%8B%EC%9D%80-%EB%84%A4%EC%9D%B4%EB%B0%8D%EC%9D%84-%EC%9C%84%ED%95%9C-%EC%B0%B8%EA%B3%A0-%EC%9E%90%EB%A3%8C)

---

🤟소감 3줄 요약 

- 읽는 사람이 차이를 알 수 있도록 이름을 지어라.
- 똑똑한 프로그래머가 아닌 전문적인 프로그래머를 지향하자.
- 개선하는 노력을 멈추지 말자.