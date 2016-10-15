-- Users

-- Admins
INSERT INTO users (username, first_name, last_name, password, email, admin) VALUES ('SloopJohnB', 'John', 'Bunner', 'bunner', 'john@bunner.com', true);
INSERT INTO users (username, first_name, last_name, password, email, admin) VALUES ('ZhangBang', 'Thomas', 'Zhang', 'zhang', 'thomas@zhang.com', true);
INSERT INTO users (username, first_name, last_name, password, email, admin) VALUES ('S_Cap', 'Sean', 'Capelle', 'capelle', 'sean@capelle.com', true);


-- Standard Users

INSERT INTO users (username, first_name, last_name, password, email, admin) VALUES ('thomas', 'Thomas', 'Zhang', 'zhang', 'test@test.com', false);
INSERT INTO users (username, first_name, last_name, password, email, admin) VALUES ('sean', 'Sean', 'Capelle', 'sean', 'test@test.com', false);
INSERT INTO users (username, first_name, last_name, password, email, admin) VALUES ('john', 'John', 'Bunner', 'bunner', 'test@test.com', false);

-- Bets

-- Admin Judge
INSERT INTO bets (bet_id, p1_id, p2_id, p1_answer, p2_answer, p2_agree, bet_amount, bet_text, judge, p3_id, create_date, result) VALUES ('1', '4', '5', 'The Big Short', 'Spotlight', '1', '20', 'Who won Best Picture at the 2016 Oscars?', 'admin', NULL, '2016-10-13 19:33:44', NULL);
INSERT INTO bets (bet_id, p1_id, p2_id, p1_answer, p2_answer, p2_agree, bet_amount, bet_text, judge, p3_id, create_date, result) VALUES ('2', '5', '6', 'Blue Jays', 'Indians', '1', '40', 'Who will win Game 1 between the Jays and Indians?', 'admin', NULL, '2016-10-14 18:29:23', NULL);
INSERT INTO bets (bet_id, p1_id, p2_id, p1_answer, p2_answer, p2_agree, bet_amount, bet_text, judge, p3_id, create_date, result) VALUES ('3', '6', '4', '2002', '2003', '1', '117', 'What year did \"How to Lose a Guy in 10 Days\" come out?', 'admin', NULL, '2016-10-14 18:31:11', NULL);
INSERT INTO bets (bet_id, p1_id, p2_id, p1_answer, p2_answer, p2_agree, bet_amount, bet_text, judge, p3_id, create_date, result) VALUES ('4', '5', '4', '1916', '2016', '1', '80', 'What year is it?', 'admin', NULL, '2016-10-14 18:53:28', NULL);
INSERT INTO bets (bet_id, p1_id, p2_id, p1_answer, p2_answer, p2_agree, bet_amount, bet_text, judge, p3_id, create_date, result) VALUES ('5', '6', '4', 'Ron Weasley', NULL, NULL, '99', 'Who\'s older between Harry Potter, Ron Weasley, or Hermione Granger?', 'admin', NULL, '2016-10-14 18:55:41', NULL);

-- Community Judge
INSERT INTO bets (bet_id, p1_id, p2_id, p1_answer, p2_answer, p2_agree, bet_amount, bet_text, judge, p3_id, create_date, result) VALUES ('6', '4', '6', 'Thomas\'s Answer (Should Win)', 'John\'s Answer (Should Lose)', '1', '100', 'Test Community Vote (Auto Calculate)', 'community', NULL, '2016-10-12 19:33:44', NULL);
INSERT INTO bets (bet_id, p1_id, p2_id, p1_answer, p2_answer, p2_agree, bet_amount, bet_text, judge, p3_id, create_date, result) VALUES ('7', '4', '5', 'Batman', 'Superman', '1', '20', 'Who\'s Better?', 'community', NULL, '2016-10-14 18:31:11', NULL);
INSERT INTO bets (bet_id, p1_id, p2_id, p1_answer, p2_answer, p2_agree, bet_amount, bet_text, judge, p3_id, create_date, result) VALUES ('8', '5', '6', 'Hillary Clinton', 'Donald Trump', '1', '50', 'Who do you think will win the 2016 Election?', 'community', NULL, '2016-10-14 18:34:55', NULL);
INSERT INTO bets (bet_id, p1_id, p2_id, p1_answer, p2_answer, p2_agree, bet_amount, bet_text, judge, p3_id, create_date, result) VALUES ('9', '5', '6', 'McDonalds', 'Burger King', '1', '30', 'Better Fast Food place?', 'community', NULL, '2016-10-14 19:11:31', NULL);
INSERT INTO bets (bet_id, p1_id, p2_id, p1_answer, p2_answer, p2_agree, bet_amount, bet_text, judge, p3_id, create_date, result) VALUES ('10', '5', '4', 'New York City', NULL, NULL, '200', 'Better City to live in?', 'community', NULL, '2016-10-14 20:51:43', NULL);

-- Friend Judge
INSERT INTO bets (bet_id, p1_id, p2_id, p1_answer, p2_answer, p2_agree, bet_amount, bet_text, judge, p3_id, create_date, result) VALUES ('11', '4', '5', 'For sure', 'Nah, he weak as hell', '1', '150', 'Can Thomas do 30 pushups in a row?', 'friend', '6', '2016-10-14 18:42:54', NULL);
INSERT INTO bets (bet_id, p1_id, p2_id, p1_answer, p2_answer, p2_agree, bet_amount, bet_text, judge, p3_id, create_date, result) VALUES ('12', '5', '4', 'No, his mouth small', NULL, NULL, '30', 'Do you believe Sean can finish the Saltine Cracker Challenge? He must finish eating 6 saltine soda crackers within 60 seconds without drinking anything.', 'friend', '6', '2016-10-14 19:03:33', NULL);
INSERT INTO bets (bet_id, p1_id, p2_id, p1_answer, p2_answer, p2_agree, bet_amount, bet_text, judge, p3_id, create_date, result) VALUES ('13', '6', '4', 'No way, I saw it on Mythbusters', 'Hold my beer and get me some paper, I guarantee I can do it.', '1', '111', 'Can you fold a piece of regular paper more than 7 times?', 'friend', '5', '2016-10-14 19:07:50', NULL);
INSERT INTO bets (bet_id, p1_id, p2_id, p1_answer, p2_answer, p2_agree, bet_amount, bet_text, judge, p3_id, create_date, result) VALUES ('14', '6', '5', 'Team Peeta', 'Team Gale', '1', '40', 'Hunger Games Team?', 'friend', '4', '2016-10-14 15:42:20', NULL);
INSERT INTO bets (bet_id, p1_id, p2_id, p1_answer, p2_answer, p2_agree, bet_amount, bet_text, judge, p3_id, create_date, result) VALUES ('15', '5', '6', 'Hot', 'Not', '1', '20', 'Hilary Swank, Hot or Not?', 'friend', '4', '2016-10-14 14:11:54', NULL);

-- Votes

INSERT INTO votes (bet_id, voter_id, voter_pick) VALUES (6, 4, "p1");

