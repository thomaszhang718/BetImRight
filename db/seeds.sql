-- Admins
INSERT INTO users (username, first_name, last_name, password, email, admin) VALUES ('SloopJohnB', 'John', 'Bunner', 'bunner', 'john@bunner.com', true);
INSERT INTO users (username, first_name, last_name, password, email, admin) VALUES ('ZhangBang', 'Thomas', 'Zhang', 'zhang', 'thomas@zhang.com', true);
INSERT INTO users (username, first_name, last_name, password, email, admin) VALUES ('S_Cap', 'Sean', 'Capelle', 'capelle', 'sean@capelle.com', true);


-- Users
INSERT INTO users (username, first_name, last_name, password, email, admin) VALUES ('test', 'John', 'Doe', 'test', 'test@test.com', false);


-- Bets
INSERT INTO bets (p1_id, p2_id, p1_answer, p2_answer, p2_agree, bet_amount, bet_text, judge) VALUES (1, 2, 'Batman', 'Superman', true, 20, 'Who is better?', 'admin');