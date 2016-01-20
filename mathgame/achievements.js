function updateAchievements() {
    var numAchievements = JSON.parse(localStorage["achievements"]).length;
    $(".achievements-table tr td:first-child").each(function() {
        var index = $(this).html().match(/\d/)[0];
        $(this).parent().prop("class", index <= numAchievements ? "unlocked": "locked");
    });
}
    
updateAchievements();
    