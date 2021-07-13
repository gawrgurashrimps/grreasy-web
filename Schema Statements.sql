CREATE DATABASE  IF NOT EXISTS `products`;
USE `products`;

DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
);


INSERT INTO `category` VALUES
  (1,'foods'),
  (2,'drinks'),
  (3,'entertainment'),
  (4,'pets'),
  (5,'baby'),
  (6,'houseware'),
  (7,'health'),
  (8,'other');

DROP TABLE IF EXISTS `unit`;
CREATE TABLE `unit` (
  `id` int NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `unit` VALUES 
  (0,'g'),
  (1,'ml'),
  (2,'each');


DROP TABLE IF EXISTS `origin`;
CREATE TABLE `origin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `origin` VALUES 
  (1,'Woolworths'),
  (2,'Aldi'),
  (3,'Coles');


DROP TABLE IF EXISTS `items`;
CREATE TABLE `items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `origin_id` int NOT NULL,
  `price` decimal(19,2) NOT NULL,
  `fk_category` int NOT NULL,
  `quantity` int NOT NULL,
  `fk_unit` int NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_category` FOREIGN KEY (`fk_category`) REFERENCES `category` (`id`),
  CONSTRAINT `fk_unit` FOREIGN KEY (`fk_unit`) REFERENCES `unit` (`id`),
  CONSTRAINT `origin_id` FOREIGN KEY (`origin_id`) REFERENCES `origin` (`id`)
);