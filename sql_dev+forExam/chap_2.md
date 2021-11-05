## 과목2. SQL 기본 및 활용

### 1. SQL 기본

#### SQL 문장들의 종류

<img src="https://i.imgur.com/gafegFT.jpg">

- 데이터 조작어DML: select, insert, delete, update
- 데이터 정의어DDL: create, alter, drop, rename
- 데이터 제어어DCL: grant, revoke
- 트랜잭션 제어어TCL: commit, rollback

> 비절차적 데이터 조작어: 사용자가 무슨(What) 데이터를 원하는 지만을 명세함.<br>
> 절차적 데이터 조작어: 사용자가 무슨 데이터를 원하는 지에 더해 어떻게(How) 데이터를 접근해야 하는지까지 명세한다. PL/SQL(오라클), T-SQL(SQL Server)등이 있다.

#### sql의 null
> NULL(ASCII00)은 공백(BLANK, ASCII32)이나 숫자 0(ZERO, ASCII48)과는 전혀 다른 값이며, 조건에 맞는 데이터가 없을 때의 공집합과도 다르다. 'NULL'은 `아직 정의되지 않은 미지의 값`이거나 `현재 데이터를 입력하지 못하는 경우`를 의미한다.

#### 제약조건의 종류
- PRIMALY KEY: 기본키. UNIQUE+NOT NULL 속성. 하나만 가능.
- UNIQUE KEY: 고유키. 중복불가.
- NOT NULL: NULL 불가.
- CHECK
- FOREIGN KEY: 외래키. 여러개 가능. NULL 가능.

#### 테이블 생성의 주의사항
- 테이블명은 객체를 의미할 수 있는 적절한 이름을 사용한다. 가능한 단수형을 권고한다.
- 테이블 명은 다른 테이블의 이름과 중복되지 않아야 한다.
- 한 테이블 내에서는 컬럼명이 중복되게 지정될 수 없다.
- 테이블 이름을 지정하고 각 칼럼들은 괄호 "()" 로 묶어 지정한다.
- 각 칼럼들은 콤마 ","로 구분되고, 테이블 생성문의 끝은 항상 세미콜론 ";"으로 끝난다.
- 칼럼에 대해서는 다른 테이블까지 고려하여 데이터베이스 내에서는 일관성 있게 사용하는 것이 좋다.(데이터 표준화 관점)
- 칼럼 뒤에 데이터 유형은 꼭 지정되어야 한다.
- 테이블명과 칼럼명은 반드시 문자로 시작해야 하고, 벤더별로 길이에 대한 한계가 있다.
- 벤더에서 사전에 정의한 예약어(Reserved word)는 쓸 수 없다.
- A-Z, a-z, 0-9, _, $, # 문자만 허용된다.

#### 참조관계 생성시
- Delete(/Modify) Action
    - Cascade: Master 삭제 시 Child 같이 삭제
    - Set NULL: Master 삭제 시 Child 해당 필드 NULL
    - Set Default: Master 삭제 시 Child 해당 필드 Default 값으로 설정
    - Restrict: Child 테이블에 PK 값이 없는 경우만 Master 삭제 허용
    - No Action: 참조무결성을 위반하는 삭제/수정 액션을 취하지 않음

- Insert Action
    - Automatic: Master 테이블에 PK가 없는 경우 Master PK를 생성 후 Child 입력
    - Set Null: Master 테이블에 PK가 없는 경우 Child 외부키를 NULL값으로 처리
    - Set Default: Master 테이블에 PK가 없는 경우 Child 외부키를 지정된 값으로 입력
    - Dependent: Master 테이블에 PK가 존재할 때만 Child 입력 허용
    - No Action: 참조무결성을 위반하는 입력 액션을 취하지 않음

#### 테이블 삭제 명령어

<img src="https://i.imgur.com/sve34O3.jpg">

- DELETE TABLE: 테이블의 데이터만 삭제한다.
- TRUNCATE TABLE: 테이블 자체가 삭제되는 것이 아니고, 해당 테이블에들어있던 모든 행들이 제거되고 저장 공간을 재사용 가능하도록 해제한다.
- DROP TABLE: 테이블 구조(스키마)를 완전히 삭제한다.

