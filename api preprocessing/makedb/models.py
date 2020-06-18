from django.db import models

# Create your models here.
class Sigun(models.Model):
    do_nm = models.CharField(max_length=255)
    sigun_nm = models.CharField(max_length=255)
    

class Category(models.Model):
    cate_big = models.CharField(max_length=255)
    cate_small = models.CharField(max_length=255)


class Merchant(models.Model):
    sigun= models.ForeignKey(Sigun, on_delete=models.CASCADE, related_name='merchants')
    cmpnm_nm = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='merchants' , null=True)
    refine_roadnm_addr = models.CharField(max_length=255, null=True)
    refine_lotno_addr = models.CharField(max_length=255)
    telno = models.CharField(max_length=255, null=True)
    region_mny_nm = models.CharField(max_length=255, null=True)
    brnhstrm_mny_use_posbl_yn = models.CharField(max_length=255, null=True)
    card_mny_use_posbl_yn = models.CharField(max_length=255, null=True)
    mobile_mny_use_posbl_yn = models.CharField(max_length=255, null=True)
    refine_zip_cd = models.CharField(max_length=255, null=True)
    latitude = models.CharField(max_length=255)
    longitude = models.CharField(max_length=255)
    