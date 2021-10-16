const prompt = require('prompt-sync')({sigint: true});
const chalk = require('chalk');

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
        const badMove = 'Out of bounds! try again!'
        const moves ='udlr'
        console.clear()
        console.log(chalk.blue.bgRed.bold('Find your Hat!'));
        console.log(this.print())
        const input = prompt('What is your move? u: up, d: down, l: left, r: right ');
        if (!moves.includes(input)) {
            this.getMove()
        }
        switch(input) {
            case 'u':
                xCoord -=1
                if (xCoord >= 0) {
                    this.movingTo(xCoord)
                } else {
                    console.log(badMove)
                    xCoord = 0
                    this.getMove()
                }
            break;
            case 'd':
                    xCoord +=1
                    if (xCoord <= this.field.length) {
                        this.movingTo(xCoord)
                    } else {
                        xCoord = this.field.length - 1
                    this.getMove()
            }
            break;
                    case 'l':
                        yCoord -=1
                        if (yCoord >= 0) {
                            this.movingTo(xCoord, yCoord)
                        } else {
                            yCoord = 0
                            this.getMove()
                        }
                        break;
                        case 'r':
                            yCoord +=1
                            if (yCoord <= this.field[0].length) {
                                this.movingTo(xCoord, yCoord)
                            } else {
                                yCoord = this.field[0].length - 1
                                this.getMove()
                            }
                            break;
                        }
    }
                    
                    movingTo = (inputX = xCoord, inputY = yCoord,) => {
                        console.clear()
                        if (this.field[xCoord][yCoord] === fieldCharacter) {
                            this.field[xCoord][yCoord] = pathCharacter
                            this.getMove()
                        } else {
                            if (this.field[xCoord][yCoord] === hat ) {
                                console.log('Congratulations you found your hat!')
                                this.field[xCoord][yCoord] = '!'
                                console.log(this.print()) }
                                else if (this.field[xCoord][yCoord] === pathCharacter ) {
                                    this.getMove()
                                } else {
                                    console.log('Oops you fell down a hole.')
                                    this.field[xCoord][yCoord] = 'X'
                                    console.log(this.print())
                                }
                            this.playAgain();
                            }
                        }
                        
                        playAgain = () => {
                        const input = prompt('Want to play again? y/n');
                        if(input.includes('y') || input.includes('n')){
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
                        } else {
                            this.playAgain()
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

                const myOtherField = new Field(Field.generateField(4,8,20))
                myOtherField.getMove()