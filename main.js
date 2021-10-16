const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

let xCoord = 0
let yCoord = 0


class Field {
    
    constructor(field) {
        this.field = field
    }
    
    print() {
        return this.field.join('\n').replace(/,/g, '')
    }

    getMove() {
        console.log(this.print())
        const input = prompt('What is your move? u: up, d: down, l: left, r: right ');
        switch(input) {
            case 'u':
                xCoord -=1
                if (xCoord >= 0) {
                    this.movingTo(xCoord)
                } else {
                    console.log('Out of bound!')
                    xCoord = 0
                    this.getMove()
                }
                break;
                case 'd':
                    xCoord +=1
                    if (xCoord <= 2) {
                        this.movingTo(xCoord)
                    } else {
                        console.log('Out of bound!')
                        xCoord = 2
                        this.getMove()
                    }
                break;
                case 'l':
                    yCoord -=1
                    if (yCoord >= 0) {
                        this.movingTo(xCoord, yCoord)
                    } else {
                        console.log('Out of bound!')
                        yCoord = 0
                        this.getMove()
                    }
                    break;
                    case 'r':
                        yCoord +=1
                        if (yCoord <= 2) {
                            this.movingTo(xCoord, yCoord)
                        } else {
                            console.log('Out of bounds!')
                            Coord = 2
                            this.getMove()
                    }
                break;
        }
    }
                    
                    movingTo = (inputX = xCoord, inputY = yCoord,) => {
                        // myField.field[xCoord-1][yCoord] = '░';
                        if (this.field[xCoord][yCoord] === fieldCharacter) {
                            this.field[xCoord][yCoord] = pathCharacter
                            // this.field.player = 'X';
                            // this.field[xCoord][yCoord] = pathCharacter;
                            console.log(this.print())
                            this.getMove()
                        } else {
                            if (this.field[xCoord][yCoord] === hat ) {
                        
                            console.log('Congratulations you found your hat!')
                            this.field[xCoord][yCoord] = '!'
                            console.log(this.print())
                            } else {
                            console.log('Oops you fell down a hole.')
                            this.field[xCoord][yCoord] = 'X'
                            console.log(this.print())
                        }
                    }
                }

                static generateField (rows, cols, percentage) {
                    let tmpArr = []
                    let arr = []
                    let freq = (rows*cols) * (percentage/100)
                    let randRow = Math.Floor(Math.random() * rows);
                    let randCol = Math.Floor(Math.random() * cols);
                    console.log(randRow)
                    console.log(randRow)
                    console.log(randRow)
                    console.log(randRow)
                    console.log(randCol)
                    console.log(randCol)
                    console.log(randCol)
                    // console.log(typeof rows)
                    // console.log(typeof cols)
                    // console.log(typeof percentage)
                    // console.log(typeof freq)
                    // console.log(freq)
                    for (let i = 0; i < rows*cols - freq; i++) {
                        tmpArr.push(fieldCharacter)
                    }
                    for (let i =0; i < freq; i++) {
                        let index = Math.round(Math.random() * (tmpArr.length - 1));
                        tmpArr.splice(index,0, hole)
                    }
                    for (var i = 0; i < rows; i++) {
                        let row = tmpArr.slice( i * cols, (i + 1) * rows);
                        arr.push(row);
                    }
                    if (arr[(Math.floor(Math.random() * rows))][(Math.floor(Math.random() * cols))] !== hole) {

                    } 
                    // arr[(Math.floor(Math.random() * rows))][(Math.floor(Math.random() * cols))] = 'P'
                    return arr
                }
            }
                
                // const myField = new Field([
                //     ['*', '░', 'O'],
                //     ['░', 'O', '░'],
                //     ['░', '^', '░'],
                // ]);
                
                // myField.getMove()

                const myOtherField = new Field(Field.generateField(3,3,20))
                console.log(myOtherField.print())
                



// var stdin = process.stdin;
// stdin.setRawMode(true);
// stdin.resume();
// stdin.setEncoding('utf8');

// stdin.on('data', function(key){
//     if (key == '\u001B\u005B\u0041') {
//         console.log('up'); 
//     }
//     if (key == '\u001B\u005B\u0043') {
//         console.log('right'); 
//     }
//     if (key == '\u001B\u005B\u0042') {
//         console.log('down'); 
//     }
//     if (key == '\u001B\u005B\u0044') {
//         console.log('left'); 
//     }

//     if (key == '\u0003') { process.exit(); }    // ctrl-c
// });