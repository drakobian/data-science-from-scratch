const { friendships, friendsOfFriends, mapArrayToDict, numberOfFriends } = require('./chapter_01');
const { users } = require('./data.json');

describe('chapter_01', () => {
    describe('mapArrayToDict', () => {
        const objects = [
            { commonKey: 'obj1' },
            { commonKey: 'obj2', otherKey: 28},
            { commonKey: 'obj75' }
        ];
        const commonKeys = Object.values(objects.map(obj => obj.commonKey));

        const mapped = mapArrayToDict(objects, 'commonKey');
        it('contains the correct key for every object in the array', () => {
            expect(Object.keys(mapped)).toEqual(expect.arrayContaining(commonKeys));
        });

        it('contains the correct value for every object in the array', () => {
            expect(Object.values(mapped)).toEqual(expect.arrayContaining([]));
        });
    });

    describe('numberOfFriends', () => {
        it('gets the length of the given user\'s friends array', () => {
            expect(numberOfFriends(users[0], friendships)).toBe(2);
        });
    });

    describe('friendsOfFriends', () => {
        it('counts how many different friends a user has in common with users who are not their friends', () => {
            expect(friendsOfFriends(users[3], friendships)).toEqual({ 0: 2, 5: 1 });
        });
    });
});