#### 트랜잭션의 특성
- 원자성atomicity: 트랜잭션에서 정의된 연산들은 모두 성공적으로 실행되던지 아니면 전혀 실행되지 않은 상태로 남아 있어야 한다. (all or nothing)
- 일관성consistency: 트랜잭션이 실행되기 전의 데이터베이스 내용이 잘못 되어 있지 않다면 트랜잭션이 실행된 이후에도 데이터베이스의 내용에 잘못이 있으면 안 된다.
- 고립성isolation: 트랜잭션이 실행되는 도중에 다른 트랜잭션의 영향을 받아 잘못된 결과를 만들어서는 안 된다.
    - Dirty Reed: 다른 트랜잭션에 의해 수정되었지만 아직 커밋되지 않은 데이터를 읽는 것
    - Non-Repeatable Reed: 한 트랜잭션 내에서 같은 쿼리를 두 번 수행했는데, 그 사이에 다른 트랜잭션이 값을 수정 또는 삭제하는 바람에 두 쿼리 결과가 다르게 나타나는 현상
    - Phantom Reed: 한 트랜잭션 내에서 같은 쿼리를 두 번 수행했는데, 첫번째 쿼리에서 없던 유령 레코드가 두번째 쿼리에서 나타나는 현상
- 지속성durability: 트랜잭션이 성공적으로 수행되면 그 트랜잭션이 갱신한 데이터베이스의 내용은 영구적으로 저장된다.

- 저장점(SAVEPOINT)을 설정하면 전체 작업을 롤백하는 것이 아니라 현 시점에서 SAVEPOINT까지 트랜잭션의 일부만 롤백할 수 있다.
```
[ORACLE]
SAVEPOINT SVPT1;
...
ROLLBACK SVPT1;

[SQL Server]
SAVE TRANSACTION SVTR1;
...
ROLLBACK TRANSACTION SVTR1;
```

#### 연산자의 우선순위
1. 괄호
2. 부정 연산자(not)
3. 비교 연산자(=, >, >=, <, <=)와 SQL 비교 연산자(BETWEEN a AND b, IN list, LIKE, IS NULL)
4. 논리 연산자 중 AND, OR의 순으로 처리

#### NULL의 연산
- NULL 값과의 연산은 NULL 값을 리턴
- NULL 값과의 비교연산은 거짓(false)을 리턴
- 특정 값보다 크다, 적다라고 표현할 수 없음

#### sql 함수
- 내장 함수
  - 단일행 함수
  - 다중행 함수
    - 집계 함수
    - 그룹 함수
    - 윈도우 함수
- 사용자 정의 함수

<img src="https://i.imgur.com/IiCubM2.jpg">
<img src="https://i.imgur.com/1tlIhXh.jpg">

#### DUAL 테이블의 특성
- 사용자 SYS가 소유하며 모든 사용자가 엑세스 가능한 테이블이다.
- 'SELECT ~ FROM ~'의 형식을 갖추기 위한 일종의 DUMMY 테이블이다.
- DUMMY라는 문자열 유형의 칼럼에 'X'라는 값이 들어 있는 행을 1건 포함하고 있다.

#### NULL의 특성
- 널 값은 아직 정의되지 않은 값으로 0 또는 공백과 다르다. 0은 숫자이고, 공백은 하나의 문자이다.
- 테이블을 생성할 때 NOT NULL 또는 PRIMARY KEY로 정의되지 않은 모든 데이터 유형은 널 값을 포함할 수 있다.
- 널 값을 포함하는 연산의 경우 결과 값도 널 값이다. 모르는 데이터에 숫자를 더하거나 빼도 결과는 마찬가지로 모르는 데이터인 것과 같다.
- 결과값을 NULL이 아닌 다른 값을 얻고자 할 때 NVL/ISNULL 함수를 사용한다. NULL 값의 대상이 숫자 유형 데이터인 경우는 주로 0으로, 문자 유형 데이터인 경우는 블랭크보다는 'x' 같이 해당 시스템에서 의미 없는 문자로 바꾸는 경우가 많다.

<img src="https://i.imgur.com/Jjv2ms0.jpg">

#### 0과 null의 연산
- null이 포함된 연산은 모두 null이다. (집계함수는 예외)
- 분모가 0일 경우 연산 자체가 에러를 발생한다.(분자일 경우 0)

<img src="https://i.imgur.com/mDRN6wF.jpg">

#### group by 절과 having 절의 특성
- group by 절을 통해 소그룹별 기준을 정한 후, select 절에 집계 함수를 사용한다.
- 집계함수의 통계 정보는 null 값을 가진 행을 제외하고 수행한다.
- group by 절에서는 select 절과는 달리 alias 명을 사용할 수 없다.
- 집계 함수는 where 절에는 올 수 없다. (집계 함수를 사용할 수 있는 group by 절보다 where 절이 먼저 수행된다)
- where 절은 전체 데이터를 group 으로 나누기 전에 행들을 미리 제거시킨다.
- having 절은 group vy 절의 기준 항목이나 소그룹의 집계 함수를 이용한 조건을 표시할 수 있다.
- group by 절에 의한 소그룹별로 만들어진 집계 데이터 중, having 절에서 제한 조건을 두어 조건을 만족하는 내용만 출력한다.
- having 절은 일반적으로 group by 절 뒤에 위치한다.

