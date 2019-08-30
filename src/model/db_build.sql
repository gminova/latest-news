BEGIN;

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(250) NOT NULL
);

INSERT INTO users (username, password_hash)
VALUES
('mary', 'aaaaaaaaaaaaaaaaaa'),
('connie', 'bbbbbbbbbbbbbbbb'),
('jon', 'ccccccccccccccccc'),
('vanessa', 'ddddddddddddddddd'),
('robert', 'eeeeeeeeeeeeeeeeee');

COMMIT;