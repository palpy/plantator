SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

/* Create table potager */

CREATE TABLE IF NOT EXISTS `potager` (
  `id` varchar(50) NOT NULL,
  `expirationdate` datetime NOT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ;
