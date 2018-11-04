/**
 * Functions primarily used to render the UI for GameOfLife.
 *
 * @author: Jessica Nierth
 * @date: 10/24/2018
 */
var GameOfLifeRender = (function GameOfLifeRender() {
    var board,
        counter,
        errorDom,
        input;

    function _initializeBoard(){
        board = document.getElementById("board");
        counter = document.getElementById("counter");
        input = document.getElementById("input");

        var inputData = getInputAndRender();

        if(inputData.length === 0) {
            _showError('The input data doesn\'t have any values');
        } else {
            return inputData;
        }
    }

    function _showError(msg) {
        if(!errorDom) {
            errorDom = document.getElementById("error");
        }

        errorDom.innerHTML = '<div class="msg">' + msg + ".</div>";
    }

    function _hideError() {
        if(!errorDom) {
            errorDom = document.getElementById("error");
        }
        errorDom.innerHTML = "";
    }

    function _normalizeInput() {
        if(!input) {
            input = document.getElementById("input");
        }

        input.value = input.value.replace(/\s/g,"");
    }

    function getInputAndRender() {
        try {
            return JSON.parse(input.value);
        } catch (e) {
            _showError('The provided JSON is invalid');
        }
    }

    function _renderBoard(inputArray) {
        board.innerHTML = "";

        // TODO: make sure this is centered
        board.setAttribute("style","width:" + inputArray[0].length*15 + "px");

        for(var i = 0, len = inputArray.length; i < len; i++) {
            _renderBoardByRow(inputArray[i]);
        }
    }

    function _renderCounter(count) {
        counter.innerHTML = count;
    }

    function _renderBoardByRow(row) {
        var r = document.createElement("div");

        r.classList.add("row");

        for(var i = 0,len = row.length; i < len; i++) {
            var currentRow = row[i];

            (currentRow === 1) ? r.append(_renderDivs(true)) : r.append(_renderDivs(false));

        }

        board.append(r);

        board.attributes.styles = "width:100px";

    }


    function _renderDivs(state) {
        var div = document.createElement("div");

        if(state === true) {
            div.classList.add("alive");
        }

        return div;
    }

    function _renderWarning() {
        var div = document.createElement("div");

        div.classList.add("warning");
        div.innerText = "END";
        board.appendChild(div);
    }

    return {
        hideError: _hideError,
        initializeBoard: _initializeBoard,
        renderCounter: _renderCounter,
        renderBoard: _renderBoard,
        renderWarning: _renderWarning,
        normalizeInput: _normalizeInput
    };
}());