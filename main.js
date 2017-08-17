$(document).ready(function() {

    // Initialise variables
    var x = true;
    var comp = true;
    var board = {
        tl: 0,
        tm: 0,
        tr: 0,
        ml: 0,
        mm: 0,
        mr: 0,
        bl: 0,
        bm: 0,
        br: 0
    };
    var turn;

    // Hide the board in the beginning
    $('.board').hide();
    $('.end').hide();

    // Click events to select player settings
    $('#x').click(function(event) {
        x = true;
        $('#x').addClass('selected');
        $('#o').removeClass('selected');
    });
    $('#o').click(function(event) {
        x = false;
        $('#o').addClass('selected');
        $('#x').removeClass('selected');
    })
    $('#comp').click(function(event) {
        comp = true;
        $('#comp').addClass('selected');
        $('#player').removeClass('selected');
    });
    $('#player').click(function(event) {
        comp = false;
        $('#player').addClass('selected');
        $('#comp').removeClass('selected');
    });

    // Play button to start the game with current settings
    $('#play').click(function(event) {
        $('.settings').hide();
        $('.board').show();
        turn = x;
    });

    function areEqual() {
        var len = arguments.length;
        for (var i=1; i<len; i++) {
            if (arguments[i] === 0 || arguments[i] !== arguments[i-1]) {
                return false;
            }
        }
        return true;
    }

    function showBoard() {
        for (var cell in board) {
            if (board[cell]) {
                if (board[cell] === 1) {
                    $("#" + cell).text("X");
                }
                else {
                    $("#" + cell).text("O");
                }
            }
            else {
                $("#" + cell).text("");
            }
        }
    }
    
    function reset() {
        resetBoard();
        showBoard();
        x = true;
        comp = true;
        $('.end').hide();
        $('.settings').show();
    }

    function resetBoard() {
        for (var cell in board) {
            board[cell] = 0;
        }
    }

    function showEnd(player, tie) {
        $('.board').hide();
        $('.end').show();
        if (!tie) {
            console.log(x);
            if (!x) {
                $('.end').text("Player" + " X " + "Wins!");
            }
            else {
                $('.end').text("Player" + " O " + "Wins!");            
            }
        }
        else {
            $('.end').text("It's a tie!");
        }
    }
    function checkEnd() {
        if (areEqual(board.tl, board.tm, board.tr) ||
            areEqual(board.ml, board.mm, board.mr) ||
            areEqual(board.bl, board.bm, board.br) ||
            areEqual(board.tl, board.ml, board.bl) ||
            areEqual(board.tm, board.mm, board.bm) ||
            areEqual(board.tr, board.mr, board.br) ||
            areEqual(board.tl, board.mm, board.br) ||
            areEqual(board.bl, board.mm, board.tr)) {
            
            if (comp) {
                showEnd(false, false);
            }
            else {
                showEnd(x, false);
            }
        }
        else if (board.tl && board.tm && board.tr &&
                 board.ml && board.mm && board.mr &&
                 board.bl && board.bm && board.br) {
            showEnd(x, true);
        }        
    }

    function calculateMove() {
        switch (Math.floor(Math.random() * 9)) {
            case 0:
                return "tl";
            case 1:
                return "tm";
            case 2:
                return "tr";
            case 3:
                return "ml";
            case 4:
                return "mm";            
            case 5:
                return "mr";
            case 6:
                return "bl";            
            case 7:
                return "bm";
            case 8:
                return "br";
        }
    }

    $('.square').click(function(event) {
        var id = event.target.id;
        if (comp && turn || !comp) {
            if (!(board[id] > 0)) {
                if (x) {
                    board[id] = 1;
                    x = false;
                }
                else {
                    board[id] = 2;
                    x = true;
                }
            }
        }
        if (comp) {
            do {
                var move = calculateMove();
            } while (board[move] !== 0)
            if (x) {
                board[move] = 1;
                x = false;
            }
            else {
                board[move] = 2;
                x = true;
            }
        }
        showBoard();
        checkEnd();

    });
    $('.end').click(function(event) {
        reset();
    });



});