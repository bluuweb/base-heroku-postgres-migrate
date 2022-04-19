DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS users;

CREATE EXTENSION pgcrypto;

CREATE TABLE IF NOT EXISTS users (
	uid SERIAL PRIMARY KEY,
	username VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL,
	role VARCHAR(100) NOT NULL DEFAULT 'customer'
);

CREATE TABLE IF NOT EXISTS books (
	name VARCHAR(255) NOT NULL,
	uid INT REFERENCES users(uid)
);

INSERT INTO users (username, email, password, role) 
VALUES ('admin', 'admin@test.com', crypt('123123', gen_salt('bf')), 'admin');
INSERT INTO users (username, email, password) 
VALUES ('dexter', 'dexter@test.com', crypt('321321', gen_salt('bf')));


