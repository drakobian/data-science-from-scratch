const { friendshipPairs, interests, users } = require('./data.json');

// https://dev.to/devtronic/javascript-map-an-array-of-objects-to-a-dictionary-3f42
const mapArrayToDict = function(objs, key, defaultVal = () => []) {
    return Object.assign({}, ...objs.map((obj) => ({ [obj[key]]: defaultVal() })));
}
const friendships = mapArrayToDict(users, 'id');

// make a map from user Id to friend Ids
for (const friendship of friendshipPairs) {
    friendships[friendship[0]].push(friendship[1]);
    friendships[friendship[1]].push(friendship[0]);
}

/** How many friends does user have? */
const numberOfFriends = function(user, friendshipsMap) {
    userId = user.id;
    friendIds = friendshipsMap[userId];
    return friendIds.length;
}

// count up the total number of friendships
const totalConnections = users.reduce(function(total, currentUser){
    return total + numberOfFriends(currentUser, friendships);
}, 0);

const num_users = users.length;
// and find the average number of connections each user has
const avgConnections = totalConnections / num_users;

// make an array of arrays where the first item is
// the userId and the second item is how many friends they have
const numberOfFriendsById = users.map(user => [user.id, numberOfFriends(user, friendships)]);

// sort this array by number of friends, largest to smallest
numberOfFriendsById.sort((list1, list2) => list2[1] - list1[1]);

const friendsOfFriends = function(user, friendshipsMap) {
    const userId = user.id;
    const friendCounts = {};

    for (const friendId of friendshipsMap[userId]) {
        for (const friendOfFriendId of friendshipsMap[friendId]) {
            if (friendOfFriendId !== userId && friendshipsMap[userId].indexOf(friendOfFriendId) === -1) {
                friendCounts[friendOfFriendId] = (friendCounts[friendOfFriendId] || 0) + 1
            }
        }
    }

    return friendCounts;
}

const dataScientistsWhoLike = function(targetInterest) {
    const likers = [];

    for (const interestPair of interests) {
        if (interestPair[1] === targetInterest) {
            likers.push(interestPair[0])
        }
    }

    return likers;
};

userIdsByInterest = {};
interestsByUserId = {};

for (const interestPair of interests) {
    userId = interestPair[0];
    interest = interestPair[1];

    userIdsByInterest[interest] = (userIdsByInterest[interest] && [...userIdsByInterest[interest], userId]) || [userId];
    interestsByUserId[userId] = (interestsByUserId[userId] && [...interestsByUserId[userId], interest]) || [interest];
}

const mostCommonInterestsWith = function(user, usersByInterestMap, interestsByUserMap) {
    const userId = user.id;
    const interestCounts = {};

    for (const interest of interestsByUserMap[userId]) {
        for (const interestedUserId of usersByInterestMap[interest]) {
            if (interestedUserId !== userId) {
                interestCounts[interestedUserId] = (interestCounts[interestedUserId] || 0) + 1
            }
        }
    }

    return interestCounts;
}
    
module.exports = {
    dataScientistsWhoLike,
    friendships,
    friendsOfFriends,
    interestsByUserId,
    mapArrayToDict,
    mostCommonInterestsWith,
    numberOfFriends,
    userIdsByInterest
}