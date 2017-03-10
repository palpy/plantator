SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

/* Create table compagnonnage */

CREATE TABLE IF NOT EXISTS `compagnonnage` (
  `IDPlante1` int(11) NOT NULL,
  `IDPlante2` int(11) NOT NULL,
  `qualite` tinyint(1) NOT NULL,
  PRIMARY KEY (`IdPlante1`, `IdPlante2`),
  FOREIGN KEY (`IdPlante1`) REFERENCES `plante2`(`ID`),
  FOREIGN KEY (`IdPlante2`) REFERENCES `plante2`(`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ;


/* Create table recolte */

CREATE TABLE IF NOT EXISTS `recolte` (
  `IdComestible` int(11) NOT NULL AUTO_INCREMENT,
  `IDPlante` int(11) NOT NULL,
  `comestible` tinyint(4) NOT NULL,
  `recolteDeb` tinyint(4) NOT NULL,
  `recolteFin` tinyint(4) NOT NULL,
  PRIMARY KEY (`IdComestible`),
  FOREIGN KEY (`IdPlante`)
    REFERENCES plante2(`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ;


/* Create table planteTemp */

CREATE TABLE IF NOT EXISTS `planteTemp` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `date` DATETIME NOT NULL,
  `content` TEXT NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ;


/* Add columns to table plante */

ALTER TABLE `plante2` ADD `moisbourgeonfeuille` tinyint(4) DEFAULT 0;
ALTER TABLE `plante2` ADD `moispertefeuille` tinyint(4) DEFAULT 0;
ALTER TABLE `plante2` ADD `portplante` tinyint(4) DEFAULT 0;
ALTER TABLE `plante2` ADD `genre` varchar(50) DEFAULT '';
ALTER TABLE `plante2` ADD `espece` varchar(50) DEFAULT '';
