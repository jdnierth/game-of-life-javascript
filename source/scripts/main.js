function getCheckerSize() {
}

/**
 * Game of life:
 *
 * Environment:
 * - Grid of square cells which can have each of which is in one of two possible states: alive | dead
 * - Every cell interacts with its 8 adjacent neighbours
 *
 * Cell rules:
 * - Any live cell with fewer than 2 live neighbors dies (underpopulation)
 * - Any live cell with 2 or 3 live neighbors lives on to the next generation
 * - Any live cell with more than 3 live neighbors dies (overpopulation)
 * - Any dead cell with exactly three live neighbors becomes a live cell (reproduction)
 *
 * Generations:
 * - Initial pattern constitutes the seed of the system
 * - 1st generation: Is created by applying the above rules simultaneously to every cell in the seed (tick)
 * - The rules continue to be applied repeatedly to create futher generations.
 *
 * [XOO]
 * [000]
 * [00X]
 *
 * @author: Jessica Nierth
 * @date: 10/24/2018
 */
(function Main(gameOfLifeLogic, gameOfLifeRender) {

    var counter = 0,
        // var inputArray =    [
        //                         [0,1,0,1],
        //                         [1,1,0,1],
        //                         [0,0,0,1],
        //                         [0,1,0,1]
        //                     ],
        // var inputArray =    [
        //                         [0,0,0,0,0,0],
        //                         [0,1,0,0,0,0],
        //                         [0,0,1,1,1,0],
        //                         [0,0,0,0,0,0]
        //                     ],
        // var inputArray =    [
        //                         [0,1,1],
        //                         [1,1,1],
        //                         [1,1,1]
        //                     ],
        // beacon
        // var inputArray =    [
        //                         [0,0,0,0,0,0],
        //                         [0,1,1,0,0,0],
        //                         [0,1,0,0,0,0],
        //                         [0,0,0,0,1,0],
        //                         [0,0,0,1,1,0],
        //                         [0,0,0,0,0,0]
        //                     ],
        // die hard
        // var inputArray =    [
        //                         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        //                         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        //                         [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
        //                         [0,0,0,1,1,0,0,0,0,0,0,0,0,0,0],
        //                         [0,0,0,0,1,0,0,0,1,1,1,0,0,0,0],
        //                         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        //                         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        //                     ],
        // Acorn
        // var inputArray = [
        //  [0,0,0,0,0,0,0,0,0],
        //  [0,0,1,0,0,0,0,0,0],
        //  [0,0,0,0,1,0,0,0,0],
        //  [0,1,1,0,0,1,1,1,0]
        // ],
        // var inputArray =    [
        //                         [1,1,1,1],
        //                         [1,1,0,1],
        //                         [1,0,1,1],
        //                         [1,1,1,1]
        //                     ],
        // var inputArray =    [
        //                         [1,1,1,1],
        //                         [1,1,1,1],
        //                         [1,1,1,1],
        //                         [1,1,1,1]
        //                     ],
        outputArray = null;

    document.getElementById('input').onpaste = gameOfLifeRender.normalizeInput;

    document.getElementById('run').onclick = function () {
        gameOfLifeRender.hideError();
        gameOfLifeRender.normalizeInput();
        // Reset
        counter = 0;
        outputArray = null;

        if (interval) {
            clearInterval(interval);
        }

        var inputArray = gameOfLifeRender.initializeBoard();

        if (inputArray) {
            gameOfLifeLogic.getCheckerHeight(inputArray);

            var interval = setInterval(function () {
                counter = counter + 1;

                if (!outputArray) {
                    outputArray = gameOfLifeLogic.getNewCellStateInput(inputArray);

                    gameOfLifeRender.renderCounter(counter);

                } else {
                    inputArray = outputArray;

                    outputArray = gameOfLifeLogic.getNewCellStateInput(outputArray);

                    gameOfLifeRender.renderCounter(counter);

                    // If outputArray === inputArray
                    if (GameOfLifeLogic.isEquivalent(inputArray, outputArray)) {
                        GameOfLifeRender.renderWarning();
                        clearInterval(interval);
                        return;
                    }
                }

                gameOfLifeRender.renderBoard(outputArray);

            }, 100)
        }
    };

})(GameOfLifeLogic, GameOfLifeRender);