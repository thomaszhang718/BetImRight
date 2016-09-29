CREATE DATABASE bets_db;
USE bets_db;

CREATE TABLE users
(
	user_id int NOT NULL AUTO_INCREMENT,
	username varchar(20) NOT NULL,
	first_name varchar(20) NOT NULL,
	last_name varchar(20) NOT NULL,
	password varchar(20) NOT NULL,
	email varchar(40) NOT NULL,
	wins int(11) DEFAULT 0,
	losses int(11) DEFAULT 0,
	total_points_won int(11) DEFAULT 0,
	total_points_lost int(11) DEFAULT 0,
	total_bets_made int(11) DEFAULT 0,
	current_points int(11) DEFAULT 1000,
	last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE 