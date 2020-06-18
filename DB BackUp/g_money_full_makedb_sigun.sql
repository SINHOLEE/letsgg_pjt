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
-- Table structure for table `makedb_sigun`
--

DROP TABLE IF EXISTS `makedb_sigun`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `makedb_sigun` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `do_nm` varchar(255) NOT NULL,
  `sigun_nm` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `makedb_sigun`
--

LOCK TABLES `makedb_sigun` WRITE;
/*!40000 ALTER TABLE `makedb_sigun` DISABLE KEYS */;
INSERT INTO `makedb_sigun` VALUES (1,'경기','가평군'),(2,'경기','여주시'),(3,'서울','영등포구'),(4,'경기','고양시'),(5,'서울','금천구'),(6,'서울','용산구'),(7,'서울','구로구'),(8,'서울','중구'),(9,'서울','은평구'),(10,'경기','과천시'),(11,'경기','안성시'),(12,'경기','광명시'),(13,'경기','광주시'),(14,'경남','양산시'),(15,'광주','동구'),(16,'경기','성남시'),(17,'광주','남구'),(18,'광주','광산구'),(19,'광주','북구'),(20,'경기','안양시'),(21,'서울','강남구'),(22,'경기','의정부시'),(23,'서울','동작구'),(24,'경기','의왕시'),(25,'경기','시흥시'),(26,'경기','구리시'),(27,'서울','중랑구'),(28,'경기','군포시'),(29,'경기','양주시'),(30,'경기','남양주시'),(31,'경기','양평군'),(32,'경기','동두천시'),(33,'경기','부천시'),(34,'서울','노원구'),(35,'인천','미추홀구'),(36,'경기','여주군'),(37,'경기','평택시'),(38,'경기','이천시'),(39,'서울','마포구'),(40,'서울','양천구'),(41,'강원','원주시'),(42,'경기','수원시'),(43,'경기','연천군'),(44,'충북','진천군'),(45,'경기','오산시'),(46,'경기','안산시'),(47,'경기','용인시'),(48,'인천','서구'),(49,'경기','포천시'),(50,'경기','하남시'),(51,'서울','송파구'),(52,'서울','강북구'),(53,'전남','광양시'),(54,'서울','서초구'),(55,'충북','충주시'),(56,'경기','화성시'),(57,'서울','종로구'),(58,'경기','파주시'),(59,'서울','성북구');
/*!40000 ALTER TABLE `makedb_sigun` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-27 15:31:59
