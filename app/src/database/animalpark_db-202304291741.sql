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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adresses`
--

LOCK TABLES `adresses` WRITE;
/*!40000 ALTER TABLE `adresses` DISABLE KEYS */;
INSERT INTO `adresses` VALUES (1,'Prueeba 123','1824','Buenos Aires','Monte Chingolo',8),(2,'Calle Falsa 123','1234','Buenos Aires','Buenos Aires',10);
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (1,'Voraz'),(2,'nada1'),(3,'Manualidad'),(4,'Varias img'),(5,'dfsfsdf');
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
INSERT INTO `orders` VALUES (1,8,NULL,NULL,15000.00,5,0),(2,8,NULL,NULL,12.00,2,0),(3,8,NULL,NULL,6426.00,4,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
INSERT INTO `product_images` VALUES (6,'1676164813110_products_.png',1),(7,'1676165016569_products_.png',2),(8,'1676165325047_products_.png',3),(9,'1676165377177_products_.png',4),(10,'1676165429489_products_.png',5),(11,'1676166281180_products_.PNG',6),(12,'1676166390464_products_.png',7),(13,'1676166482766_products_.png',8),(14,'1676166605412_products_.png',9),(15,'1676166732128_products_.webp',10),(16,'1676166988307_products_.jpg',11),(17,'1676168189895_products_.webp',12),(20,'1676933887692_products_.png',15),(21,'1677013187826_products_.jpg',16),(22,'1676934665503_products_.png',17),(23,'1676934573105_products_.webp',18),(24,'default.jpg',19),(25,'1678135385598_products_.jpg',20),(26,'1678300734493_products_.jpg',21),(27,'1678300734517_products_.jpg',21),(28,'1678300734550_products_.jpg',21),(35,'default.jpg',28),(37,'default.jpg',30),(38,'1682738975358_products_.jpg',31),(39,'1682738975371_products_.jpg',31),(40,'1682738975375_products_.jpg',31);
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
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'la prueba','No se, estaba probando las validaciones y el tema de mantener la session',100.00,10,0.0,1,2,1,1,'2023-04-20 20:28:36','2023-04-20 20:28:36'),(2,'Nutrique Gato Adulto Castrado','Control de peso',4105.00,0,0.0,1,2,1,1,'2023-04-20 20:28:36','2023-04-20 20:28:36'),(3,'Nutrique Gato Adulto Urinary Care','Urinary Care',3689.00,0,0.0,1,2,1,1,'2023-04-20 20:28:36','2023-04-20 20:28:36'),(4,'Nutrique Gato Bebé','Gato bebé y gato cachorro',11398.00,25,0.0,1,2,1,1,'2023-04-20 20:28:36','2023-04-20 20:28:36'),(5,'Nutrique Gato Kitten','Kitten cachorro',782.00,0,0.0,1,2,1,1,'2023-04-20 20:28:36','2023-04-20 20:28:36'),(6,'Ropa Para Perros','Buzo Vestido Ambar ',1500.00,10,0.0,2,1,1,1,'2023-04-20 20:28:36','2023-04-20 20:28:36'),(7,'Nutrique Cachorro','Raza Mediana',1394.00,5,0.0,1,1,1,1,'2023-04-20 20:28:36','2023-04-20 20:28:36'),(8,'Nutrique Perro Adulto','Raza pequeña y mini',7420.00,0,0.0,1,1,1,1,'2023-04-20 20:28:36','2023-04-20 20:28:36'),(9,'Alfalfa en cubos','Ricos en vitaminas para todo tipo de roedores',700.00,5,0.0,1,3,1,1,'2023-04-20 20:28:36','2023-04-20 20:28:36'),(10,'Shulet Tortugin','Alimento completo para tortugas acuáticas y complemento para terrestres',350.00,0,0.0,1,4,1,1,'2023-04-20 20:28:36','2023-04-20 20:28:36'),(11,'Hectopar','Pulguicida para gatos mas de 4kg',500.00,0,0.0,5,2,1,1,'2023-04-20 20:28:36','2023-04-20 20:28:36'),(12,'Shulet Tropical','Alimento completo balanceado para peces tropicales',870.00,0,0.0,1,4,1,1,'2023-04-20 20:28:36','2023-04-20 20:28:36'),(15,'Complete','Perro adulto +7 años',9600.00,0,0.0,1,1,1,1,'2023-04-20 20:28:36','2023-04-20 20:28:36'),(16,'Alimento','Alimento para Perros Voraz Carne 21 kilos.',5200.00,10,0.0,1,1,1,1,'2023-04-20 20:28:36','2023-04-20 20:28:36'),(17,'Bonacqua','Azul de mitelino 50ml',1300.00,0,0.0,5,4,1,1,'2023-04-20 20:28:36','2023-04-20 20:28:36'),(18,'Alimento Whiskas','para gato adulto sabor pescado',5040.00,15,0.0,1,2,1,1,'2023-04-20 20:28:36','2023-04-20 20:28:36'),(19,'Zoomarlo','asdasdaDFDASFawsdfds',1234.00,0,0.0,2,2,1,2,'2023-04-20 20:28:36','2023-04-20 20:28:36'),(20,'Disfraz de Gallina','Decora a tu tortuga con este maravilloso atuendo',1500.00,0,0.0,4,5,1,3,'2023-04-20 20:28:36','2023-04-20 20:28:36'),(21,'test multiple','Varias imagenes de prueba para test',8500.00,99,0.0,4,5,1,4,'2023-04-20 20:28:36','2023-04-20 20:28:36'),(28,'Edito porque si','dfsdfsdfsdf',12334.00,99,0.0,4,2,1,3,'2023-04-20 20:28:36','2023-04-29 17:25:10'),(30,'Test de edicion','holanda',1230.00,0,10.0,1,1,1,5,'2023-04-29 02:47:50','2023-04-29 03:25:15'),(31,'Ropa Erizos','Ropita para tu erizo',2000.00,15,10.0,4,3,1,3,'2023-04-29 03:29:35','2023-04-29 20:36:53');
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
  `tel` int(11) unsigned DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `users_FK` (`rol_id`),
  CONSTRAINT `users_FK` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Jon','Balles','jon@mail.com','','avatar_default.jpeg',1,NULL,'2023-04-18 00:02:00','2023-04-18 00:02:00'),(2,'Jon','Balles','jon@mail.com','','avatar_default.jpeg',1,NULL,'2023-04-18 00:02:00','2023-04-18 00:02:00'),(3,'Ramón','Brietz Sanabria','test@test.com','$2a$12$7lF/l7O4CYJ2nzsqLtzX/eHDM7wCcFuF3yZJqmF72LDrzgSfNfw/m','1678210261666_avatar_.jpg',1,NULL,'2023-04-18 00:02:00','2023-04-18 00:02:00'),(4,'Jon','Balles','jon@gmail.com','$2a$12$irYdKP2o.gDv1chC/dqDaOxOlVgAbh1xe3EdQYpdUGi0.e8SybOna','11111111111111.jpg',1,NULL,'2023-04-18 00:02:00','2023-04-18 00:02:00'),(5,'test','test','test3@test.com','$2a$12$EbXyrMeBbeGwNJHeTYqowO2yFsvdpWFMfurYlMgfviI2Uvpf5b80q','1677884477039_avatar_.png',0,NULL,'2023-04-18 00:02:00','2023-04-18 00:02:00'),(6,'test','test','test3@test.com','$2a$12$EbXyrMeBbeGwNJHeTYqowO2yFsvdpWFMfurYlMgfviI2Uvpf5b80q','1677884477039_avatar_.png',0,NULL,'2023-04-18 00:02:00','2023-04-18 00:02:00'),(7,'testeando','Registro','testeo@mail.com','$2a$12$zyvgfFjvvwTfSNcoIjugN.QM2JWyh8xLHePx1/CWcAHK9lNrHmqCi','avatar_default.jpeg',0,NULL,'2023-04-18 00:02:00','2023-04-18 00:02:00'),(8,'Nico','Fili','nico@fili.com','$2a$12$dgX2HtrUhUHkagioparHjezIvbUAJ..IWqYortUsP3V3uUDuCms/G','avatar_default.jpeg',1,NULL,'2023-04-18 00:02:00','2023-04-18 00:02:00'),(9,'Cosme','Fulanito','prueba@user.com','$2a$12$KowLlmiL0detU4zCTy/RXet/xm/vsyHWYaO8iZZMQkpiaeC9xiV4y','avatar_default.jpeg',0,NULL,'2023-04-18 00:02:00','2023-04-18 00:02:00'),(10,'Admin','Fulanito','prueba@admin.com','$2a$12$9O9GmhqPlC3iySUx5EM3Ku1.8QKhXUYazyYdBCN9KgyiHRJzvsLnO','1682001320303_avatar_.png',1,0,'2023-04-18 00:02:00','2023-04-20 14:35:21'),(11,'ro','Belen','Rocio@belen.com','$2a$12$Unp1jKOojGqGh2iLy.AIIOg6Tk4VFiFmvoLZ8uuxs6X5orJvqluk2','avatar_default.jpeg',1,NULL,'2023-04-19 18:31:30','2023-04-19 18:31:30');
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

-- Dump completed on 2023-04-29 17:41:22
