CREATE DATABASE  IF NOT EXISTS `g_money_full` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `g_money_full`;
-- MySQL dump 10.13  Distrib 8.0.18, for macos10.14 (x86_64)
--
-- Host: 15.165.75.235    Database: g_money_full
-- ------------------------------------------------------
-- Server version	5.7.30-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `makedb_category`
--

DROP TABLE IF EXISTS `makedb_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `makedb_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cate_big` varchar(255) NOT NULL,
  `cate_small` varchar(255) NOT NULL,
  `mapper` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=250 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `makedb_category`
--

LOCK TABLES `makedb_category` WRITE;
/*!40000 ALTER TABLE `makedb_category` DISABLE KEYS */;
INSERT INTO `makedb_category` VALUES (1,'숙박업','여관/기타숙박업','레저업소'),(2,'일반휴게음식','일반한식','음식점'),(3,'회원제형태','레져업소','기타'),(4,'레저업소','기타레져업소','레저업소'),(5,'음료식품','기타음료식품','음식점'),(6,'학원','기타 교육기관','학원'),(7,'일반휴게음식','주점','음식점'),(8,'여행','관광여행','레저업소'),(9,'레져용품','스포츠•레져용품','레저업소'),(10,'기타','기계공구','기타'),(11,'용역 서비스','사무서비스','기타'),(12,'신변잡화','기타잡화','기타'),(13,'자동차정비 유지','주차장','기타'),(14,'숙박업','콘도','레저업소'),(15,'건축자재','인테리어전문','기타'),(16,'레저업소','골프경기장','레저업소'),(17,'유통업 영리','슈퍼마켓','편의점/마트'),(18,'학원','보습학원','학원'),(19,'연료판매점','SK주유소','주유소'),(20,'주방용구','주방용구','기타'),(21,'음료식품','정육점','음식점'),(22,'용역 서비스','종합용역','기타'),(23,'의류','정장','기타'),(24,'여행','렌터카','레저업소'),(25,'용역 서비스','기타용역서비스','기타'),(26,'용역 서비스','부동산 중개•임대','기타'),(27,'자동차판매','중고자동차판매','기타'),(28,'건축자재','목재•석재•철물','기타'),(29,'연료판매점','LPG 취급점','주유소'),(30,'유통업 영리','기타유통업','편의점/마트'),(31,'일반휴게음식','서양음식','음식점'),(32,'보건위생','의료용품','보건위생'),(33,'회원제형태','기타4','기타'),(34,'자동차판매','이륜차판매','기타'),(35,'수리서비스','세탁소','기타'),(36,'음료식품','농•축•수산품','음식점'),(37,'보건위생','미용원','보건위생'),(38,'레저업소','당 구 장','레저업소'),(39,'일반휴게음식','스넥','음식점'),(40,'레저업소','헬스클럽','레저업소'),(41,'서적문구','일반서적','기타'),(42,'유통업 영리','편 의 점','편의점/마트'),(43,'사무통신','컴퓨터','기타'),(44,'건강식품','기타건강식품','기타'),(45,'보건위생','화장품','보건위생'),(46,'문화.취미','민예•공예품','학원'),(47,'문화.취미','애완동물','학원'),(48,'회원제형태','학원','기타'),(49,'자동차정비 유지','자동차정비','기타'),(50,'문화.취미','화원','학원'),(51,'문화.취미','화랑','학원'),(52,'농업','비료,사료,종자','기타'),(53,'건축자재','조명기구','기타'),(54,'전기제품','냉열기기','기타'),(55,'문화.취미','티켓','학원'),(56,'레저업소','노 래 방','레저업소'),(57,'연료판매점','쌍용S-OIL','주유소'),(58,'의원','치과의원','병원'),(59,'레저업소','골프연습장','레저업소'),(60,'연료판매점','기타연료','주유소'),(61,'연료판매점','현대정유(오일뱅크)','주유소'),(62,'건축자재','기타건축자재','기타'),(63,'학원','초중고교육기관','학원'),(64,'음료식품','미곡상','음식점'),(65,'학원','외국어학원','학원'),(66,'기타','비영리/대상','기타'),(67,'유통업 비영리','농,축협 직영매장','기타'),(68,'농업','농기계','기타'),(69,'기타의료기관','기타의료기관 및 기타의료기기','기타의료기관'),(70,'용역 서비스','조세서비스','기타'),(71,'유통업 비영리','구내매점(국가기관 등)','기타'),(72,'보건위생','기타대인서비스','보건위생'),(73,'레저업소','볼 링 장','레저업소'),(74,'학원','유치원','학원'),(75,'의원','의원','병원'),(76,'병원','병원','병원'),(77,'학원','예•체능계학원 ','학원'),(78,'전기제품','가전제품','기타'),(79,'용역 서비스','가례서비스업','기타'),(80,'약국','약국','보건위생'),(81,'자동차정비 유지','자동차부품','기타'),(82,'음료식품','제과점','음식점'),(83,'회원제형태','기타1','기타'),(84,'기타','기타 전문점','기타'),(85,'사무통신','사무용 OA기기','기타'),(86,'직물','카페트,커튼,천막,지물','기타'),(87,'서적문구','출판 및 인쇄물','기타'),(88,'음료식품','주류 판매점','음식점'),(89,'의원','한의원','병원'),(90,'일반휴게음식','중국식','음식점'),(91,'수리서비스','신변잡화수리','기타'),(92,'의류','기타의류','기타'),(93,'기타의료기관','산후조리원','기타의료기관'),(94,'주방용구','주방용식기','기타'),(95,'레저업소','스크린골프','레저업소'),(96,'보건위생','피부미용실','보건위생'),(97,'자동차정비 유지','카인테리어','기타'),(98,'기타','비영리/비대상','기타'),(99,'문화.취미','화방•표구점','학원'),(100,'자동차정비 유지','세차장','기타'),(101,'자동차정비 유지','자동차시트•타이어','기타'),(102,'의류','내의판매','기타'),(103,'건축자재','부동산 분양','기타'),(104,'전기제품','기타전기제품','기타'),(105,'건축자재','유리','기타'),(106,'직물','침구•수예점','기타'),(107,'문화.취미','문화취미기타','학원'),(108,'신변잡화','액세서리','기타'),(109,'보건위생','이용원','보건위생'),(110,'용역 서비스','법률회계서비스(개인)','기타'),(111,'신변잡화','가방','기타'),(112,'수리서비스','기타수리서비스','기타'),(113,'건축자재','보일러•펌프•샷시','기타'),(114,'의류','맞춤복점','기타'),(115,'보건위생','미용재료','보건위생'),(116,'건축자재','페인트','기타'),(117,'사무통신','통신기기','기타'),(118,'가구','일반가구','기타'),(119,'용역 서비스','소프트웨어','기타'),(120,'가구','기타가구','기타'),(121,'신변잡화','신발','기타'),(122,'연료판매점','주유소','주유소'),(123,'의류','단체복','기타'),(124,'연료판매점','유류판매','주유소'),(125,'학원','독서실','학원'),(126,'보건위생','사우나','보건위생'),(127,'자동차정비 유지','가타자동차서비스','기타'),(128,'신변잡화','시계','기타'),(129,'문화.취미','수족관','학원'),(130,'건강식품','인삼제품','기타'),(131,'의류','스포츠의류','기타'),(132,'레져용품','골프용품 전문점','레저업소'),(133,'학원','기능학원','학원'),(134,'일반휴게음식','일식•회집','음식점'),(135,'서적문구','문구용품','기타'),(136,'문화.취미','영화관','학원'),(137,'신변잡화','기념품점','기타'),(138,'신변잡화','귀금속','기타'),(139,'용역 서비스','법률회계서비스(법인)','기타'),(140,'연료판매점','GS주유소','주유소'),(141,'광학제품','사진관','기타'),(142,'보건위생','안경','보건위생'),(143,'자동차정비 유지','윤활유 전문 판매','기타'),(144,'사무통신','기타 사무용품','기타'),(145,'기타의료기관','동물병원','기타의료기관'),(146,'수리서비스','사무•통신기기수리','기타'),(147,'학원','학습지 교육','학원'),(148,'의류','아동의류','기타'),(149,'약국','한약방','보건위생'),(150,'레져용품','악기점','레저업소'),(151,'건강식품','홍삼제품','기타'),(152,'서적문구','기타서적문구','기타'),(153,'직물','옷감•직물','기타'),(154,'농업','기타농업관련','기타'),(155,'레저업소','종합레져타운','레저업소'),(156,'연료판매점','SK가스충전소','주유소'),(157,'수리서비스','레져용품수리','기타'),(158,'여행','여객선','레저업소'),(159,'서적문구','과학기자재','기타'),(160,'자동차정비 유지','견인서비스','기타'),(161,'용역 서비스','혼례서비스','기타'),(162,'건축자재','건축용 요업제품','기타'),(163,'일반휴게음식','위탁급식업','음식점'),(164,'수리서비스','가정용품수리','기타'),(165,'회원제형태','기타3','기타'),(166,'서적문구','완구점','기타'),(167,'광학제품','카메라','기타'),(168,'약국','제약회사','보건위생'),(169,'서적문구','정기간행물','기타'),(170,'별도관리','자체물품대금','기타'),(171,'레저업소','테니스장','레저업소'),(172,'회원제형태','서적','기타'),(173,'용역 서비스','보관및 창고업','기타'),(174,'유통업 영리','인터넷P/G','편의점/마트'),(175,'사무통신','통신기기(무이자할부)','기타'),(176,'주방용구','정수기','기타'),(177,'주방용구','기타주방용구','기타'),(178,'회원제형태','사무서비스','기타'),(179,'자동차판매','수입자동차','기타'),(180,'레저업소','수 영 장','레저업소'),(181,'회원제형태','건강식품','기타'),(182,'레져용품','음반/영상물','레저업소'),(183,'용역 서비스','화물운송','기타'),(184,'학원','컴퓨터학원','학원'),(185,'회원제형태','기타2','기타'),(186,'자동차판매','기타운송','기타'),(187,'서적문구','전문서적','기타'),(188,'학원','유학원','학원'),(189,'서적문구','교육용테이프판매','기타'),(190,'유통업 영리','인터넷 Mall','편의점/마트'),(191,'가구','철제가구','기타'),(192,'여행','기타교통수단','레저업소'),(193,'직물','기타직물','기타'),(194,'레져용품','피아노대리점','레저업소'),(195,'유통업 영리','연 쇄 점','편의점/마트'),(196,'광학제품','기타광학제품','기타'),(197,'레져용품','총포류판매점','레저업소'),(198,'자동차판매','국산신차판매','기타'),(199,'일반휴게음식','칵테일바','음식점'),(200,'일반휴게음식','한정식','음식점'),(201,'의류','와이셔츠•타이','기타'),(202,'용역 서비스','정보서비스','기타'),(203,'신변잡화','제화','기타'),(204,'병원','종합병원','병원'),(205,'사무통신','전자(상우회)','기타'),(206,'보험','손해보험','기타'),(207,'자동차정비 유지','중장비수리','기타'),(208,'유통업 영리','복지매장','편의점/마트'),(209,'보건위생','안마시술소','보건위생'),(210,'일반휴게음식','갈비전문점','음식점'),(211,'병원','치과병원','병원'),(212,'회원제형태','자동차서비스','기타'),(213,'유통업 비영리','공무원 연금 매점','기타'),(214,'여행','고속버스','레저업소'),(215,'숙박업','2급 호텔','레저업소'),(216,'용역 서비스','공공요금대행서비스/소득공제비대상','기타'),(217,'의류','캐주얼의류','기타'),(218,'유통업 영리','대형할인점','편의점/마트'),(219,'연료판매점','E1가스충전소','주유소'),(220,'연료판매점','GS 가스충전소','주유소'),(221,'연료판매점','쌍용S-OIL 가스충전소','주유소'),(222,'학원','대학등록금','학원'),(223,'직물','혼수전문점','기타'),(224,'병원','한방병원','병원'),(225,'유통업 비영리','농협하나로클럽','기타'),(226,'연료판매점','현대정유 가스충전소','주유소'),(227,'의류','양품점','기타'),(228,'학원','유아원','학원'),(229,'별도관리','일반(통신판매)','기타'),(230,'여행','택시','레저업소'),(231,'문화.취미','골동품점','학원'),(232,'유통업 영리','상품권','편의점/마트'),(233,'유통업 영리','통신판매업2','편의점/마트'),(234,'숙박업','1급 호텔','레저업소'),(235,'유통업 영리','농축수산 가공품','편의점/마트'),(236,'여행','택시회사','레저업소'),(237,'보험','기타보험','기타'),(238,'기타의료기관','조산원','기타의료기관'),(239,'연료판매점','전기차충전소','주유소'),(240,'자동차정비 유지','국산신차 직영부품•정비업소','기타'),(241,'용역 서비스','이동통신요금','기타'),(242,'기타의료기관','건강진단','기타의료기관'),(243,'용역 서비스','CATV','기타'),(244,'유통업 비영리','기타비영리유통','기타'),(245,'용역 서비스','통신서비스/소득공제대상','기타'),(246,'유통업 영리','CATV홈쇼핑','편의점/마트'),(247,'유통업 영리','통신판매업1','편의점/마트'),(248,'용역 서비스','공공요금대행서비스/소득공제대상','기타'),(249,'신변잡화','성인용품점','기타');
/*!40000 ALTER TABLE `makedb_category` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-27 15:32:12
