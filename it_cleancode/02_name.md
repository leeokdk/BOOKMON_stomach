## 02. MEANING NAME

### DAY 3

๐ย ์ค๋ ์ฝ์ ๋ฒ์ : 2์ฅ ์๋ฏธ์๋ ์ด๋ฆ

---

<aside>
๐ <b>๊ธฐ์ตํ๊ณ  ์ถ์ ๋ด์ฉ</b>

</aside>

- ์ฃผ์์ผ๋ก ์ค๋ชํ์ง๋ง๊ณ  ๋ณ์ ์์ฒด์ ์๋๋ฅผ ๋ฃ์.
    
    ```java
    int d; // ๋ ์ง ๋จ์ ๊ฒฝ๊ณผ ์๊ฐ -- X
    
    int elapsedTimeInDays;
    ```
    
    - ์ถ๊ฐ ์์
        
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
        
- ๋ค์๊ณผ ๊ฐ์ ์๋ชป๋ ์ ๋ณด๋ฅผ ์ฃผ์ง ์์ผ๋ ค๊ณ  ๋ธ๋ ฅํ์.
    - ์ฝ์ด์ ์ฌ์ฉ(hp ๋ฑ)
    - ๊ธฐ์กด ๊ฐ๋์ ์ฌ์ฉ(List ๋ฑ)
    - ์ ์ฌํ ๊ฐ๋์ด ์๋๋ฐ๋ ์๋ก ํก์ฌํ ์ด๋ฆ์ ์ฌ์ฉ
    - ์๋ฌธ์ L๊ณผ ๋๋ฌธ์ O๋ฅผ ๋ณ์๋ช ๋ฑ์ ์ฌ์ฉ(0 1๊ณผ ์ ์ฌํจ)
- ๋ฌด์๋ฏธํ ๋์ด(a1, a2, b1...)๊ณผ ๋ถ์ฉ์ด์ ์ฌ์ฉ(variable, table..)์ ์ง์ํ๋ผ. **์ด๋ฆ์ด ๋ฌ๋ผ์ผ ํ๋ค๋ฉด ์๋ฏธ๋ ๋ฌ๋ผ์ ธ์ผ ํ๋ค. ์ฝ๋ ์ฌ๋์ด ์ฐจ์ด๋ฅผ ์๋๋ก ์ด๋ฆ์ ์ง์ด๋ผ.**
    
    > moneyAmount vs money
    customerInfo    vs customer
    accountData     vs account
    theMessage      vs message
    > 
- ์ค์๋ง๋ก ๋ง๋ ์๋๊ฒ ์ฐ๋ ๊ฒ์ด ์๋ ๋งํ๊ธฐ ์ฌ์ด ์ด๋ฆ์ผ๋ก ์์ฑํด๋ผ.
- ๋ณ์๋ช์ด ์งง์ผ๋ฉด ๊ฒ์ํ๊ธฐ ์ด๋ ต๋ค. `์ด๋ฆ ๊ธธ์ด`๋ `๋ฒ์ ํฌ๊ธฐ`์ ๋น๋กํด์ผ ํ๋ค.
    
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
- ๊ตณ์ด ์ด๋ฆ์์ ํ์์ด๋ ์ ๋์ด, ์ธํฐํ์ด์ค ์ฌ๋ถ ๋ฑ์ ํํํ์ง ์์๋ ๋๋ค.
- ํด๋์ค์ ์ด๋ฆ: `๋ช์ฌ`๋ `๋ช์ฌ๊ตฌ`๋ฅผ ์ฌ์ฉ. (Customer, WikiPage ๋ฑ)
- ๋ฉ์๋์ ์ด๋ฆ: `๋์ฌ`๋ `๋์ฌ๊ตฌ`๋ฅผ ์ฌ์ฉ. (postPayment, deletePage ๋ฑ) ์ ๊ทผ์(get-), ๋ณ๊ฒฝ์(set-), ์กฐ๊ฑด์(is-) ์ ๋๋ javabean ํ์ค์ ๋ฐ๋ผ ์ฌ์ฉํ๋ฉด ์ข๋ค. ์์ฑ์๋ฅผ ์ค๋ณต์ ์ ํ  ๋์๋ new๋ก ์ ์ํ๊ธฐ๋ณด๋จ ์ ์  ํฉํ ๋ฆฌ ๋ฉ์๋๋ฅผ ์ฌ์ฉํ๋ฉด ์ข๋ค.        
    ```java
    // -- better
    Complex fulcrumPoint = Complex.FromRealNumber(23.0);
    
    // -- than
    Complex fulcrumPoint = new Complex(23.0);
    ```
        
