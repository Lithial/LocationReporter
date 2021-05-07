
const userTable = `
CREATE TABLE IF NOT EXISTS users(
            userId varchar PRIMARY KEY NOT NULL,
            nickname varchar NOT NULL,
            picture varchar NOT NULL,
            currentFriendCode varchar
        );`

const locationTable = `
        CREATE TABLE IF NOT EXISTS locations(
            userId varchar primary key NOT NULL,
            country varchar,
            lat varchar,
            lng varchar,
            timezone varchar, 
            showLocation boolean NOT NULL,
            FOREIGN KEY (userId) REFERENCES users(userId) on delete cascade on update cascade
        );`

 const friendTable = `
        CREATE TABLE IF NOT EXISTS friends(
            id varchar primary key,
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
        INNER JOIN locations on users.userId = locations.userId
        WHERE users.currentFriendCode = '${friendCode}';
        `
}

getFriends = (id) => {
    return `
  SELECT friends.userId, nickname, picture, country, lat, lng, timezone
        FROM users
        INNER JOIN locations on users.userId = locations.userId
        INNER JOIN friends on users.userId = friends.userId
		WHERE friendid = '${id}'; 
    ` //user id
}

 createUser = (id, req, currentFriendCode) => {
    return `
        INSERT INTO users (userId, nickname, picture, currentFriendCode)
        VALUES ('${id}','${req.body.nickname}','${req.body.picture}', '${currentFriendCode}')
        ON CONFLICT DO NOTHING;
    `
 }

 createLocation = (id, req) => {
     return `
        INSERT INTO locations (userId, showLocation)
        VALUES ('${id}','false')
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
        INSERT INTO friends (id, userId, friendId)
        VALUES ('${id}${friendId}','${id}','${friendId}')
        ON CONFLICT DO NOTHING;`
}

 updateUser = (id, req) => {
    return `
        UPDATE users
        SET userID='${id}',
            nickname='${req.body.nickname}',
            picture='${req.body.picture}'
        WHERE userID = '${id}';`
}

 updateLocation = (id, req) => {
    return `
        UPDATE locations
        SET userID='${id}',
            country='${req.body.country}',
            lat='${req.body.lat}', 
            lng='${req.body.lng}', 
            timezone='${req.body.timezone}',
            showLocation='${req.body.showLocation}'
        WHERE userID = '${id}';`
}
updateShowLocation = (id, req) => {
    return `
        UPDATE locations
        SET userID='${id}',
            showLocation='${req.body.showLocation}'
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

deleteFriend = (userId, req) => {
    return `
        DELETE FROM friends
        WHERE id IN ('${userId}${req.body.friendId}','${req.body.friendId}${userId}');`
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
     deleteFriend:deleteFriend,
     updateFriendCode:updateFriendCode,
     updateShowLocation:updateShowLocation,
     userTable,
     locationTable,
     friendTable,
 }