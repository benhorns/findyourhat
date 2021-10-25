// var stdin = process.stdin;
// stdin.setRawMode(true);
// stdin.resume();
// stdin.setEncoding('utf8');
// stdin.on('data', function(key){
//     console.clear()
//     if (key == '\u001B\u005B\u0041') {
//         printUp()
//     }
//     if (key == '\u001B\u005B\u0043') {
//         console.log('right')
//     }
//     if (key == '\u001B\u005B\u0042') {
//         console.log('down')
//     }
//     if (key == '\u001B\u005B\u0044') {
//         console.log('left') 
//     }

//     if (key == '\u0003') { process.exit(); }    // ctrl-c
// });

// function printUp () {
//     console.log('up');
// }

var keypress = require('keypress');
 
// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);
 
// listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {
  console.log('got "keypress"', key);
  console.log(key.name)
  if (key && key.ctrl && key.name == 'c') {
    process.stdin.pause();
  }
});
 
process.stdin.setRawMode(true);
process.stdin.resume();