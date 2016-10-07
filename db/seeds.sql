-- Admins
INSERT INTO users (username, first_name, last_name, password, email, admin) VALUES ('SloopJohnB', 'John', 'Bunner', 'bunner', 'john@bunner.com', true);
INSERT INTO users (username, first_name, last_name, password, email, admin) VALUES ('ZhangBang', 'Thomas', 'Zhang', 'zhang', 'thomas@zhang.com', true);
INSERT INTO users (username, first_name, last_name, password, email, admin) VALUES ('S_Cap', 'Sean', 'Capelle', 'capelle', 'sean@capelle.com', true);


-- Users
INSERT INTO users (username, first_name, last_name, password, email, admin) VALUES ('test', 'John', 'Doe', 'test', 'test@test.com', false);
INSERT INTO users (username, first_name, last_name, password, email, admin) VALUES ('test2', 'test2', 'Doe', 'test', 'test@test.com', false);
INSERT INTO users (username, first_name, last_name, password, email, admin) VALUES ('test3', 'test3', 'Doe', 'test', 'test@test.com', false);
INSERT INTO users (username, first_name, last_name, password, email, admin) VALUES ('test4', 'test4', 'Doe', 'test', 'test@test.com', false);

-- Bets
INSERT INTO bets (p1_id, p2_id, p1_answer, p2_answer, p2_agree, bet_amount, bet_text, judge) VALUES (1, 2, 'Batman', 'Superman', true, 20, 'Who is better?', 'admin');


-- Community
INSERT INTO bets (p1_id, p2_id, p1_answer, p2_answer, p2_agree, bet_amount, bet_text, judge) VALUES (4, 5, 'A', 'B', true, 20, 'Who is better?', 'community');
INSERT INTO bets (p1_id, p2_id, p1_answer, p2_answer, p2_agree, bet_amount, bet_text, judge) VALUES (5, 6, 'B', 'C', true, 20, 'Who is better?', 'community');
INSERT INTO bets (p1_id, p2_id, p1_answer, p2_answer, p2_agree, bet_amount, bet_text, judge) VALUES (6, 7, 'C', 'D', true, 20, 'Who is better?', 'community');
INSERT INTO bets (p1_id, p2_id, p1_answer, p2_answer, p2_agree, bet_amount, bet_text, judge) VALUES (7, 4, 'D', 'A', true, 20, 'Who is better?', 'community');











