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
DROP DATABASE IF EXISTS animalpark_db;

CREATE DATABASE animalpark_db;

USE animalpark_db;

DROP TABLE IF EXISTS `adresses`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

CREATE TABLE
  `adresses` (
    `id` int (11) unsigned NOT NULL AUTO_INCREMENT,
    `address` varchar(100) DEFAULT NULL,
    `postal_code` varchar(50) DEFAULT NULL,
    `province` varchar(50) DEFAULT NULL,
    `city` varchar(50) DEFAULT NULL,
    `user_id` int (11) unsigned NOT NULL,
    PRIMARY KEY (`id`),
    KEY `adresses_ibfk_1` (`user_id`),
    CONSTRAINT `adresses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

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

CREATE TABLE
  `brands` (
    `id` int (11) NOT NULL AUTO_INCREMENT,
    `brand` varchar(100) NOT NULL,
    PRIMARY KEY (`id`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--
LOCK TABLES `brands` WRITE;

/*!40000 ALTER TABLE `brands` DISABLE KEYS */;

/*!40000 ALTER TABLE `brands` ENABLE KEYS */;

UNLOCK TABLES;

--
-- Table structure for table `cart`
--
DROP TABLE IF EXISTS `cart`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

CREATE TABLE
  `cart` (
    `id` int (11) unsigned NOT NULL AUTO_INCREMENT,
    `order_id` int (11) unsigned NOT NULL,
    `product_id` int (11) unsigned NOT NULL,
    `cantidad` int (11) unsigned DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `cart_FK` (`order_id`),
    KEY `cart_FK_1` (`product_id`),
    CONSTRAINT `cart_FK` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `cart_FK_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

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

CREATE TABLE
  `category` (
    `id` int (11) unsigned NOT NULL AUTO_INCREMENT,
    `name` varchar(30) CHARACTER
    SET
      utf8 COLLATE utf8_unicode_ci NOT NULL,
      PRIMARY KEY (`id`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--
LOCK TABLES `category` WRITE;

/*!40000 ALTER TABLE `category` DISABLE KEYS */;

/*!40000 ALTER TABLE `category` ENABLE KEYS */;

UNLOCK TABLES;

--
-- Table structure for table `orders`
--
DROP TABLE IF EXISTS `orders`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

CREATE TABLE
  `orders` (
    `id` int (11) unsigned NOT NULL AUTO_INCREMENT,
    `user_id` int (11) unsigned NOT NULL,
    `created_at` datetime DEFAULT NULL,
    `updated_at` datetime DEFAULT NULL,
    `total_price` double (7, 2) DEFAULT NULL,
    `total_item` int (11) DEFAULT NULL,
    `active` tinyint (3) unsigned NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`),
    KEY `orders_FK` (`user_id`),
    CONSTRAINT `orders_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

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

CREATE TABLE
  `pets` (
    `id` int (11) unsigned NOT NULL AUTO_INCREMENT,
    `pet` varchar(30) CHARACTER
    SET
      utf8 COLLATE utf8_unicode_ci NOT NULL,
      PRIMARY KEY (`id`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pets`
--
LOCK TABLES `pets` WRITE;

/*!40000 ALTER TABLE `pets` DISABLE KEYS */;

/*!40000 ALTER TABLE `pets` ENABLE KEYS */;

UNLOCK TABLES;

--
-- Table structure for table `product_images`
--
DROP TABLE IF EXISTS `product_images`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

CREATE TABLE
  `product_images` (
    `id` int (11) unsigned NOT NULL AUTO_INCREMENT,
    `image` varchar(100) NOT NULL,
    `product_id` int (11) unsigned NOT NULL,
    PRIMARY KEY (`id`),
    KEY `product_images_FK` (`product_id`),
    CONSTRAINT `product_images_FK` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--
LOCK TABLES `product_images` WRITE;

/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;

/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;

UNLOCK TABLES;

--
-- Table structure for table `products`
--
DROP TABLE IF EXISTS `products`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

CREATE TABLE
  `products` (
    `id` int (11) unsigned NOT NULL AUTO_INCREMENT,
    `name` varchar(50) CHARACTER
    SET
      utf8 COLLATE utf8_unicode_ci NOT NULL,
      `description` varchar(350) CHARACTER
    SET
      utf8 COLLATE utf8_unicode_ci NOT NULL,
      `price` decimal(7, 2) unsigned NOT NULL,
      `discount` tinyint (3) unsigned DEFAULT 0,
      `weight` decimal(4, 1) unsigned DEFAULT 0.0,
      `subcategory_id` int (11) unsigned DEFAULT NULL,
      `pet_id` int (11) unsigned DEFAULT NULL,
      `active` tinyint (1) unsigned NOT NULL DEFAULT 0,
      `brand_id` int (11) DEFAULT NULL,
      `created_at` datetime DEFAULT NULL,
      `updated_at` datetime DEFAULT NULL,
      PRIMARY KEY (`id`),
      KEY `products_FK` (`pet_id`),
      KEY `products_FK_1` (`subcategory_id`),
      KEY `products_FK_2` (`brand_id`),
      CONSTRAINT `products_FK` FOREIGN KEY (`pet_id`) REFERENCES `pets` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
      CONSTRAINT `products_FK_1` FOREIGN KEY (`subcategory_id`) REFERENCES `subcategory` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
      CONSTRAINT `products_FK_2` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
  ) ENGINE = InnoDB AUTO_INCREMENT = 29 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--
LOCK TABLES `products` WRITE;

/*!40000 ALTER TABLE `products` DISABLE KEYS */;

INSERT INTO
  `products`
VALUES
  (
    1,
    'la prueba',
    'No se, estaba probando las validaciones y el tema de mantener la session',
    100.00,
    10,
    10.0,
    NULL,
    NULL,
    1,
    NULL,
    '2023-04-17 23:52:48',
    '2023-04-17 23:52:48'
  ),
  (
    2,
    'Nutrique Gato Adulto Castrado',
    'Control de peso',
    4105.00,
    0,
    2.0,
    NULL,
    NULL,
    1,
    NULL,
    '2023-04-17 23:52:48',
    '2023-04-17 23:52:48'
  ),
  (
    3,
    'Nutrique Gato Adulto Urinary Care',
    'Urinary Care',
    3689.00,
    0,
    2.0,
    NULL,
    NULL,
    1,
    NULL,
    '2023-04-17 23:52:48',
    '2023-04-17 23:52:48'
  ),
  (
    4,
    'Nutrique Gato Bebé',
    'Gato bebé y gato cachorro',
    11398.00,
    25,
    7.0,
    NULL,
    NULL,
    1,
    NULL,
    '2023-04-17 23:52:48',
    '2023-04-17 23:52:48'
  ),
  (
    5,
    'Nutrique Gato Kitten',
    'Kitten cachorro',
    782.00,
    0,
    350.0,
    NULL,
    NULL,
    1,
    NULL,
    '2023-04-17 23:52:48',
    '2023-04-17 23:52:48'
  ),
  (
    6,
    'Ropa Para Perros',
    'Buzo Vestido Ambar ',
    1500.00,
    10,
    0.0,
    NULL,
    NULL,
    1,
    NULL,
    '2023-04-17 23:52:48',
    '2023-04-17 23:52:48'
  ),
  (
    7,
    'Nutrique Cachorro',
    'Raza Mediana',
    1394.00,
    5,
    1.0,
    NULL,
    NULL,
    1,
    NULL,
    '2023-04-17 23:52:48',
    '2023-04-17 23:52:48'
  ),
  (
    8,
    'Nutrique Perro Adulto',
    'Raza pequeña y mini',
    7420.00,
    0,
    7.0,
    NULL,
    NULL,
    1,
    NULL,
    '2023-04-17 23:52:48',
    '2023-04-17 23:52:48'
  ),
  (
    9,
    'Alfalfa en cubos',
    'Ricos en vitaminas para todo tipo de roedores',
    700.00,
    5,
    100.0,
    NULL,
    NULL,
    1,
    NULL,
    '2023-04-17 23:52:48',
    '2023-04-17 23:52:48'
  ),
  (
    10,
    'Shulet Tortugin',
    'Alimento completo para tortugas acuáticas y complemento para terrestres',
    350.00,
    0,
    100.0,
    NULL,
    NULL,
    1,
    NULL,
    '2023-04-17 23:52:48',
    '2023-04-17 23:52:48'
  ),
  (
    11,
    'Hectopar',
    'Pulguicida para gatos mas de 4kg',
    500.00,
    0,
    100.0,
    NULL,
    NULL,
    1,
    NULL,
    '2023-04-17 23:52:48',
    '2023-04-17 23:52:48'
  ),
  (
    12,
    'Shulet Tropical',
    'Alimento completo balanceado para peces tropicales',
    870.00,
    0,
    100.0,
    NULL,
    NULL,
    1,
    NULL,
    '2023-04-17 23:52:48',
    '2023-04-17 23:52:48'
  ),
  (
    13,
    'Zoomarlo',
    'Mazorca de maíz premium',
    1400.00,
    0,
    300.0,
    NULL,
    NULL,
    1,
    NULL,
    '2023-04-17 23:52:48',
    '2023-04-17 23:52:48'
  ),
  (
    14,
    'Sieger',
    'Sieger katze gato urinario',
    3800.00,
    0,
    7.0,
    NULL,
    NULL,
    1,
    NULL,
    '2023-04-17 23:52:48',
    '2023-04-17 23:52:48'
  ),
  (
    15,
    'Complete',
    'Perro adulto +7 años',
    9600.00,
    0,
    20.0,
    NULL,
    NULL,
    1,
    NULL,
    '2023-04-17 23:52:48',
    '2023-04-17 23:52:48'
  ),
  (
    16,
    'Alimento',
    'Alimento para Perros Voraz Carne 21 kilos.',
    5200.00,
    10,
    21.0,
    NULL,
    NULL,
    1,
    NULL,
    '2023-04-17 23:52:48',
    '2023-04-17 23:52:48'
  ),
  (
    17,
    'Bonacqua',
    'Azul de mitelino 50ml',
    1300.00,
    0,
    50.0,
    NULL,
    NULL,
    1,
    NULL,
    '2023-04-17 23:52:48',
    '2023-04-17 23:52:48'
  ),
  (
    18,
    'Alimento Whiskas',
    'para gato adulto sabor pescado',
    5040.00,
    15,
    10.0,
    NULL,
    NULL,
    1,
    NULL,
    '2023-04-17 23:52:48',
    '2023-04-17 23:52:48'
  ),
  (
    19,
    'Zoomarlo',
    'asdasdaDFDASFawsdfds',
    1234.00,
    0,
    12.0,
    NULL,
    NULL,
    1,
    NULL,
    '2023-04-17 23:52:48',
    '2023-04-17 23:52:48'
  ),
  (
    20,
    'Disfraz de Gallina',
    'Decora a tu tortuga con este maravilloso atuendo',
    1500.00,
    0,
    10.0,
    NULL,
    NULL,
    1,
    NULL,
    '2023-04-17 23:52:48',
    '2023-04-17 23:52:48'
  ),
  (
    21,
    'test multiple',
    'Varias imagenes de prueba para test',
    8500.00,
    99,
    12.0,
    NULL,
    NULL,
    1,
    NULL,
    '2023-04-17 23:52:48',
    '2023-04-17 23:52:48'
  ),
  (
    22,
    'asdasdas',
    'dxcsdfsafdgdfsdf',
    333.00,
    30,
    12.0,
    NULL,
    NULL,
    1,
    NULL,
    '2023-04-17 23:52:48',
    '2023-04-17 23:52:48'
  ),
  (
    23,
    'ropa tortugas',
    'dfsdfsdfsdf',
    12334.00,
    99,
    10.0,
    NULL,
    NULL,
    1,
    NULL,
    '2023-04-17 23:52:48',
    '2023-04-17 23:52:48'
  ),
  (
    24,
    'ropa tortugas',
    'dfsdfsdfsdf',
    12334.00,
    99,
    10.0,
    NULL,
    NULL,
    1,
    NULL,
    '2023-04-17 23:52:48',
    '2023-04-17 23:52:48'
  ),
  (
    25,
    'ropa tortugas',
    'dfsdfsdfsdf',
    12334.00,
    99,
    10.0,
    NULL,
    NULL,
    1,
    NULL,
    '2023-04-17 23:52:48',
    '2023-04-17 23:52:48'
  ),
  (
    26,
    'ropa tortugas',
    'dfsdfsdfsdf',
    12334.00,
    99,
    10.0,
    NULL,
    NULL,
    1,
    NULL,
    '2023-04-17 23:52:48',
    '2023-04-17 23:52:48'
  ),
  (
    27,
    'ropa tortugas',
    'dfsdfsdfsdf',
    12334.00,
    99,
    10.0,
    NULL,
    NULL,
    1,
    NULL,
    '2023-04-17 23:52:48',
    '2023-04-17 23:52:48'
  ),
  (
    28,
    'ropa tortugas',
    'dfsdfsdfsdf',
    12334.00,
    99,
    10.0,
    NULL,
    NULL,
    1,
    NULL,
    '2023-04-17 23:52:48',
    '2023-04-17 23:52:48'
  );

/*!40000 ALTER TABLE `products` ENABLE KEYS */;

UNLOCK TABLES;

--
-- Table structure for table `roles`
--
DROP TABLE IF EXISTS `roles`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

CREATE TABLE
  `roles` (
    `id` int (11) NOT NULL AUTO_INCREMENT,
    `rol` varchar(20) NOT NULL,
    PRIMARY KEY (`id`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--
LOCK TABLES `roles` WRITE;

/*!40000 ALTER TABLE `roles` DISABLE KEYS */;

INSERT INTO
  `roles`
VALUES
  (0, 'User'),
  (1, 'Admin');

/*!40000 ALTER TABLE `roles` ENABLE KEYS */;

UNLOCK TABLES;

--
-- Table structure for table `subcategory`
--
DROP TABLE IF EXISTS `subcategory`;

/*!40101 SET @saved_cs_client     = @@character_set_client */;

/*!50503 SET character_set_client = utf8mb4 */;

CREATE TABLE
  `subcategory` (
    `id` int (11) unsigned NOT NULL AUTO_INCREMENT,
    `name` varchar(50) NOT NULL,
    `categories_id` int (11) unsigned NOT NULL,
    PRIMARY KEY (`id`),
    KEY `subcategory_FK` (`categories_id`),
    CONSTRAINT `subcategory_FK` FOREIGN KEY (`categories_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

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

CREATE TABLE
  `users` (
    `id` int (11) unsigned NOT NULL AUTO_INCREMENT,
    `first_name` varchar(20) NOT NULL,
    `last_name` varchar(20) NOT NULL,
    `email` varchar(50) NOT NULL,
    `pass` varchar(100) NOT NULL,
    `avatar` varchar(100) NOT NULL,
    `rol_id` int (11) NOT NULL DEFAULT 1,
    `tel` int (11) unsigned DEFAULT NULL,
    `created_at` datetime DEFAULT NULL,
    `updated_at` datetime DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `users_FK` (`rol_id`),
    CONSTRAINT `users_FK` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE = InnoDB AUTO_INCREMENT = 11 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--
LOCK TABLES `users` WRITE;

/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO
  `users`
VALUES
  (
    1,
    'Jon',
    'Balles',
    'jon@mail.com',
    '',
    'avatar_default.jpeg',
    1,
    NULL,
    '2023-04-18 00:02:00',
    '2023-04-18 00:02:00'
  ),
  (
    2,
    'Jon',
    'Balles',
    'jon@mail.com',
    '',
    'avatar_default.jpeg',
    1,
    NULL,
    '2023-04-18 00:02:00',
    '2023-04-18 00:02:00'
  ),
  (
    3,
    'Ramón',
    'Brietz Sanabria',
    'test@test.com',
    '$2a$12$7lF/l7O4CYJ2nzsqLtzX/eHDM7wCcFuF3yZJqmF72LDrzgSfNfw/m',
    '1678210261666_avatar_.jpg',
    1,
    NULL,
    '2023-04-18 00:02:00',
    '2023-04-18 00:02:00'
  ),
  (
    4,
    'Jon',
    'Balles',
    'jon@gmail.com',
    '$2a$12$irYdKP2o.gDv1chC/dqDaOxOlVgAbh1xe3EdQYpdUGi0.e8SybOna',
    '11111111111111.jpg',
    1,
    NULL,
    '2023-04-18 00:02:00',
    '2023-04-18 00:02:00'
  ),
  (
    5,
    'test',
    'test',
    'test3@test.com',
    '$2a$12$EbXyrMeBbeGwNJHeTYqowO2yFsvdpWFMfurYlMgfviI2Uvpf5b80q',
    '1677884477039_avatar_.png',
    0,
    NULL,
    '2023-04-18 00:02:00',
    '2023-04-18 00:02:00'
  ),
  (
    6,
    'test',
    'test',
    'test3@test.com',
    '$2a$12$EbXyrMeBbeGwNJHeTYqowO2yFsvdpWFMfurYlMgfviI2Uvpf5b80q',
    '1677884477039_avatar_.png',
    0,
    NULL,
    '2023-04-18 00:02:00',
    '2023-04-18 00:02:00'
  ),
  (
    7,
    'testeando',
    'Registro',
    'testeo@mail.com',
    '$2a$12$zyvgfFjvvwTfSNcoIjugN.QM2JWyh8xLHePx1/CWcAHK9lNrHmqCi',
    'avatar_default.jpeg',
    0,
    NULL,
    '2023-04-18 00:02:00',
    '2023-04-18 00:02:00'
  ),
  (
    8,
    'Nico',
    'Fili',
    'nico@fili.com',
    '$2a$12$dgX2HtrUhUHkagioparHjezIvbUAJ..IWqYortUsP3V3uUDuCms/G',
    'avatar_default.jpeg',
    1,
    NULL,
    '2023-04-18 00:02:00',
    '2023-04-18 00:02:00'
  ),
  (
    9,
    'Cosme',
    'Fulanito',
    'prueba@user.com',
    '$2a$12$KowLlmiL0detU4zCTy/RXet/xm/vsyHWYaO8iZZMQkpiaeC9xiV4y',
    'avatar_default.jpeg',
    0,
    NULL,
    '2023-04-18 00:02:00',
    '2023-04-18 00:02:00'
  ),
  (
    10,
    'Admin',
    'Fulanito',
    'prueba@admin.com',
    '$2a$12$9O9GmhqPlC3iySUx5EM3Ku1.8QKhXUYazyYdBCN9KgyiHRJzvsLnO',
    'avatar_default.jpeg',
    1,
    NULL,
    '2023-04-18 00:02:00',
    '2023-04-18 00:02:00'
  );

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

-- Dump completed on 2023-04-17 21:02:23