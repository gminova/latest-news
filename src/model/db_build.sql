BEGIN;

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(250) NOT NULL
);

INSERT INTO users (username, password_hash)
VALUES
('mary', '$2b$10$A4du6FNkp3uC5o2GS.LNLeoQj6qAXMJ42bp4ZgrdMw5asWgwl2iKa'),
('connie', '$2b$10$A4du6FNkp3uC5o2GS.LNLeoQj6qAXMJ42bp4ZgrdMw5asWgwl2iKa'),
('jon', '$2b$10$A4du6FNkp3uC5o2GS.LNLeoQj6qAXMJ42bp4ZgrdMw5asWgwl2iKa'),
('vanessa', '$2b$10$A4du6FNkp3uC5o2GS.LNLeoQj6qAXMJ42bp4ZgrdMw5asWgwl2iKa'),
('robert', '$2b$10$A4du6FNkp3uC5o2GS.LNLeoQj6qAXMJ42bp4ZgrdMw5asWgwl2iKa');

COMMIT;