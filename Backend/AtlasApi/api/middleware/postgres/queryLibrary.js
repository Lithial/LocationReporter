
const userTable = `
CREATE TABLE IF NOT EXISTS users(
            userId varchar PRIMARY KEY NOT NULL,
            nickname varchar NOT NULL,
            picture varchar NOT NULL,
            showLocation boolean NOT NULL,
            currentFriendCode varchar
        );`

const locationTable = `
        CREATE TABLE IF NOT EXISTS locations(
            userId varchar primary key NOT NULL,
            country varchar,
            lat varchar,
            lng varchar,
            timezone varchar, 
            FOREIGN KEY (userId) REFERENCES users(userId) on delete cascade on update cascade
        );`

 const friendTable = `
        CREATE TABLE IF NOT EXISTS friends(
            id serial primary key,
            userId varchar NOT NULL,
            friendId varchar NOT NULL,
            CONSTRAINT sender FOREIGN KEY (userId) REFERENCES users(userID) on delete cascade on update cascade,
            CONSTRAINT reciever FOREIGN KEY (friendId) REFERENCES users(userID) on delete cascade on update cascade    
        );`

 getUserWithLocation = (id) => {
     return `
        SELECT  *
        FROM users
        INNER JOIN locations on users.userId = locations.userId
        WHERE users.userId = '${id}';
        `
 }

getUser = (id) => {
    return `
        SELECT  *
        FROM users
        WHERE users.userId = '${id}';
        `
}

getPotentialFriend = (friendCode) => {
    return `
        SELECT  *
        FROM users
        WHERE currentFriendCode = '${friendCode}';
        `
}

getFriends = (id) => {
    return `
     SELECT nickname, picture, country, lat, lng, timezone
        FROM users
        INNER JOIN locations on users.userId = locations.userId
        INNER JOIN friends on users.userId = friends.userId
		WHERE friendid = '${id}'; 
    ` //user id
}

 createUser = (id, req, currentFriendCode) => {
    return `
        INSERT INTO users (userId, nickname, picture, showLocation, currentFriendCode)
        VALUES ('${id}','${req.body.nickname}','${req.body.picture}','${req.body.showLocation}', '${currentFriendCode}')
        ON CONFLICT DO NOTHING;
    `
 }

 createLocation = (id, req) => {
     return `
        INSERT INTO locations (userId)
        VALUES ('${id}')
        ON CONFLICT DO NOTHING;`
 }

getUser = (id) => {
    return `
        SELECT  *
        FROM users
        WHERE users.userId = ${id};
        `
}

createFriend = (id, friendId) => {
    return `
        INSERT INTO friends (userId, friendId)
        VALUES ('${id}','${friendId}')
        ON CONFLICT DO NOTHING;`
}

 updateUser = (id, req) => {
    return `
        UPDATE users
        SET userID='${id}',
            nickname='${req.body.nickname}',
            picture='${req.body.picture}',
            showLocation=${req.body.showLocation}
        WHERE userID = '${id}';`
}

 updateLocation = (id, req) => {
    return `
        UPDATE locations
        SET userID='${id}',
            country='${req.body.location.country}',
            lat='${req.body.location.lat}', 
            lng='${req.body.location.lng}', 
            timezone='${req.body.location.timezone}'
        WHERE userID = '${id}';`
}

updateFriendCode = (id, friendCode) => {
    return `
        UPDATE users
        SET currentFriendCode='${friendCode}'
        WHERE userID = '${id}';`
}

deleteUser = (id) => {
    return `
        DELETE FROM users
        WHERE userID = '${id}';`
}

deleteLocation = (id) => {
    return `
        DELETE FROM locations
        WHERE userID = '${id}';`
}

 module.exports = {
     getUser:getUser,
     getUserWithLocation:getUserWithLocation,
     getPotentialFriend:getPotentialFriend,
     getFriends:getFriends,
     createUser:createUser,
     createLocation:createLocation,
     createFriend: createFriend,
     updateUser:updateUser,
     updateLocation:updateLocation,
     deleteUser:deleteUser,
     deleteLocation:deleteLocation,
     updateFriendCode:updateFriendCode,

     userTable,
     locationTable,
     friendTable,
 }