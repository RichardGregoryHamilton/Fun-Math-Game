function checkStorage(key) {
    var arrays = ['achievements', 'scores']
    if (!localStorage[key]) {
        localStorage[key] = arrays.indexOf(key) != -1 ? JSON.stringify([]): 0;
    }
}

checkStorage('achievements');
checkStorage('scores');
checkStorage('gamesPlayed');
checkStorage('totalScore');
