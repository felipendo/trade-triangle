/**
 * This file gather utilities used on triangle calculations.
 */

// Constants

const TRIANGLE_TYPES = {
    EQUILATERAL: 'EQUILATERAL',
    ISOSCELES: 'ISOSCELES',
    SCALENE: 'SCALENE',
    INVALID: 'INVALID'
}

// Exceptions

function InvalidArgNumber (invalidNumber){
    console.log(`Expected 3 arguments, got: ${invalidNumber}`)
}

function InvalidType (type){
    console.log(`Arguments should be numbers, got: ${type}`)
}
InvalidType.prototype = Error.prototype
// Functions

/**
 * Check if triagle is valid
 * applying the 'Triangle Inequality Theorem'.
 * 
 * Throws: 'InvalidTriangle' if the sum of one
 * of the lengths is less or equal the remaining one.
 */
function triangleSidesValid (len1, len2, len3) {

    // validate arguments
    function validateArgs (args) {
        // validate number of arguments
        args = args.filter(arg => arg !== undefined)
        if (args.length !== 3) {
            throw new InvalidArgNumber(args.length)
        }

        // validate type
        for (var arg of args) {
            const type = typeof arg
            if (type !== 'number')  {
                throw new InvalidType(type)
            }
        }
    }
    validateArgs(Object.values(arguments))
    
    const lenPermutations = [
        [len1, len2, len3],
        [len1, len3, len2],
        [len3, len2, len1]
    ]

    for (var p of lenPermutations) {
        if (p[0] + p[1] <= p[2]) {
            return false
        }
    }
    return true
}

 /**
  * Given 3 triangle side lengths, returns
  * the triagle type: EQUILATERAL, ISOSCELES or SCALENE
  * 
  * If the triangle is invalid, returns INVALID.
  * More info: check 'validateTriangle'.
  */
function getTypeWithLengths (len1, len2, len3) {

    if (!triangleSidesValid(len1, len2, len3)) {
        return TRIANGLE_TYPES.INVALID
    }

    if (len1 === len2 && len2 === len3) {
        return TRIANGLE_TYPES.EQUILATERAL
    } else if (len1 !== len2 && len2 !== len3) {
        return TRIANGLE_TYPES.SCALENE
    } else {
        return TRIANGLE_TYPES.ISOSCELES
    }
}

module.exports = {
    getTypeWithLengths,
    triangleSidesValid,
    TRIANGLE_TYPES,
    exceptions: {
        InvalidType,
        InvalidArgNumber
    }
}