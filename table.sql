CREATE TABLE `nyc_neighborhoods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) DEFAULT NULL,
  `geometry` geometry DEFAULT NULL,
  `city` varchar(256) DEFAULT NULL,
  `state` varchar(256) DEFAULT NULL,
  `county` varchar(256) DEFAULT NULL,
  `region_id` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1784 DEFAULT CHARSET=utf8;
