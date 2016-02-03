function checkStorage(key) {
    var arrays = ['mathAchievements', 'mathScores']
    if (!localStorage[key]) {
        localStorage[key] = arrays.indexOf(key)  -1 ? JSON.stringify([]): 0;
    }
}

checkStorage('mathAchievements');
checkStorage('mathScores');
checkStorage('mathGamesPlayed');
checkStorage('mathTotalScore');
