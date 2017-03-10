-- phpMyAdmin SQL Dump
-- version 4.1.14.8
-- http://www.phpmyadmin.net
--
-- Client :  db471039562.db.1and1.com
-- Généré le :  Mer 01 Juin 2016 à 18:13
-- Version du serveur :  5.1.73-log
-- Version de PHP :  5.4.45-0+deb7u2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `db471039562`
--

-- --------------------------------------------------------

--
-- Structure de la table `plantetemp`
--

CREATE TABLE IF NOT EXISTS `plantetemp` (
  `IDtemp` int(11) NOT NULL AUTO_INCREMENT,
  `ID` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prof` tinyint(4) NOT NULL,
  `dligne` smallint(6) NOT NULL,
  `drang` smallint(6) NOT NULL,
  `semisint` tinyint(4) NOT NULL,
  `semisabri` tinyint(4) NOT NULL,
  `semisext` tinyint(4) NOT NULL,
  `repiq` tinyint(4) NOT NULL,
  `recolteDeb` tinyint(4) NOT NULL,
  `recolteFin` tinyint(4) NOT NULL,
  `vie` smallint(6) NOT NULL,
  `soleil` tinyint(4) NOT NULL,
  `pH` tinyint(4) NOT NULL,
  `eau` tinyint(4) NOT NULL,
  `solriche` tinyint(4) NOT NULL,
  `hauteur` smallint(4) NOT NULL,
  `largeur` smallint(4) NOT NULL,
  `type` varchar(50) NOT NULL,
  `racine` tinyint(4) NOT NULL,
  `commentaire` varchar(535) NOT NULL,
  `multi` varchar(535) NOT NULL,
  `Tmin` tinyint(4) NOT NULL,
  `famille` varchar(50) NOT NULL,
  `vivace` tinyint(4) NOT NULL,
  `tpslevee` tinyint(4) DEFAULT NULL,
  `rendement` float NOT NULL,
  `tpsconserv` smallint(4) NOT NULL,
  `associe` varchar(535) NOT NULL,
  `antiassocie` varchar(535) NOT NULL,
  `utilisation` varchar(535) NOT NULL,
  `conservalimt` smallint(6) NOT NULL,
  `mail` varchar(100) NOT NULL,
  `moisflo` tinyint(4) NOT NULL,
  `usagemedic` varchar(200) NOT NULL,
  `nomlatin` varchar(200) NOT NULL,
  `moistaille` tinyint(4) NOT NULL,
  `Tlevee` tinyint(4) NOT NULL,
  PRIMARY KEY (`IDtemp`),
  UNIQUE KEY `ID` (`IDtemp`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=270 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
