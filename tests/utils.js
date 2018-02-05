/* global LIB_PATH */

/*
 Test utilities.

 Note: as this file grows it should be split into another
 file, and placed in another folder with its tests.
*/

const assert = require('assert')
const { triangleSidesValid } = require(LIB_PATH).triangle

/**
 * Receives a test function 'testFn' and generates
 * a number 'n' of 3-length-samples such that for
 * each returned sample [a,b,c]:
 *   -> testFn(a, b, c) is true.
 * 
 * Note: the generated samples will be always valid.
 * Check: 'triangleSidesValid'.
 */
function* triangleLensGen (testFn, n) {

    const MAX_VALUE = 500
    const MIN_VALUE = 1
    const RANGE = MAX_VALUE - MIN_VALUE

    // generate a number where: MIN_VALUE =< number =< MAX_VALUE
    const gen = () => {
        return Math.floor((MIN_VALUE + (Math.random() * MAX_VALUE)) % (RANGE))
    }

    while (n > 0) {
        const a = gen()
        const b = gen()
        const c = gen()
        if (triangleSidesValid(a,b,c) && testFn(a,b,c)) {
            n--
            yield [a,b,c]
        }
    }
}

// Exhausts a generator, returning
// a list with all its generated items.
function genToList (gen) {
    const items = []
    for (var item of gen) {
        items.push(item)
    }
    return items
}

function assertThrows(fn, CustomError) {

    try {
        fn()
    } catch (e) {
        if (e instanceof CustomError){
            return
        }
    }
    assert.fail()
}

module.exports = {
    triangleLensGen,
    genToList,
    assertThrows
}