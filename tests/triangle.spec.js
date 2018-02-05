/* global LIB_PATH, describe, it */

const assert = require('assert')
const { triangle } = require(LIB_PATH)

const { triangleLensGen, genToList, assertThrows } = require('./utils')

const { getTypeWithLengths, TRIANGLE_TYPES, exceptions } = triangle
const { InvalidArgNumber, InvalidType } = exceptions

const N_SAMPLES = 3
// Sample generators: one for each triangle type
const scaleneGen = triangleLensGen((a, b, c) => a !== b && b !== c, N_SAMPLES)
const equilateralGen = triangleLensGen((a, b, c) => a === b && b === c, N_SAMPLES)
const isoscelesGen = triangleLensGen((a, b, c) => a === b && b !== c, N_SAMPLES)

/*
    Auxiliar assertion.
    testSet shape: {
        lengths: [lenght1, length2, length3],
        expected: <TRIANGLE_TYPES>
    }
*/
function test (testSet) {
    const l1 = testSet.lengths[0]
    const l2 = testSet.lengths[1]
    const l3 = testSet.lengths[2]
    const expected = testSet.expected
    const statement = `getTypeWithLengths(${l1}, ${l2}, ${l3}) ` +
        `should return ${expected}`
    it(statement, function () {
        const result = getTypeWithLengths(l1, l2, l3)
        assert.equal(result, expected)
    })
}
function assertTestSets (testSets) {
    for (var testSet of testSets) {
        test(testSet)
    }
}

// Test  sets
const toShape = (lengths, expected) => ({lengths, expected}) // sugar
const scalSets = genToList(scaleneGen)
    .map(lens => toShape(lens, TRIANGLE_TYPES.SCALENE))
const equiSets = genToList(equilateralGen)
    .map(lens => toShape(lens, TRIANGLE_TYPES.EQUILATERAL))
const isosSets = genToList(isoscelesGen)
    .map(lens => toShape(lens, TRIANGLE_TYPES.ISOSCELES))

const validTestSets = scalSets.concat(equiSets, isosSets)

// Make testset lenghts invalid, adding the
// two other sides length - check the inequality
// theorem, it's proven to work!
const invalidTestSets = validTestSets.map(t => {
    const l = t.lengths
    const newSideLen = l[0] + l[1] + l[2]
    return toShape([newSideLen, l[1], l[2]], TRIANGLE_TYPES.INVALID)
})

// Tests

describe('Test "triangle" module', function () {
    describe('Test "getTypeWithLengths"', function () {
        assertTestSets(validTestSets)

        assertTestSets(invalidTestSets)

        it('should throw "InvalidType" if any arg type is != "number"', function () {
            assertThrows(getTypeWithLengths.bind(null, 's', 1, 'b'), InvalidType)
        })

        it('should throw "InvalidArgNumber" if it receives less than 3 args', function () {
            assertThrows(getTypeWithLengths.bind(null, 's', 1), InvalidArgNumber)
        })
    })
})
