var assert = require('assert')
var mowItNow = require('../lib/mowItNow')

describe('mowItNow of space of 5 x 5, and a mower params 1 2 N GAGAGAGAA ', function () {
  it('should return 1 3 N', async function () {
    return assert.deepEqual(await mowItNow(5, 5, [1, 2, 'N', 'GAGAGAGAA']), ['1 3 N'])
  })
})

describe('mowItNow of space of 5 x 5, and a mowers params [1 2 N GAGAGAGAA, 3 3 E ADAADADDA]', function () {
  it('should return 1 3 N, 4 1 E', async function () {
    assert.deepEqual(await mowItNow(5, 5, [[1, 2, 'N', 'GAGAGAGAA'], [3, 3, 'E', 'ADAADADDA']]), ['1 3 N', '4 1 E'])
  })
})

describe('mowItNow of space of 5 x 5, and a mowers params [1 2 N GAGAGAGAA, 3 3 E ADAADADDA, 5 2 S AGAGAADAGA]', function () {
  it('should return 1 3 N, 4 1 E, 5 4 E', async function () {
    assert.deepEqual(await mowItNow(5, 5, [[1, 2, 'N', 'GAGAGAGAA'], [3, 3, 'E', 'ADAADADDA'], [5, 2, 'S', 'AGAGAADAGA']]), ['1 3 N', '4 1 E', '5 4 N'])
  })
})

describe('mowItNow of space of 5 x 5, and a mowers params [1 2 N GAGAGAGAA, 3 3 E ADAADADDA, 5 2 S AGAGAADAGA, 1 4 W AADADAGA]', function () {
  it('should return 1 3 N, 4 1 E, 5 4 E, 1 5 N', async function () {
    assert.deepEqual(await mowItNow(5, 5, [[1, 2, 'N', 'GAGAGAGAA'], [3, 3, 'E', 'ADAADADDA'], [5, 2, 'S', 'AGAGAADAGA'], [1, 4, 'W', 'AADADAGA']]), ['1 3 N', '4 1 E', '5 4 N', '1 5 N'])
  })
})

describe('mowItNow of space of 5 x 5, and a mowers params [1 2 N GAGAGAGAA, 3 3 E ADAADADDA, 5 2 S AGAGAADAGA, 5 0 N AAGADAGDG]', function () {
  it('should return 1 3 N, 4 1 E, 5 4 E, 4 3 W', async function () {
    assert.deepEqual(await mowItNow(5, 5, [[1, 2, 'N', 'GAGAGAGAA'], [3, 3, 'E', 'ADAADADDA'], [5, 2, 'S', 'AGAGAADAGA'], [5, 0, 'N', 'AAGADAGDG']]), ['1 3 N', '4 1 E', '5 4 N', '4 3 W'])
  })
})





