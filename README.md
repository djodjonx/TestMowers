# Welcome to mowItUp

## Get started

* Clone the repo
```
git clone url
```

* Install dependencies

```
npm i
```

## Test the app

* ### Test with config file

  * #### Edit the test

    The first line is the size of your's area.

    __ex:__ For area 7 width x 7 height  ==>   7 7

    Then enter as many mowers as you like.

    A mower is programmed on 2 lines

      * The first line is for the start postion and the direction of the mower (directions are: N, E, S, W)

      __ex:__ start at position x:1 y:2 direction: north  ==>   1 2 N

      * The second line is for the actions of the mower (actions are: A, G, D)

      __ex:__ turn left, advanced, turn right, advanced,  advanced  ==>   GADAA


   * #### Finaly launch test

    ```
    npm start
    ```

* ### AutoTest with mochaJs

  * #### Edit the test

    ##### If you want edit the test edit the mochaTest file in test directory

    Write test in mocha like example

    __ex:__
    ```
    describe('mowItNow of space of 5 x 5, and a mower params 1 2 N GAGAGAGAA ', function () {
      it('should return 1 3 N', async function () {
      return assert.deepEqual(await mowItNow(5, 5, [1, 2, 'N', 'GAGAGAGAA']), ['1 3 N'])
      })
    })
    ```
    Attention, used only _deepEqual_ for test!

   * #### Finaly launch test

    ```
    npm run test
    ```


 

