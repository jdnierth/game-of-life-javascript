/**
 * SOME DESCRIPTION
 *
 * @author: Jessica Nierth
 * @date: 10/24/2018
 */
var GameOfLifeLogic = (function GameOfLifeLogic() {

    var checkerHeight = null;

    function getCheckerHeight(inputArray) {
        if (!checkerHeight && inputArray[0]) {
            checkerHeight = inputArray[0].length;
        } else {
            return checkerHeight;
        }
    }

    function getNumberOfLivingCells(inputArray, x, y) {
        var alive = 0;

        if (inputArray[x]) {
            // top middle
            if (inputArray[x][y - 1]) {
                alive += (inputArray[x][y - 1] === 1) ? 1 : 0;
            }

            // bottom middle
            if (inputArray[x][y + 1]) {
                alive += (inputArray[x][y + 1] === 1) ? 1 : 0;
            }
        }

        if (inputArray[x + 1]) {

            // bottom right
            if (inputArray[x + 1][y - 1]) {
                alive += (inputArray[x + 1][y - 1] === 1) ? 1 : 0;
            }

            // right
            if (inputArray[x + 1][y]) {
                alive += (inputArray[x + 1][y] === 1) ? 1 : 0;
            }

            // top right
            if (inputArray[x + 1][y + 1]) {
                alive += (inputArray[x + 1][y + 1] === 1) ? 1 : 0;
            }
        }

        if (inputArray[x - 1]) {
            // bottom left
            if (inputArray[x - 1][y - 1]) {
                alive += (inputArray[x - 1][y - 1] === 1) ? 1 : 0;
            }

            // left
            if (inputArray[x - 1][y]) {
                alive += (inputArray[x - 1][y] === 1) ? 1 : 0;
            }

            // top left
            if (inputArray[x - 1][y + 1]) {
                alive += (inputArray[x - 1][y + 1] === 1) ? 1 : 0;
            }
        }

        return alive;
    }

    /**
     * Returns the status of a given cell according to the list of rules:
     *
     * 1. Any live cell with fewer than 2 live neighbors dies (underpopulation)
     * 2. Any live cell with 2 or 3 live neighbors lives on to the next generation
     * 3. Any live cell with more than 3 live neighbors dies (overpopulation)
     * 4. Any dead cell with exactly three live neighbors becomes a live cell (reproduction)
     *
     * @param {Number} currentStatus current status of the cell
     * @param {Number} nofAlive number of alive cells
     * @return {Number} depending on the number of alive cells returns the new status that should be set for that particular cell that the nofAlive belong to.
     */
    function getNewCellStatus(currentStatus, nofAlive) {

        if (currentStatus === 1) {
            // rule 1 and 3
            if (nofAlive < 2 || nofAlive > 3) {
                return 0;
            }

            // rule 2
            if (nofAlive == 2 || nofAlive == 3) {
                return 1;
            }

        } else {
            // rule 4
            if (nofAlive === 3) {
                return 1;
            }
        }

        return 0;
    }

    function getNewCellStateInput(inputArray) {
        var outputArray = _deepClone(inputArray);

        // Loop through the rows (x)
        for (var i = 0, l1 = inputArray.length; i < l1; i++) {
            // Loop through the columns (y)
            for (var j = 0, l2 = inputArray[i].length; j < l2; j++) {
                var cells = getNumberOfLivingCells(inputArray, i, j);

                outputArray[i][j] = getNewCellStatus(inputArray[i][j], cells);
            }
        }

        // If first and last row are not empty, add one
        _normalizeChecker(outputArray);

        return outputArray;
    }

    function _checkEmptyRow(row) {
        var sum = row.reduce(_sum);

        return (sum === 0);
    }

    function _sum(acc, cur) {
        return acc + cur;
    }

    function _checkEmptyColumn(inputArray, index) {
        var sum = 0;
        for (var row = 0, rowLength = inputArray.length; row < rowLength; row++) {
            var columnValue = inputArray[row][index];
            sum = sum + inputArray[row][index];
        }

        return (sum === 0);
    }

    function _normalizeChecker(inputArray) {

        if (!_checkEmptyRow(inputArray[0])) {
            _addNewRow(inputArray, 0);
        }

        if (!_checkEmptyRow(inputArray[inputArray.length - 1])) {
            _addNewRow(inputArray, inputArray.length);
        }

        if (!_checkEmptyColumn(inputArray, 0)) {
            _addNewColumn(inputArray, 0);
        }

        if (!_checkEmptyColumn(inputArray, inputArray[0].length-1)) {
            _addNewColumn(inputArray, inputArray[0].length);
        }
    }

    function _addNewColumn(inputArray, index) {
        var l1 = inputArray.length;

        for (var r = 0; r < l1; r++) {
            inputArray[r].splice(index, 0, 0);
        }

    }

    function _addNewRow(inputArray, index) {
        var columnDummy = new Array(inputArray[0].length);

        for (var c = 0; c < columnDummy.length; c++) {
            columnDummy[c] = 0;
        }

        inputArray.splice(index, 0, columnDummy);
    }

    function _deepClone(item) {
        if (Array.isArray(item)) {
            var newArr = [];
            for (var i = item.length; i-- > 0;) {
                newArr[i] = _deepClone(item[i]);
            }
            return newArr;
        }
        if (typeof item === 'function' && !(/\(\) \{ \[native/).test(item.toString())) {
            var obj;
            eval('obj = ' + item.toString());
            for (var k in item) {
                obj[k] = _deepClone(item[k]);
            }
            return obj;
        }
        if (item && typeof item === 'object') {
            var obj = {};
            for (var k in item) {
                obj[k] = _deepClone(item[k]);
            }
            return obj;
        }
        return item;
    }

    function isEquivalent(a, b) {
        return JSON.stringify(a) === JSON.stringify(b);
    }

    return {
        getCheckerHeight: getCheckerHeight,
        getNewCellStateInput: getNewCellStateInput,
        isEquivalent: isEquivalent
    };
}());