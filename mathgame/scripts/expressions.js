/* This JavaScript file is for the use of generating random expressions. */

// These functions return random numbers based on the level

function rand() {
    return Math.random();
}

function randEasy() {
    return Math.floor(rand() * 10);
}

function random(level) {
    switch(level) {
        case 'Med':
            return rand() > 0.5 ? Math.floor(rand() * 20) : Math.floor(rand() * -20);
            break;
        case 'Hard':
            return rand() > 0.5 ? Math.floor(rand() * 100) : Math.floor(rand() * - 100);
            break;
        case 'Extreme':
            return rand() > 0.5 ? Math.floor(rand() * 1000) : Math.floor(rand() * -1000);
            break;
    }
}

function randElement(array) {
    return array[Math.floor(rand() * array.length)];
}


$('.example').each(function() {
    $(this).css({ 'color': 'white',
                  'background': randElement(colors),
                  'text-align': 'center',
                  'padding': '8px 0' });
});

function generateExpressions() {
    $('#game-block').append("<div class='exp1'>");
    $('#game-block').append("<div class='exp2'>");

    $('.exp1, .exp2').each(function() {
        $(this).css({ 'color': 'white',
                      'background': randElement(colors),
                      'text-align': 'center',
                      'padding': '8px 0' });

        switch(true) {
            case (level == 1):
                $(this).html(randEasy() + ' + ' + randEasy());
                break;
            case (level >= 2 && level <= 3):
                $(this).html(random('Med') + ' + ' + random('Med'));
                break;
            case (level >= 4 && level <= 5):
                $(this).html(random('Hard') + ' + ' + random('Hard'));
                break;
            case (level >= 6 && level <= 7):
                $(this).html(random('Hard') + ' ' + randElement(operators) + ' ' + random('Hard'));
                break;
            default:
                $(this).html(random('Extreme') + ' ' + randElement(operators) + ' ' + random('Extreme'));
                break;
        }

        var expressions = $(this).html().split(' ');
        var leftNum = Number(expressions[0]);
        var operator = expressions[1];
        var rightNum = Number(expressions[2]);
        var result = calculateExpression(leftNum, rightNum, operator);

        $(this).data('result', result);
    });
}

function calculateExpression(num1, num2, operator) {
    switch(operator) {
        case '+':
            return num1 + num2;
            break;
        case '-':
            return num1 - num2;
            break;
        case '*':
            return num1 * num2;
            break;
        case '/':
            return num1 / num2;
            break;
    }
}
