-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: animalpark_db
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.27-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `adresses`
--

DROP TABLE IF EXISTS `adresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adresses` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `address` varchar(100) DEFAULT NULL,
  `postal_code` varchar(50) DEFAULT NULL,
  `province` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `user_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  KEY `adresses_ibfk_1` (`user_id`),
  CONSTRAINT `adresses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adresses`
--

LOCK TABLES `adresses` WRITE;
/*!40000 ALTER TABLE `adresses` DISABLE KEYS */;
/*!40000 ALTER TABLE `adresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brands` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `brand` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (8,'Vital Can'),(9,'Purina'),(10,'Royal Canin'),(11,'Sin marca'),(12,'Mon Ami'),(13,'Osspret'),(14,'Pedigree'),(15,'Whiskas');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` int(11) unsigned NOT NULL,
  `product_id` int(11) unsigned NOT NULL,
  `cantidad` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cart_FK` (`order_id`),
  KEY `cart_FK_1` (`product_id`),
  CONSTRAINT `cart_FK` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cart_FK_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Alimentos'),(2,'Accesorios'),(3,'Juguetes'),(4,'Vestimenta'),(5,'Higiene/Prevencion'),(6,'Camas/Cuchas');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `total_price` double(7,2) DEFAULT NULL,
  `total_item` int(11) DEFAULT NULL,
  `active` tinyint(3) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `orders_FK` (`user_id`),
  CONSTRAINT `orders_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pets`
--

DROP TABLE IF EXISTS `pets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pets` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `pet` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pets`
--

