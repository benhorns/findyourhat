const prompt = require('prompt-sync')({sigint: true});
const chalk = require('chalk');
const inquirer = require('inquirer');

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

let xInd = 0
let yInd = 0


class Field {
    
    constructor(field) {
        this.field = field
        this.hardMode = false;
        this.moveCounter = 0;
    }
    
    print() {
        return this.field.join('\n').replace(/,/g, '')
    }

    getMove() {
        const badMove = 'Out of bounds! try again!'
        const moves ='udlr'
        console.clear()
        console.log(this.moveCounter)
        console.log(chalk.blue.bgRed.bold('Find your Hat!'));
        console.log(this.print())
        const input = prompt('What is your move? u: up, d: down, l: left, r: right ');
        if (!moves.includes(input)) {
            this.getMove()
        }
        switch(input) {
            case 'u':
                xInd -=1
                if (xInd >= 0) {
                    this.movingTo(xInd)
                } else {
                    console.log(badMove)
                    xInd = 0
                    this.getMove()
                }
                break;
                case 'd':
                    xInd +=1
                    if (xInd <= this.field.length - 1) {
                        this.movingTo(xInd)
                    } else {
                        xInd = this.field.length - 1
                        this.getMove()
                    }
                    break;
                    case 'l':
                        yInd -=1
                        if (yInd >= 0) {
                            this.movingTo(xInd, yInd)
                        } else {
                            yInd = 0
                            this.getMove()
                        }
                        break;
                        case 'r':
                            yInd +=1
                            if (yInd <= this.field[0].length - 1) {
                                this.movingTo(xInd, yInd)
                            } else {
                                yInd = this.field[0].length - 1
                                this.getMove()
                            }
                            break;
                        }
                    }
                    
    movingTo = (inputX = xInd, inputY = yInd,) => {
            console.clear()
            this.moveCounter++
        if (this.field[xInd][yInd] === fieldCharacter) {
            this.field[xInd][yInd] = pathCharacter
            this.getMove()
        } else {
        if (this.field[xInd][yInd] === hat ) {
            console.log('Congratulations you found your hat!')
            this.field[xInd][yInd] = '!'
            console.log(this.print()) }
        else if (this.field[xInd][yInd] === pathCharacter ) {
            this.getMove()
        } else {
            console.log('Oops you fell down a hole.')
            this.field[xInd][yInd] = 'X'
            console.log(this.print())
        }
        this.playAgain();
        }
    }
                        
                        playAgain = () => {
                            this.moveCounter = 0;
                            const input = prompt('Want to play again? y/n');
                            const numbers = '1234567890'
                            if(('yn').includes(input)){
                            // if(input === 'y' || input === 'n'){
                            switch(input) {
                                case 'y':
                                    let c = ''
                                    let r = ''
                                    let p = ''
                                    do{ 
                                        c = (prompt('Please enter a number for the number of columns you want on the board.'))
                                        r = (prompt('Please enter a number for the number of rows you want on the board.')) 
                                        p = (prompt('Please enter a number for the percentage of holes you want on the board.'))
                                    } while (isNaN(c) || isNaN(r) || isNaN(p))
                                this.field = Field.generateField(parseInt(c),parseInt(r),parseInt(p))
                                xInd = 0;
                                yInd = 0;
                        this.start()
                        break;
                        case 'n':
                            console.log('Okay thanks for playing!')
                            break;
                            }
                        } else {
                            this.playAgain()
                        }
                        }
    
    start = () => {
        console.log(this.print())
        inquirer.prompt([
        {
            name: 'randStart',
            type: 'list',
            message: 'Do you want to be randomly assigned a starting position on the board?',
            choices: ['Yes', 'No'],
        },
        {
            name: 'hardMode',
            type: 'list',
            message: 'Do you want to play on hard mode (after every 3 moves a new hole will randomly be added to the board?',
            choices: ['Yes', 'No'],
        },
        ]).then(answer => {
            if (answer.randStart === 'Yes') {
                let i = 0;
                do {
                let randRow = (Math.floor(Math.random() * (this.field.length-1)))
                let randCol = (Math.floor(Math.random() * (this.field[0].length-1)))
                if (this.field[randRow][randCol] != hole && this.field[randRow][randCol] != hat) {
                    xInd = randRow;
                    yInd = randCol;
                    this.field[randRow][randCol] = pathCharacter;
                    i++;
                }
                } while ( i < 1) 
                } else {
                console.log(`You will start in the top left corner of the board.`)
                this.field[0][0] = pathCharacter;
                }
            answer.hardMode === 'Yes' ? this.hardMode = true : this.hardMode = false;
            console.log(this.hardMode)
            this.getMove()
        })
    }

    static generateField (rows, cols, percentage) {
        let arr = []
        let freq = Math.ceil((rows*cols) * (percentage/100))
        console.clear();
        console.log(chalk.blue.bgRed.bold('Welcome to .... Find your Hat!'));
        for (let i = 0; i < rows; i++) {
            arr.push( new Array(cols).fill(fieldCharacter))
        }   
        //Assigns player position to the top left corner of the field.
        let i = 0;
        do {
            let randRow = (Math.floor(Math.random() * rows))
            let randCol = (Math.floor(Math.random() * cols))
            if (arr[randRow][randCol] != hole && (randRow != 0 && randCol != 0)) {
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
myOtherField.start()    