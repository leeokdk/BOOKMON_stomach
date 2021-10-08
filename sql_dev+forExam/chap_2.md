## 과목2. SQL 기본 및 활용

### 1. SQL 기본

#### SQL 문장들의 종류
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

### 2. SQL 활용

### 3. SQL 최적화 기본원리