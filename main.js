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
        console.log('')
        console.log(this.print())
        console.log(this.field.length)
        console.log(this.field[0].length)
        // console.log(this.field[0].length)
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
                    if (xCoord <= this.field.length) {
                        this.movingTo(xCoord)
                    } else {
                        console.log('Out of bound!')
                        xCoord = this.field.length
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
                        if (yCoord <= this.field[0].length) {
                            this.movingTo(xCoord, yCoord)
                        } else {
                            console.log('Out of bounds!')
                            yCoord = this.field[0].length
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
                        const input = prompt('Want to play again? y/n');
                        switch(input) {
                            case 'y':
                                const r = parseInt(prompt('How many rows do you want on the board?'))
                                const c = parseInt(prompt('How many columns do you want on the board?'))
                                const p = parseInt(prompt('How many per do you want on the board?'))
                                this.field = Field.generateField(r,c,p)
                                xCoord = 0;
                                yCoord = 0;
                                this.getMove()
                                break;
                                case 'n':
                                    console.log('Okay thanks for playing!')
                                    break;
                                }
                            }
                        }
                        
                static generateField (rows, cols, percentage) {
                    let arr = []
                    let freq = Math.ceil((rows*cols) * (percentage/100))
                    console.log(arr.length)
                    for (let i = 0; i < rows; i++) {
                        arr.push( new Array(cols).fill(fieldCharacter))
                    }   
                    arr[0][0] = pathCharacter;
                    console.log(Math.ceil(freq))
                    let i = 0;
                    do {
                        let randRow = (Math.floor(Math.random() * rows))
                        let randCol = (Math.floor(Math.random() * cols))
                        if (arr[randRow][randCol] != hole && arr[randRow][randCol] != pathCharacter) {
                            arr[randRow][randCol] = hole;
                            i++;
                        }
                    }
                    while (i < freq) 
                    i = 0;
                    do {
                        let randRow = (Math.floor(Math.random() * rows))
                        let randCol = (Math.floor(Math.random() * cols))
                        if (arr[randRow][randCol] != hole && arr[randRow][randCol] != pathCharacter) {
                            arr[randRow][randCol] = hat;
                            i++;
                        }
                    }
                    while (i < 1) 
                    return arr
                }

            }
                
                // const myField = new Field([
                //     ['*', '░', 'O'],
                //     ['░', 'O', '░'],
                //     ['░', '^', '░'],
                // ]);
                
                // myField.getMove()

                const myOtherField = new Field(Field.generateField(4,8,20))
                // console.log(myOtherField.field)
                myOtherField.getMove()
                    



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