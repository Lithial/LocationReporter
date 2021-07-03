CREATE DATABASE atlas;
CREATE USER lithial with password 'halo1234';
GRANT ALL PRIVILEGES ON DATABASE atlas TO lithial;
\c atlas


CREATE TABLE IF NOT EXISTS users(
            userId varchar PRIMARY KEY NOT NULL,
            nickname varchar NOT NULL,
            picture varchar NOT NULL,
            currentFriendCode varchar
        );
CREATE TABLE IF NOT EXISTS locations(
            userId varchar primary key NOT NULL,
            country varchar,
            lat varchar,
            lng varchar,
            timezone varchar, 
            showLocation boolean NOT NULL,
            FOREIGN KEY (userId) REFERENCES users(userId) on delete cascade on update cascade
        );
CREATE TABLE IF NOT EXISTS friends(
            id varchar primary key,
            userId varchar NOT NULL,
            friendId varchar NOT NULL,
            CONSTRAINT sender FOREIGN KEY (userId) REFERENCES users(userID) on delete cascade on update cascade,
            CONSTRAINT reciever FOREIGN KEY (friendId) REFERENCES users(userID) on delete cascade on update cascade    
        );
		

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO lithial;
GRANT ALL PRIVILEGES ON ALL SEQUENCES TO lithial;