#### order by 절 특징
- 기본적인 정렬 순서는 오름차순(asc)이다.
- 숫자형 데이터 타입은 오름차순으로 정렬했을 경우에 가장 작은 값부터 출력된다.
- 날짜형 데이터 타입은 오름차순으로 정렬했을 경우 날짜 값이 가장 빠른 값이 먼저 출력된다.
- Oracle에서는 Null 값을 가장 큰 값으로 간주하여 오름차순으로 정렬했을 경우에는 가장 마지막에, 내림차순으로 정렬했을 경우에는 가장 먼저 위치한다.
- 반면 SQL Server에서는 Null 값을 가장 작은 값으로 간주하여 오름차순으로 정렬했을 경우에는 가장 먼저, 내림차순으로 정렬했을 경우에는 가장 마지막에 위치한다.

#### select 문장 실행순서
> from => where => group by => having => select => order by

#### 기타
- 에제: 상위 3개 출력 단 같은 값일 경우 함께 출력
```sql
select top(2) with ties ename, sal
from emp
order by sal desc;
```

- 두 개 이상의 테이블 들을 연결 또는 결합하여 데이터를 출력하는 것을 join 이라고 하며,
일반적인 경우 행들은 primary key(pk)나 foreign key(fk) 값의 연관에 의해 join이 성립된다.
하지만 어떤 경우에는 이러한 pk, fk 의 관계가 없어도 논리적인 값들의 연관만으로 join이 성립 가능하다.

### 2. SQL 활용

#### 순수 관계 연산자와 SQL 문장 비교
- 순수관계연산자: 관계 데이터 베이스에 적용할 수 있도록 특별히 개발한 관계 연산자.
- 순수관계연산자 종류: Select, Project, Join, Divisin
- SELECT 연산은 WHERE 절로 구현
- PROJECT 연산은 SELECT 절로 구현
- (NATURAL) JOIN 연산은 다양한 JOIN 기능으로 구현
- DIVIDE 연산은 현재 사용되지 않음

#### INNER JOIN
INNER JOIN 은 OUTER JOIN 과 대비하여 내부 JOIN 이라고 하며 JOIN 조건에서 동일한 값이 있는 행만 반환한다.

#### USING JOIN
```sql
select a.col_nm1, b.col_nm2
from table1 a inner join table2 b
using (col_nm)
```
- natural join(from~ where로 묶는)과 함께 사용할 수 없다.(join~using 구문이라서)
- using의 괄호 안에 alias 사용불가.

#### CROSS JOIN
- 테이블 간 JOIN 조건이 없는 경우 생길 수 있는 모든 데이터의 조합을 말한다. 결과는 양쪽 집합의 M*N건의 데이터 조합(카타시안 곱)이 발생한다.

#### OUTER JOIN
- LEFT OUTER JOIN
  - 조인 수행시 먼저 표기된 좌측 테이블에 해당하는 데이터를 먼저 읽은 후, 나중 표기된 우측 테이블에서 JOIN 대상 데이터를 읽어 온다. 즉, Table A와 B가 있을 때 (Table 'A'가 기준), A와 B를 비교해서 B의 JOIN 칼럼에서 같은 값이 있을 때 그 해당 데이터를 가져오고, B의 JOIN 칼럼에서 같은 값이 없는 경우에는 B 테이블에서 가져오는 칼럼들은 NULL 값으로 채운다.

- FULL OUTER JOIN
  - 조인 수행시 좌측, 우측 테이블의 모든 데이터를 읽어 join하여 결과를 생성한다. 즉, table A와 B가 있을 때(table 'A', 'B' 모두 기준이 됨), RIGHT OUTER JOIN 과 LEFT OUTER JOIN 의 결과를 합집합으로 처리한 결과와 동일하다.

#### 집합 연산자의 종류
- `UNION`: 여러 개의 SQL문의 결과에 대한 합집합으로 결과에서 모든 중복된 행은 하나의 행으로 만든다.
- `UNION ALL`: 여러 개의 SQL문의 결과에 대한 합집합으로 중복된 행도 그대로 결과로 표시된다. 즉, 단순히 결과만 합쳐놓은 것이다. 일반적으로 여러 질의 결과가 상호 배타적인Exclusive일 때 많이 사용한다. 개별 SQL문의 결과가 서로 중복되지 않는 경우, UNION과 결과가 동일하다. (결과의 정렬 순서에는 차이가 있을 수 있음)
- `INTERSECT`: 여러 개의 SQL문의 결과에 대한 교집합이다. 중복된 행은 하나의 행으로 만든다.
- `EXCEPT`: 앞의 SQL문의 결과에서 뒤의 SQL문의 결과에 대한 차집합이다. 중복된 행은 하나의 행으로 만든다. (일부 데이터베이스는 MINUS를 사용함)
작성중


### 3. SQL 최적화 기본원리