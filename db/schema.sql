DROP DATABASE IF EXISTS start5_db;
CREATE database start5_db;

USE start5_db;

CREATE TABLE start5 (
	id int NOT NULL AUTO_INCREMENT,
	p_name varchar(255) NOT NULL,
	gp int,
	tot_min int NOT NULL,
	tot_points int NOT NULL,
    fgm int NOT NULL,
    fga int NOT NULL,
    fg_perc dec (3,1),
    3pm int,
    3pa int,
    3p_perc dec (3,1),
    ftm int NOT NULL,
    fta int NOT NULL,
    ft_perc dec (3,1),
    oreb int,
    dreb int,
    reb int,
    ast int,
    stl int,
    blk int,
    tov int,
    efg_perc dec (3,1),
    ts_perc dec (3,1),
	PRIMARY KEY (id)
    );
    