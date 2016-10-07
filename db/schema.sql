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
	admin BOOLEAN DEFAULT false,
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

-- Decider table to assign outcome
CREATE TABLE decider 
(
	decider_id int NOT NULL AUTO_INCREMENT,
	bet_id INT NOT NULL,
	outcome BOOLEAN DEFAULT NULL,
	PRIMARY KEY (decider_id)
);

-- Voting History table to calculate votes and who's already voted
CREATE TABLE votes
(
	voting_id int NOT NULL AUTO_INCREMENT,
	bet_id int(11) NOT NULL,
	voter_id int(11) NOT NULL,
	voter_pick varchar(5) NOT NULL,
	PRIMARY KEY (voting_id)
);
