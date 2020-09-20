const { mapArrayToDict } = require('./chapter_01')
const { exportAllDeclaration } = require('@babel/types')
const { enhanceUnexpectedTokenMessage } = require('@jest/transform/build/enhanceUnexpectedTokenMessage')

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

})