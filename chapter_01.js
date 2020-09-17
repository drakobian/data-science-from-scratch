const { users, friendship_pairs } = require('./data.json');

// https://dev.to/devtronic/javascript-map-an-array-of-objects-to-a-dictionary-3f42
const friendships = Object.assign({}, ...users.map((user) => ({[user.id]: []})));

// make a map from user Id to friend Ids
for (const friendship of friendship_pairs) {
    friendships[friendship[0]].push(friendship[1]);
    friendships[friendship[1]].push(friendship[0]);
}

/** How many friends does user have? */
function number_of_friends(user) {
    user_id = user.id
    friend_ids = friendships[user_id];
    return friend_ids.length;
}

// count up the total number of friendships
const total_connections = users.reduce(function(total, currentUser){
    return total + number_of_friends(currentUser);
}, 0);

const num_users = users.length;
// and find the average number of connections each user has
const avg_connections = total_connections / num_users;

// make an array of arrays where the first item is
// the userId and the second item is how many friends they have
num_friends_by_id = users.map(user => [user.id, number_of_friends(user)])

// sort this array by number of friends, largest to smallest
num_friends_by_id.sort((list1, list2) => list2[1] - list1[1])
