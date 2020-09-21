const { mapArrayToDict, numberOfFriends } = require('./chapter_01')

describe('chapter_01', () => {
    describe('mapArrayToDict', () => {
        const objects = [
            { commonKey: 'obj1' },
            { commonKey: 'obj2', otherKey: 28},
            { commonKey: 'obj75' }
        ]
        const commonKeys = Object.values(objects.map(obj => obj.commonKey))

        const mapped = mapArrayToDict(objects, 'commonKey');
        it('contains the correct key for every object in the array', () => {
            expect(Object.keys(mapped)).toEqual(expect.arrayContaining(commonKeys));
        })

        it('contains the correct value for every object in the array', () => {
            expect(Object.values(mapped)).toEqual(expect.arrayContaining([]));
        })
    })

    describe('numberOfFriends', () => {
        it('gets the length of the given user\'s friends array', () => {
            const user = { id: 42 };
            const friendshipsMap = {
                27: [1,2,3],
                42: [27, 28]
            };

            expect(numberOfFriends(user, friendshipsMap)).toBe(2);
        })
    })
})