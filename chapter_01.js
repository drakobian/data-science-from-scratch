const { users, friendship_pairs } = require('./data.json');

// https://dev.to/devtronic/javascript-map-an-array-of-objects-to-a-dictionary-3f42
const friendships = Object.assign({}, ...users.map((user) => ({[user.id]: []})));

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

const total_connections = users.reduce(function(total, currentUser){
    return total + number_of_friends(currentUser);
}, 0);

const num_users = users.length;
const avg_connections = total_connections / num_users;