- ํ ๊ฐ๋์๋ ํ๋์ ๋จ์ด๋ง. ํ์ง๋ง ๋งฅ๋ฝ์ด ๋ค๋ฅด๋ฉด ๋ค๋ฅด๊ฒ ์ง์.
- ๋งฅ๋ฝ์ ๋ชํํ๊ฒ ํด๋ผ.
    
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
    
- ๋ถํ์ํ ๋งฅ๋ฝ์ ์์ ๋ผ.
    
    > ์๋ฏธ๊ฐ ๋ถ๋ชํ ๊ฒฝ์ฐ์ ํํด์ ์งง์ ์ด๋ฆ์ด ๊ธด ์ด๋ฆ๋ณด๋ค ์ข๋ค.
    > accountAddress์ customerAddress๋ Address ํด๋์ค์ ์ธ์คํด์ค๋ก๋ ์ข์ ์ด๋ฆ์ด์ง๋ง ํด๋์ค๋ช์ผ๋ก๋ ์ ํฉํ์ง ์๋ค.
    

---

<aside>
๐ค <b>์ค๋์ ํํธ์ ๋ํ ์๊ฐ</b>

</aside>

- ์ฝ๋๋ฅผ ๋ฐฐ์ฐ๋ ์ด๊ธฐ์๋ ๊ธด ๋ณ์๋ ์ฝ๋๊ฐ ์ข์ง ์์ ๊ฒ์ผ๋ก๋ง ๋ณด์๋ค. ๋น์ฐํ๋ค. ์ด์ง์ ๋์ผ๋ก ์ฅํฉํ๊ฒ ์จ์ ธ ์๋ ์ฝ๋๋ ์ฐธ ์์๋จน๊ธฐ ํ๋ค๋ค. ๊ทธ๋์ ๊ธด ์ฝ๋๋ ๋ณ์๋ฅผ ๋ฌด์กฐ๊ฑด ์ง์ํ๊ณ  ๊ทธ๊ฒ์ด ์๋ชป๋ ์ ์๊ฒฌ์ด๋ผ๋ ๊ฒ์ ์ต๊ทผ์ ์๊ฒ ๋์๋ค. ๋ฌด์๋ฏธํ ๋์ด ๋ํ ๊ต์ฅํ ์ ์ฉํ๋ ๋ฐฉ๋ฒ์ธ๋ฐ, ์ญ์ ๊ณ ์ณ์ผํ  ์ต๊ด์ด์๋ค. ์์ฃผ ๊ณ ์น  ๊ฒ ํฌ์ฑ์ด๋ค.
- ์ฑ์ ์ฝ์ผ๋ฉฐ ๊ฒ์์ ์ฝ๊ฒ ๊ฑธ๋ฆฌ๊ฒ ํ๋๋ก ์ ํํ ๋ณ์๋ช์ ์ง๋ ๊ฒ, ๋จ์ด๋ฅผ ๊ฒ์ํ  ๋ ์ ์ฌํ ๊ฐ๋์ด ํจ๊ป ๋์ค๋๋ก ์ง๋ ๊ฒ ๋ฑ์ ์๊ฐํ์ง ๋ชป ํ๋ ๋ถ๋ถ์ด์๋ค. ๊ธฐ์ต ๋ ๊ธฐ์ต!
- ์ค๋ ์ฝ์ ๋ถ๋ถ์ ๋ง์ง๋ง์ ์ง์ฑ์ ๋๋ ค์ํ์ง ๋ง๊ณ  ๋์๊ฐ๋ผ! ๋ผ๋ ์์ ์ด์ผ๊ธฐ๊ฐ ์์์ง๋ง ๊ธ์.. ์ด ๋ถ๋ถ์ ์กฐ๊ธ ํด์์ ์๋ชปํ  ์ฌ์ง๊ฐ ์์ง ์๋ ์ถ๋ค. ๋ฌผ๋ก  ๋์ ๋๋ฃ๊ฐ ํจ๊ป ์ค๊ณํ๋ ํ๋ก์ ํธ์ ์ฝ๋๋ฅผ ๋ ๋ซ๊ฒ ๊ฐ์ ํ๋ค๋ฉด ๋๋ ๋ฌผ๋ก  ํ์์ด๋ค. ํ์ง๋ง ์ด๋๊น์ง๋ ํ๋ก์ ํธ๋ ํ ๋จ์๋ก ๊ตด๋ฌ๊ฐ๋ค๋ ๊ฑธ ์์ง ๋ง์์ผํ๋ค. ์ด๋๋  ๋ด๊ฐ ์ฌ์ฉํ๋ ๋ณ์๊ฐ ์์๊ฐ์ ๋ค๋ฅธ ๋จ์ด๋ก ๊ต์ฒด๋๊ณ  โ์ ๊ทธ๊ฑฐ ์๋ชป ์ฐ๋ ๊ฒ ๊ฐ์์ ์ ๋ถ ๋ฐ๊ฟจ์ด์^^โ ๊ฐ์ ์์ ๋ต์ ๋ฃ๊ฒ ๋๋ค๋ฉด ๊ต์ฅํ ๋นํฉ์ค๋ฌ์ธ ๊ฒ ๊ฐ๋ค. ์ง์ฑ๊ฐ์๊ฑธ ๋๋ ค์ํ์ง ์๋ ๊ฒ์ ๋ง์ง๋ง ์ค๊ณ์์ ํ๋ ์ฝ์๋ ์ค์ํ๋ค๊ณ  ์๊ฐํ๋ค. ๋ฌผ๋ก  ์ ์๊ฐ ๋งํ๋๊ฑด ์ด๋๊น์ง๋ ์ข์ ์๋ฏธ์ผ ๊ฒ์ด๋ค.
- ๋ญ, ์๋ก ์ผ์ฐ์ผ์ฐํ๊ณ  ์์ฃผ ์ํตํ๋ ์กฐ์ง๋ฌธํ๊ฐ ์๋ค๋ฉด ํ๋ฑ ๋ฌธ์ ๋  ๊ฒ์ด ์๋ค. ๋์ฒด๋ก ๊ทธ๋ฌ์ง ์๊ธฐ ๋๋ฌธ์ ์ฌํผ์ ์ข ๋์ ๊ฑฐ๋ ธ๋ค..

