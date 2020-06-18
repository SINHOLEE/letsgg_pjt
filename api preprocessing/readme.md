# open api 정제

### 장고를 통한디비 새로 구축하는 방법

1. bash를 열어 새로운 가상환경을 만든다.

   ```bash
   $ python -m venv venv 
   // 뒷부분 venv는 가상환경의 이름을 지정하는것으로 아무이름이나 쓰면 된다.
   // 2.xx버전의 파이썬은 venv 모듈이 내장되어있지 않다. 꼭 3버전 이상의 파이썬을 쓰자.
   // 혹시 npm을 사용한다면 파이썬 2 버전이 설치되어있을것이다. 환경변수에서 관리하도록한다.
   ```

2. venv 적용하기

   ```bash
   $ source venv/Script/activate
   ```

3. vscode 기준으로 가상환경이 활성화 되었지만 아마 파이썬 인터프린터를 잡지 못했을 것이다. 이럴땐 `ctrl` + `shift` + `p` => python: select interpreter => python ~~~~~~('venv': venv) 를 선택해서 인터프린터를 적용시킨다.

4.  requirements.txt를 인스톨한다.

   ```bash
   $ pip install -r requirements.txt
   ```

5. settings.py에서 "DATABASES" 설정을 실행하려는 myqsl계정으로 맞춘다.

6. 당신의 mysql에 새로운 스키마 (우리 프로젝트의 경우 g_money)를 생성한다.

   - 만약 새로운 프로젝트를 시작한다고 할때를 가정하면, models.py에 우리가 생성할 테이블 스펙에 맞게 스키마를 짜고,
   - views.py에 비즈니스 로직을 짠뒤 밑에 과정을 계속한다.

7. 마이그레이션을 한다.

   ```bash
   $ python manage.py makemigrations // mysql이 읽을 수 있는 디비 테이블 스키마를 생성
   $ python manage.py migrate // mysql계정에 해당 테이블 스키마 등록
   ```

8. 장고를 실행한다.

   ```bash
   python manage.py runserver
   ```

9. url 창에 `http://127.0.0.1:8000/makedb/`를 입력하면 console 창에서 진행도를 확인할 수 있고, 실시간으로 mysql에 데이터가 쌓이는 것을 볼 수 있다.

10. 참고로 해당 url로 요청을 보낼때, render하는 화면이 없으므로 

    ```
    ValueError at /makedb/
    The view makedb.views.makedb didn't return an HttpResponse object. It returned None instead.
    
    ```

    이런 오류가 뜨는것이 정상이다.