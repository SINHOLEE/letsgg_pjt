# 💰 Welcome to Lets 경기 💰

 - 모바일에서 실행


<div style=margin:0 auto;"><img src="./images/치킨.gif" width="30%" height="30%" ><img src="./images/병원.gif" width="30%" height="30%"></div>



 - 웹에서 실행
<center><img src="https://user-images.githubusercontent.com/17565204/84105458-5bf4d180-aa53-11ea-99f6-14b84d0c8533.gif" width="550" height="290"></center>
<center><img src="https://user-images.githubusercontent.com/17565204/84105813-6a8fb880-aa54-11ea-8d54-8e64b5dd01da.gif" width="550" height="290"></center>






---

# ✨ 프로젝트 개요

> 코로나19의 여파로 지역경제가 무너지는 것을 막기 위해 경기도에서 모든 도민에게 지역화폐를 제공하는 복치정책을 펼쳤습니다. 
뿐만 아니라 정부에서 발행한 긴급재난지원금또한 지역화폐로 발급받는 경우가 있어 지역화폐 가맹점 정보에 대한 수요가 커지고 있습니다.
현재 경기도민 인구수만 1,353만 명이고 지역별 지원금액은 상이하지만 인당 평균 15~ 40만 원 까지 지원받고, 추가고 긴급재난 지원금까지 받으므로 
어림계산하여 인당 50만 원을 받는다고 가정했을 때,  1,353만 명 * 50만원 = 약 6조7천억 원 정도의 소비를 강제할 수 있습니다.
하지만 이러한 규모의 금전적 지원에 반하여 해당 화폐를 어디서 쓸 수 있는지에 대한 정보의 접근성은 매우 낮습니다. 
이러한 접근성을 증진시켜 사용자 편의를 도모한 웹/앱 서비스를 기획합니다.

---

# 🗺️ 서비스 소개

 - 경기 지역 화폐 가맹점 정보를 제공하는 서비스입니다.

---

# 👍 서비스 기능

 - 😃 사용자는 다음 기능들을 이용할 수 있습니다. 😃
    - 가맹점 이름으로 검색할 수 있습니다.
    - 가맹점 분류로 검색할 수 있습니다.
    - 현재 위치 기반으로 검색할 수 있습니다.
    - 가맹점 전화번호, 주소를 제공합니다.
    - 전화 걸기 기능을 제공합니다.

---

# 🎆 프로젝트 아키텍쳐

<center><img src="https://user-images.githubusercontent.com/17565204/83996759-d19b6780-a997-11ea-8c93-cbcbef389649.PNG" width="900" height="500"></center>


---

# 📌  컨밴션


## Jira Naming Convention

- **[Front-end] or [Back-end] 앞에 쓰기**
- **에픽을 계층적으로 생성해서 할당하기**
- 예시
  - 에픽네이밍 :` [Front-End][Css관리]`
  - 작업네이밍 : `[Front-End][React Component]지도`



## Branch Naming Convention

- 스네이크 케이스를 기반으로한다.
- 백앤드 or 프론트 앤드 / 피처 / 기능의 규칙으로 생성한다.
- 예시
  - `front_end/feature/map_component`
  - `back_end/feature/user_api`



## Git Commit Naming Convention

- 다음과 같은 prefix를 붙이고 뒤에 추가 설명을 쓴다.
- prefix
  - feat : 새로운 기능 추가
  - fix : 버그 수정docs : 
  - 문서 수정
  - style : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
  - refactor : 코드 리펙토링
  - test : 테스트 코드, 리펙토링 테스트 코드 추가
  - chore : 빌드 업무 수정, 패키지 매니저 수정
- 예시
  - `refactor: ui 개선`
  - `style: 지도 컴포넌트 css 작업`
  - `feat : 회원가입 폼 추가`

---

# 📓 레퍼런스

## 경기 지역화폐 open api

🔗 https://data.gg.go.kr/portal/data/service/selectServicePage.do?page=1&rows=10&sortColumn=&sortDirection=&infId=3NPA52LBMO36CQEQ1GMY28894927&infSeq=3&order=

## Kakao Maps API

🔗 https://apis.map.kakao.com

---

# 👨‍👦‍👦 팀 소개

🤴 **박정환(팀장, 프로젝트 매니저)**

👮 **임학수(팀원, 프론트 엔드 담당)**

👷  **이신호(팀원, 프론트엔드 담당)**

🤵 **이호준(팀원, 백엔드 담당)**

🕵 **김병인(팀원, 백엔드 담당)**

---

# 🔨 빌드 방법

    $ git clone https://lab.ssafy.com/s02-final/s02p31a101.git

## Front-end

####  Install

- npm

```sh
$ npm install
```

- yarn

```bash
$ yarn install
```



#### Usage

- npm

```sh
$ npm run start
```

- yarn

```sh
$ yarn start
```



## Back-end

### Build

- Project root - Maven - Update maven
- Run as - Maven clean
- Run as - Maven build

### Usage

- Run as - spring boot app

---

# 💻 개발 환경

## Front-end

- yarn 1.22.4
- visual studio code
- Chrorme‎ 79.0.3945.130 

## Back-end

- sts-4.6.1.RELEASE
- MySQL Workbench 8.0 CE
- Swagger2

## Proxy Server

- Nginx 1.14

## Database

- mysql 5.7.30-0ubuntu0.18.04.1

---

# 📁 개발 언어 및 라이브러리

## Front-end
- react 16.13.1
- babel 7.8.3
- material-ui 4.9.14
- typescript
- clipboard 2.0.6
- cross-env 7.0.2
- mobx 5.15.4
- mobx-react 6.2.2
- node-sass 4.14.1
- react 16.13.1
- react-cookie 4.0.3
- react-dom 16.13.1
- react-ga 2.7.0
- react-router-dom 5.2.0

## Back-end
- java 1.8
- spring-boot-starter 2.1.14
- lombok-1.18.12
- spring-data-jpa-2.1.17
- slf4j-api-1.7.30

---

# 📝 License

Copyright © 2019 [Franck Abgrall](https://github.com/kefranabg).
This project is [MIT](https://github.com/kefranabg/readme-md-generator/blob/master/LICENSE) licensed.
