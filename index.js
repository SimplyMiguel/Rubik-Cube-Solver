(function() {
var start, progressHandle;

var progress = function() {
    // Add a dot each second
    $('#status').text(function(index, text) { return text + '.'; });
};

var initialized = function() {
    // Precomputing finished, stop adding dots
    clearInterval(progressHandle);

    // Show the duration of initialization
    var end = new Date,
        duration = (end - start) / 1000;
    $('#status').text('Initialization done in ' + duration + ' seconds.');

    // Show the scrambler
    $('#randomstate').css('visibility', 'visible');
    $('#randomstate button').on('click', generateScramble);
};

var generateScramble = function() {
    // Hide the initialization status on first scramble
    $('#status').hide();

    // Generate a scramble
    Cube.asyncScramble(function(alg) {
        var s = alg.replace(/\s+/g, ''),  // remove spaces
            url = "http://cube.rider.biz/visualcube.png?size=150&alg=" + s;
        $('#randomstate .result').html(alg + "<br><img src=\"" + url + "\">");
    });
};

$(function() {
    $('#status').text('Initializing');

    // Start measuring time
    start = new Date;

    // Start adding dots
    progressHandle = setInterval(progress, 1000);

    // Start precomputing
    Cube.asyncInit('/cubejs/lib/worker.js', initialized);
});
})();
console.log("BEGGINING TO CHECK IF THIS IS WORKING\n\n")
// const test = new Cube()
// let asString = test.asString()

// console.log(asString)
// console.log(test.isSolved())

// test.randomize()
// asString = test.asString()
// console.log(asString)
// console.log(test.isSolved())


// // NOW SOLVING 
// Cube.initSolver()
// let solved = test.solve()
// console.log(solved)

// NOW WHAT IS YOUR GOAL NOW!! 
// FIGURE OUT A WAY TO LINK COLORS TO MOVES MADE ON THE CUBE/ FIGURE OUT HOW TO SCRAMBLE IN A WAY THAT WILL WORK WITH YOUR WEBSITE IDEA 

console.log("END OF THE CONSOLE TO SEE IF ITS WORKING")