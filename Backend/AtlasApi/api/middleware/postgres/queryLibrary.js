 exports.userTable = `
        CREATE TABLE IF NOT EXISTS users(
            userId varchar PRIMARY KEY,
            nickname varchar,
            picture varchar,
            showLocation boolean,
            currentFriendCode varchar
        );
        `
 exports.locationTable = `
        CREATE TABLE IF NOT EXISTS locations(
            userId varchar,
            city varchar,
            country varchar,
            lat varchar,
            lng varchar,
            timezone varchar, 
            FOREIGN KEY (userId) REFERENCES users(userId) on delete cascade on update cascade
        );
        `
 exports.friendTable = `
        CREATE TABLE IF NOT EXISTS friends(
            id serial primary key,
            userId varchar,
            friendId varchar,
            FOREIGN KEY (userId) REFERENCES users(userID) on delete cascade on update cascade,
            FOREIGN KEY (friendId) REFERENCES users(userID) on delete cascade on update cascade    
        );
        `