LOCK TABLES `pets` WRITE;
/*!40000 ALTER TABLE `pets` DISABLE KEYS */;
INSERT INTO `pets` VALUES (1,'Perros'),(2,'Gatos'),(3,'Roedores'),(4,'Peces'),(5,'Reptiles'),(6,'Aves');
/*!40000 ALTER TABLE `pets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_images` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `image` varchar(100) NOT NULL,
  `product_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_images_FK` (`product_id`),
  CONSTRAINT `product_images_FK` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=124 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
INSERT INTO `product_images` VALUES (46,'1686796107283_products_.png',39),(47,'1686796107285_products_.png',39),(48,'1686796107291_products_.png',39),(49,'1686796345619_products_.png',40),(50,'1686796471970_products_.png',41),(51,'1686796471972_products_.png',41),(52,'1686796669115_products_.png',42),(53,'1686796669117_products_.png',42),(55,'1686796826474_products_.png',44),(56,'1686797270521_products_.png',45),(57,'1686797270543_products_.png',45),(58,'1686797400355_products_.png',46),(59,'1686797505258_products_.png',47),(61,'1686797620662_products_.png',49),(62,'1686797716106_products_.png',50),(63,'1686798255470_products_.png',51),(64,'1686798255515_products_.png',51),(65,'1686798394258_products_.png',52),(66,'1686798394261_products_.png',52),(67,'1686798546408_products_.png',53),(68,'1686798546411_products_.png',53),(69,'1686798630167_products_.png',54),(70,'1686798696366_products_.png',55),(71,'1686798794538_products_.png',56),(72,'1686798794540_products_.png',56),(73,'1686798794548_products_.png',56),(74,'1686798794549_products_.png',56),(75,'1686798864273_products_.png',57),(76,'1686798930098_products_.png',58),(77,'1686798980785_products_.png',59),(78,'1686799065300_products_.png',60),(79,'1686799139976_products_.png',61),(80,'1686799224671_products_.png',62),(81,'1686799311529_products_.png',63),(82,'1686799311532_products_.png',63),(83,'1686799385150_products_.png',64),(84,'1686799385151_products_.png',64),(85,'1686799466202_products_.png',65),(86,'1686799466203_products_.png',65),(87,'1686799602463_products_.png',66),(88,'1686799689933_products_.png',67),(89,'1686799689938_products_.png',67),(90,'1686799743275_products_.png',68),(91,'1686799743277_products_.png',68),(92,'1686799879055_products_.png',69),(94,'1676165325047_products_.png',75),(95,'1676164813110_products_.png',73),(96,'1676165016569_products_.png',74),(97,'1676166482766_products_.png',79),(98,'1676166281180_products_.PNG',77),(99,'1676166390464_products_.png',78),(100,'1676165429489_products_.png',80),(101,'1676165377177_products_.png',76),(102,'1676166605412_products_.png',81),(103,'1676166732128_products_.webp',82),(104,'1676166988307_products_.jpg',83),(105,'1676168189895_products_.webp',84),(106,'1676923640818_products_.png',86),(107,'1676239983247_products_.jfif',85),(108,'1676933887692_products_.png',87),(109,'1677013187826_products_.jpg',88),(110,'default.jpg',91),(111,'1676934665503_products_.png',89),(112,'1676934573105_products_.webp',90),(113,'1678135385598_products_.jpg',92),(114,'1678300734493_products_.jpg',93),(115,'1678300734517_products_.jpg',93),(116,'1678300734550_products_.jpg',93),(117,'default.jpg',95),(118,'default.jpg',97),(119,'default.jpg',94),(120,'default.jpg',96),(121,'default.jpg',98),(122,'default.jpg',100),(123,'default.jpg',99);
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(350) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `price` decimal(7,2) unsigned NOT NULL,
  `discount` tinyint(3) unsigned DEFAULT 0,
  `weight` decimal(4,1) unsigned DEFAULT 0.0,
  `category_id` int(11) unsigned DEFAULT NULL,
  `pet_id` int(11) unsigned DEFAULT NULL,
  `active` tinyint(1) unsigned NOT NULL DEFAULT 0,
  `brand_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `products_FK` (`pet_id`),
  KEY `products_FK_1` (`category_id`),
  KEY `products_FK_2` (`brand_id`),
  CONSTRAINT `products_FK` FOREIGN KEY (`pet_id`) REFERENCES `pets` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `products_FK_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_FK_2` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (39,'Vital Can Complete Senior','Una dieta pensada para una vida plena. Contribuye con la protección cardíaca, renal y articular y aporta un complejo antiage.\r\n\r\nIndicado para perros mayores a 7 años de razas medianas y grandes',13470.00,15,20.0,1,1,1,8,'2023-06-15 02:28:27','2023-06-15 02:29:52'),(40,'Vital Can Premium Adulto','Durante la vida adulta del perro cambian sus requerimientos y necesidades nutricionales. Premium Perro Adulto aporta niveles de energía adecuados para esta etapa, colabora con una piel sana, un pelo brilloso y además brinda ingredientes de gran digestibilidad.',12050.00,0,20.0,1,1,1,8,'2023-06-15 02:32:25','2023-06-15 02:32:25'),(41,'Vital Can Balanced Adulto','Programa Equilibrio Saludable. Indicado para perros adultos de raza mediana de 12 meses hasta 7 años.',17560.00,0,20.0,1,1,1,8,'2023-06-15 02:34:31','2023-06-15 02:34:31'),(42,'Purina Excellent Adulto','Los perros adultos tienen diferentes necesidades nutricionales que los cachorros o los perros maduros. PURINA Excellent Maintenance Adulto ofrece una fórmula completa que incluye tocoferoles mezclados fuente de vitamina E, y sin colorantes ni saborizantes artiﬁciales aportando un óptimo balance nutricional y un sabor irresistible.',18370.00,0,20.0,1,1,1,9,'2023-06-15 02:37:49','2023-06-15 02:37:49'),(44,'Royal Canin Performance','El Alimento Club Performance Perro Adulto está diseñado para cubrir todas las necesidades nutricionales de los perros adultos de más de 12 meses de edad. Está enriquecido con vitaminas para asegurar una dieta balanceada que llene a tu mascota de energía y vitalidad.',23360.00,0,20.0,1,1,1,10,'2023-06-15 02:40:26','2023-06-15 02:40:26'),(45,'Mon Ami Dental Clean','¿Sabés lo importante que es la salud dental de tu perro? ¿Le das el cuidado que requiere? La higiene dental ayuda a prevenir enfermedades y mejora el aliento de tu mascota. Como sabemos lo tedioso que es realizar cotidianamente la limpieza dental de tu perro, desarrollamos Mon Ami Dental, una solución para este problema. El uso diario y continuado ',310.00,0,0.0,5,1,1,12,'2023-06-15 02:47:50','2023-06-15 02:47:50'),(46,'Osspret Shampoo','Shampoo para cachorros, Pulguicida, Garrapaticida con glicerina.\r\nCachorros mayores de 2 meses y adultos cuya dermatitis alérgica por pulgas puedan conducir a dematosis descamativas. Humectante. Garrapaticida. Dejar actuar 10 a 15 minutos. No usar en felinos. Diluir 1 en 5 de agua en el momento de uso. Enjuagar bien. Componentes: Base de lavado sua',2170.00,0,0.0,5,1,1,13,'2023-06-15 02:50:00','2023-06-15 02:50:00'),(47,'Guante Peine Sacapelo','Cepilla el pelo de tu mascota mientras la acaricias.\r\nTiene puntas de goma especialmente suaves, libera el pelo muerto y la suciedad.\r\nAporta al pelaje un brillo sedoso, masajea la piel y estimula el riego sanguíneo, para todos los tipos de pelaje.\r\nAdecuada para pieles sensibles y mascotas jóvenes.',2390.00,0,0.0,5,1,1,11,'2023-06-15 02:51:45','2023-06-15 02:51:45'),(49,'Alicate 12cm x 5cm','Las uñas de los cachorros se desgastan naturalmente cuando caminan por superficies duras, pero si crecen demasiado, es posible que tengas que cortarlas. Los espolones deben cortarse con cuidado, para evitar lastimar los vasos sanguíneos que existen en las uñas del cachorro\r\n\r\nCon filos curvos que permite cortar las uñas de forma rápida y pareja\r\nPa',1840.00,0,0.0,5,1,1,11,'2023-06-15 02:53:40','2023-06-15 02:53:40'),(50,'Repelente Vaporizador','Repelente A Otra Parte Vaporizador',3910.00,0,0.0,5,1,1,11,'2023-06-15 02:55:16','2023-06-15 02:55:16'),(51,'Campera Soft Talle 55','Campera Soft Reflectiva Talle 55',15040.00,0,1.0,4,1,1,11,'2023-06-15 03:04:15','2023-06-15 03:04:15'),(52,'Camiseta Argentina','Camiseta Futbol Argentina Talle 7 - 8 - 9 - 10\r\n\r\nTALLE 7: LARGO 52cm ANCHO 35cm\r\n\r\nTALLE 8: LARGO 55cm ANCHO 37cm\r\n\r\nTALLE 9: LARGO 65cm ANCHO 41cm\r\n\r\nTALLE 11: LARGO 69cm ANCHO 44cm',8890.00,0,0.0,4,1,1,11,'2023-06-15 03:06:34','2023-06-15 03:06:34'),(53,'Campera Con Capucha','Campera Con Capucha Senior Jack Talle 5',12110.00,0,0.0,4,1,1,11,'2023-06-15 03:09:06','2023-06-15 03:09:06'),(54,'Pelota Maciza','Pelota Maciza ideal para tu perro',1410.00,0,0.0,3,1,1,11,'2023-06-15 03:10:30','2023-06-15 03:10:30'),(55,'Hueso de Soga','Hueso Soga Mediano 32 cm aprox.',1240.00,0,0.0,3,1,1,11,'2023-06-15 03:11:36','2023-06-15 03:11:36'),(56,'Juguetes de goma','Juguetes para Perros Vinilo',990.00,0,0.0,3,1,1,11,'2023-06-15 03:13:14','2023-06-15 03:13:14'),(57,'Comedero de acero 11cm','Este tipo de comedero tiene ventajas como ser resistente a la corrosión, fácil de limpiar, mantener higiénico, y duradero a lo largo del tiempo.\r\n\r\nAdemás, su material es seguro para los animales y no retiene olores ni sabores, lo que lo hace ideal para alimentos frescos. Podes encontrarlo en diferentes tamaños y capacidades para adaptarse a las ne',1400.00,0,0.0,2,1,1,11,'2023-06-15 03:14:24','2023-06-15 03:14:24'),(58,'Comedero Con Tolva','Comedero/Bebedero Con Tolva 1,5L / 700g',3000.00,0,0.0,2,1,1,11,'2023-06-15 03:15:30','2023-06-15 03:15:30'),(59,'Comedero doble','Comedero/Bebedero Con Tolva 1,5L / 700g',810.00,0,0.0,2,1,1,11,'2023-06-15 03:16:20','2023-06-15 03:16:20'),(60,'Colchoneta Luky Chica','Colchoneta Luky Chica 50cm x 65cm x 3cm',8300.00,0,1.0,6,1,1,11,'2023-06-15 03:17:45','2023-06-15 03:17:45'),(61,'Colchoneta Chipre Grande','Colchoneta Chipre Grande 85cm x 65cm',8730.00,0,1.0,6,1,1,11,'2023-06-15 03:18:59','2023-06-15 03:18:59'),(62,'Colchoneta Kansas Grande','Colchoneta Kansas Grande ideal para tu perro',11820.00,0,1.0,6,1,1,11,'2023-06-15 03:20:24','2023-06-15 03:20:24'),(63,'Transportador De Lona','Bolso Transportador De Lona Con Ventana Chico 25cm x 25cm x 40cm',14890.00,0,0.0,2,1,1,11,'2023-06-15 03:21:51','2023-06-15 03:21:51'),(64,'Bolso Transparente','Bolso Transparente Hiperventilable Y Plegable Chico',22850.00,0,0.0,2,1,1,11,'2023-06-15 03:23:05','2023-06-15 03:23:05'),(65,'Transportadora 48x32x30cm','Transportadora Gloria N°1 48cm x 32cm x 30cm',18970.00,0,0.0,2,1,1,11,'2023-06-15 03:24:26','2023-06-15 03:24:26'),(66,'Pedigree Biscrok 500 gr','Los snacks se pueden utilizar para entrenar y recompensar, son perfectos para momentos de conexión, además de poder ayudar a mantener su salud oral.\r\n\r\nPor ello BISCROK™ son Crujientes Galletas en forma de hueso enriquecidas con calcio y omega 6, ideales para entrenar, premiar y consentir a tu perro a cualquier hora del día.\r\n\r\nCon Calcio y Omega 6',1530.00,0,1.0,1,1,1,14,'2023-06-15 03:26:42','2023-06-15 03:26:42'),(67,'Palitos 10 Unidades','Palitos 10 Unidades, ricas golosinas para tu mascota',150.00,0,0.0,1,1,1,11,'2023-06-15 03:28:09','2023-06-15 03:28:09'),(68,'Hueso 9/10 24cm Largo','Huesos de Cuero\r\nMedidas:\r\nHueso 3/4: 9cm Aprox.\r\nHueso 4/5: 10cm Aprox.\r\nHueso 5/6: 13,5cm Aprox.\r\nHueso 6/7: 16cm Aprox.\r\nHueso 7/8: 18,5cm Aprox.\r\nHueso 8/9: 21cm Aprox.\r\nHueso 9/10: 24cm Aprox.\r\nHueso 10/11: 26cm Aprox.\r\nHueso 11/12: 27cm Aprox.\r\nHueso 12/13: 31cm Aprox.\r\nHueso 13/14: 32cm Aprox.\r\nHueso 14/15: 36cm Aprox.\r\nHueso 15/16: 38,5cm A',1650.00,0,0.0,3,1,1,11,'2023-06-15 03:29:03','2023-06-15 03:29:03'),(69,'Whiskas Pescado 10kg','Whiskas Adulto Sabor Pescado le aportará a tu gato una nutrición 100% completa y balanceada. Es ideal para satisfacer las diferentes necesidades nutricionales a lo largo de toda su vida adulta. Óptima nutrición proporcionando minerales controlados y todos los nutrientes y energía necesarios para explorar el mundo.',9560.00,0,10.0,1,2,1,15,'2023-06-15 03:31:19','2023-06-15 03:31:19'),(73,'la prueba','No se, estaba probando las validaciones y el tema de mantener la session',100.00,10,0.0,1,2,1,11,'2023-06-15 19:40:30','2023-06-15 19:40:30'),(74,'Nutrique Gato Adulto Castrado','Control de peso',4105.00,0,0.0,1,2,1,11,'2023-06-15 19:40:30','2023-06-15 19:40:30'),(75,'Nutrique Gato Adulto Urinary Care','Urinary Care',3689.00,0,0.0,1,2,1,11,'2023-06-15 19:40:30','2023-06-15 19:40:30'),(76,'Nutrique Gato Bebé','Gato bebé y gato cachorro',11398.00,25,0.0,1,2,1,11,'2023-06-15 19:40:30','2023-06-15 19:40:30'),(77,'Ropa Para Perros','Buzo Vestido Ambar ',1500.00,10,0.0,2,1,1,11,'2023-06-15 19:40:30','2023-06-15 19:40:30'),(78,'Nutrique Cachorro','Raza Mediana',1394.00,5,0.0,1,1,1,11,'2023-06-15 19:40:30','2023-06-15 19:40:30'),(79,'Nutrique Perro Adulto','Raza pequeña y mini',7420.00,0,0.0,1,1,1,11,'2023-06-15 19:40:30','2023-06-15 19:40:30'),(80,'Nutrique Gato Kitten','Kitten cachorro',782.00,0,0.0,1,2,1,11,'2023-06-15 19:40:30','2023-06-15 19:40:30'),(81,'Alfalfa en cubos','Ricos en vitaminas para todo tipo de roedores',700.00,5,0.0,1,3,1,11,'2023-06-15 19:40:30','2023-06-15 19:40:30'),(82,'Shulet Tortugin','Alimento completo para tortugas acuáticas y complemento para terrestres',350.00,0,0.0,1,4,1,11,'2023-06-15 19:40:30','2023-06-15 19:40:30'),(83,'Hectopar','Pulguicida para gatos mas de 4kg',500.00,0,0.0,5,2,1,11,'2023-06-15 19:40:30','2023-06-15 19:40:30'),(84,'Shulet Tropical','Alimento completo balanceado para peces tropicales',870.00,0,0.0,1,4,1,11,'2023-06-15 19:40:30','2023-06-15 19:40:30'),(85,'Zoomarlo','Mazorca de maíz premium',1400.00,0,0.0,1,3,1,11,'2023-06-15 19:40:30','2023-06-15 19:40:30'),(86,'Sieger','Sieger katze gato urinario',3800.00,0,0.0,1,2,1,11,'2023-06-15 19:40:30','2023-06-15 19:40:30'),(87,'Complete','Perro adulto +7 años',9600.00,0,0.0,1,1,1,11,'2023-06-15 19:40:30','2023-06-15 19:40:30'),(88,'Alimento','Alimento para Perros Voraz Carne 21 kilos.',5200.00,10,0.0,1,1,1,11,'2023-06-15 19:40:30','2023-06-15 19:40:30'),(89,'Bonacqua','Azul de mitelino 50ml',1300.00,0,0.0,5,4,1,11,'2023-06-15 19:40:30','2023-06-15 19:40:30'),(90,'Alimento Whiskas','para gato adulto sabor pescado',5040.00,15,0.0,1,2,1,11,'2023-06-15 19:40:30','2023-06-15 19:40:30'),(91,'Zoomarlo','asdasdaDFDASFawsdfds',1234.00,0,0.0,2,2,1,11,'2023-06-15 19:40:30','2023-06-15 19:40:30'),(92,'Disfraz de Gallina','Decora a tu tortuga con este maravilloso atuendo',1500.00,0,0.0,4,5,1,11,'2023-06-15 19:40:30','2023-06-15 19:40:30'),(93,'test multiple','Varias imagenes de prueba para test',8500.00,99,0.0,4,5,1,11,'2023-06-15 19:40:30','2023-06-15 19:40:30'),(94,'asdasdas','dxcsdfsafdgdfsdf',333.00,30,0.0,3,6,1,11,'2023-06-15 19:40:30','2023-06-15 19:40:30'),(95,'ropa tortugas','dfsdfsdfsdf',12334.00,99,0.0,4,2,1,11,'2023-06-15 19:40:30','2023-06-15 19:40:30'),(96,'ropa tortugas','dfsdfsdfsdf',12334.00,99,0.0,4,2,1,11,'2023-06-15 19:40:30','2023-06-15 19:40:30'),(97,'ropa tortugas','dfsdfsdfsdf',12334.00,99,0.0,4,2,1,11,'2023-06-15 19:40:30','2023-06-15 19:40:30'),(98,'ropa tortugas','dfsdfsdfsdf',12334.00,99,0.0,4,2,1,11,'2023-06-15 19:40:30','2023-06-15 19:40:30'),(99,'ropa tortugas','dfsdfsdfsdf',12334.00,99,0.0,4,2,1,11,'2023-06-15 19:40:30','2023-06-15 19:40:30'),(100,'ropa tortugas','dfsdfsdfsdf',12334.00,99,0.0,4,2,1,11,'2023-06-15 19:40:30','2023-06-15 19:40:30');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rol` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (0,'User'),(1,'Admin');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategory`
--

DROP TABLE IF EXISTS `subcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subcategory` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `categories_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `subcategory_FK` (`categories_id`),
  CONSTRAINT `subcategory_FK` FOREIGN KEY (`categories_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategory`
--

LOCK TABLES `subcategory` WRITE;
/*!40000 ALTER TABLE `subcategory` DISABLE KEYS */;
/*!40000 ALTER TABLE `subcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `pass` varchar(100) NOT NULL,
  `avatar` varchar(100) NOT NULL,
  `rol_id` int(11) NOT NULL DEFAULT 1,
  `tel` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_un` (`email`),
  KEY `users_FK` (`rol_id`),
  CONSTRAINT `users_FK` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (76,'Nicolas','Filippelli','nicolasfilippelli19@gmail.com','$2a$12$4f9.0Pu8L9JojyQVdwptK.6QkCZsYBrWO/B4TiLxKjWyZCVofN.FG','1686796560227_avatar_.png',1,NULL,'2023-06-15 02:36:00','2023-06-15 02:36:00');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'animalpark_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-15 16:47:50
