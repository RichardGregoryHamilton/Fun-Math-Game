//modifying the Array class to reuse common methods

Array.prototype.includes = function(item) {
    return this.indexOf(item) > -1;
}

function makeUnique(array) {
    return array.filter(function(element, index) {
        return array.indexOf(element) === index;
    });
}
 
Array.prototype.mapValues = function(value) { 
    return this.map(function(e) { 
        return e[value] 
    })
}

Array.prototype.sum = function(array) { 
    return this.reduce(function(a,b) { 
        return a + b 
    }) 
}
