-- Database
CREATE DATABASE bets_db;
USE bets_db;

-- Foolish mortals
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
	last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (user_id)
);

-- Bet creation
CREATE TABLE bets
(
	bet_id int NOT NULL AUTO_INCREMENT,
	p1_id int(11) NOT NULL,
	p2_id int(11) DEFAULT NULL,
	p1_answer varchar(500) NOT NULL,
	p2_answer varchar(500) DEFAULT NULL,
	p2_agree BOOLEAN DEFAULT NULL,
	bet_amount int(11) NOT NULL,
	bet_text varchar(500) NOT NULL, 
	judge varchar(20) NOT NULL,
	create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	-- end_date ???,
	result varchar(4) DEFAULT NULL,
	PRIMARY KEY (bet_id)
);

-- Transactional table
CREATE TABLE history
(
	transaction_id int(11) NOT NULL AUTO_INCREMENT,
	bet_id int(11) NOT NULL,
	user_id int(20) NOT NULL,
	vote BOOLEAN DEFAULT NULL,
	PRIMARY KEY (transaction_id)
);

CREATE TABLE admin
(
	user_id int NOT NULL AUTO_INCREMENT,
	username varchar(20) NOT NULL,
	first_name varchar(20) NOT NULL,
	last_name varchar(20) NOT NULL,
	password varchar(20) NOT NULL,
	email varchar(40) NOT NULL,
	PRIMARY KEY (user_id)
);