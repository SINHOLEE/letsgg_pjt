
from django.shortcuts import render
from .models import *
import requests
from pprint import pprint
# Create your views here.
def makedb(request):
            
    cnt = 0
    url = "https://openapi.gg.go.kr/RegionMnyFacltStus?key=4da1bc0d9c3d45f0ac932345ff4d93ec&Type=json&pIndex="
    page = 1
    data = requests.get(url+str(page))
    sigun_dic = {}
    sigun_dic_cnt = 1
    cate_dic = {}
    cate_dic[("", "")] = 0
    cate_dic_cnt = 1
    
    # cate and region data parsing
    # while page <= 5729:
    while page <= 100:
        data = requests.get(url+str(page))
        page+= 1
        response = data.json().get('RegionMnyFacltStus')[1]
        objs = response.get("row")
        for obj in objs:
            REFINE_LOTNO_ADDR = obj.get("REFINE_LOTNO_ADDR")
            REFINE_WGS84_LAT = obj.get("REFINE_WGS84_LAT")
            REFINE_WGS84_LOGT = obj.get("REFINE_WGS84_LOGT")


            # 주소가...없으면... 어쩌자는거야;ㅋㅋㅋ
            # 주소 없으면 안받음
            if REFINE_LOTNO_ADDR is None:
                continue
            # 좌표 없으면 일단 안받음
            if REFINE_WGS84_LOGT is None:
                continue
            if REFINE_WGS84_LAT is None:
                continue
            # 지역
            # pprint(obj)
            address = REFINE_LOTNO_ADDR.split(" ")
            if len(address) < 2:
                continue
            do = address[0]
            si = address[1]


            # 지역이 있으면 디비에 저장 ㄴㄴ
            if (do, si) not in sigun_dic.keys():
                sigun_dic[(do, si)] = sigun_dic_cnt
                sigun_dic_cnt += 1  # pk 값
                sigun = Sigun()
                sigun.do_nm = do
                sigun.sigun_nm = si
                sigun.save()
                # print(do, si)
            sigun = Sigun.objects.get(pk=sigun_dic[(do, si)])
            cate_big = ""
            cate_small = ""
            INDUTYPE_NM = obj.get("INDUTYPE_NM")
            if INDUTYPE_NM is not None:  # cate는 nullable하니까 
                INDUTYPE_NM = INDUTYPE_NM.replace(" ","").split("-")
                # 대분류 소분류로 안나뉨 버리자
                if len(INDUTYPE_NM) == 2:
                    cate_big = INDUTYPE_NM[0]
                    cate_small = INDUTYPE_NM[1]
                    # 카테고리
                    if (cate_big, cate_small) not in cate_dic.keys():
                        category = Category() # 객체생성
                        cate_dic[(cate_big, cate_small)] = cate_dic_cnt
                        cate_dic_cnt+=1
                        category.cate_big = cate_big
                        category.cate_small = cate_small
                        # print(cate_big, cate_small)
                        category.save()
            '''
            sigun= models.ForeignKey(Sigun, on_delete=models.CASCADE, related_name='merchants')
            cmpnm_nm = models.CharField(max_length=255)
            category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='merchants' , null=True)
            refine_roadnm_addr = models.CharField(max_length=255)
            refine_lotno_addr = models.CharField(max_length=255)
            telno = models.CharField(max_length=255, null=True)
            region_mny_nm = models.CharField(max_length=255, null=True)
            brnhstrm_mny_use_posbl_yn = models.CharField(max_length=255, null=True)
            card_mny_use_posbl_yn = models.CharField(max_length=255, null=True)
            mobile_mny_use_posbl_yn = models.CharField(max_length=255, null=True)
            refine_zip_cd = models.CharField(max_length=255)
            latitude = models.CharField(max_length=255)
            longitude = models.CharField(max_length=255)
            '''
            merchant = Merchant()
            merchant.sigun = sigun
            CMPNM_NM = obj.get("CMPNM_NM")
            if CMPNM_NM is None:
                continue
            merchant.cmpnm_nm = CMPNM_NM
            if cate_dic[(cate_big, cate_small)] != 0:
                merchant.category_id = cate_dic[(cate_big, cate_small)]
            merchant.refine_roadnm_addr = REFINE_LOTNO_ADDR
            REFINE_ROADNM_ADDR = obj.get("REFINE_ROADNM_ADDR")
            if REFINE_ROADNM_ADDR is not None:
                merchant.refine_roadnm_addr = REFINE_ROADNM_ADDR
            TELNO = obj.get("TELNO")
            if TELNO is not None:
                merchant.telno = TELNO
            # 다 널이므로.... 그냥 경기 , 무슨 시 에서 시를 가져오자.
            merchant.region_mny_nm = si
            
            BRNHSTRM_MNY_USE_POSBL_YN = obj.get("BRNHSTRM_MNY_USE_POSBL_YN")
            if BRNHSTRM_MNY_USE_POSBL_YN is not None:
                merchant.brnhstrm_mny_use_posbl_yn = BRNHSTRM_MNY_USE_POSBL_YN
            
            CARD_MNY_USE_POSBL_YN = obj.get("CARD_MNY_USE_POSBL_YN")
            if CARD_MNY_USE_POSBL_YN is not None:
                merchant.card_mny_use_posbl_yn = CARD_MNY_USE_POSBL_YN
            
            MOBILE_MNY_USE_POSBL_YN = obj.get("MOBILE_MNY_USE_POSBL_YN")
            if MOBILE_MNY_USE_POSBL_YN is not None:
                merchant.mobile_mny_use_posbl_yn = MOBILE_MNY_USE_POSBL_YN
            
            REFINE_ZIP_CD = obj.get("REFINE_ZIP_CD")
            if REFINE_ZIP_CD is not None:
                merchant.refine_zip_cd = REFINE_ZIP_CD
            
            REFINE_WGS84_LOGT = obj.get("REFINE_WGS84_LOGT")
            if REFINE_WGS84_LOGT is None:
                continue
            merchant.longitude = REFINE_WGS84_LOGT
            REFINE_WGS84_LAT = obj.get("REFINE_WGS84_LAT")
            if REFINE_WGS84_LAT is None:
                continue
            merchant.latitude = REFINE_WGS84_LAT

            merchant.save()
            
            
            REGION_MNY_NM = obj.get("REGION_MNY_NM")
            if REGION_MNY_NM is not None:
                print(REGION_MNY_NM)
            cnt+=1


        # print('page : %s,  %0.2f 퍼센트까지 진행 중...' % (page, (page / 5730 * 100)))
        print('page : %s,  %0.2f 퍼센트까지 진행 중...' % (page, (page / 101 * 100)))

    return None