---

<aside>
๐ <b>์ถ๊ฐ๋ก ์๊ฒ ๋ ๊ฒ</b>

</aside>

- ํ๊ฐ๋ฆฌ์ ํ๊ธฐ๋ฒ

๋ณ์ ๋ฐ ํจ์์ ์ธ์ ์ด๋ฆ ์์ ๋ฐ์ดํฐ ํ์์ ๋ช์ํ๋ ์ฝ๋ฉ ๊ท์น. ํ์ฌ๋ ๊ตณ์ด ์ฌ์ฉํ์ง ์์๋ ๋  ์ ๋๋ก ๋๊ตฌ๊ฐ ๋ฐ์ ํ์ ๋ฟ๋๋ฌ ์คํ๋ ค ์ ์ฐํ ํ์ ์ค์ ์ ๋ง๊ณ  ์๋ชป๋ ์ ๋ณด๋ฅผ ์ค ๊ฐ๋ฅ์ฑ์ด ์์ด ์ง์ํ๊ณ  ์๋ค. 

- ์ด๋ฆ ์ ์ง๋ ๋ฒ

[๋ค์ด๋ฐ ๊ด๋ จ ๊ธ ์ ๋ฆฌ](https://sheerheart.tistory.com/entry/%EC%A2%8B%EC%9D%80-%EB%84%A4%EC%9D%B4%EB%B0%8D%EC%9D%84-%EC%9C%84%ED%95%9C-%EC%B0%B8%EA%B3%A0-%EC%9E%90%EB%A3%8C)

---

๐ค์๊ฐ 3์ค ์์ฝ 

- ์ฝ๋ ์ฌ๋์ด ์ฐจ์ด๋ฅผ ์ ์ ์๋๋ก ์ด๋ฆ์ ์ง์ด๋ผ.
- ๋๋ํ ํ๋ก๊ทธ๋๋จธ๊ฐ ์๋ ์ ๋ฌธ์ ์ธ ํ๋ก๊ทธ๋๋จธ๋ฅผ ์งํฅํ์.
- ๊ฐ์ ํ๋ ๋ธ๋ ฅ์ ๋ฉ์ถ์ง ๋ง์.