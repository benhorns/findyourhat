const prompt = require('prompt-sync')({sigint: true});
const chalk = require('chalk');
const inquirer = require('inquirer');
const { down } = require('inquirer/lib/utils/readline');

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

var stdin = process.stdin;
  

class Field {
    
    constructor(field) {
        this.field = field
        this.hardMode = false;
        this.moveCounter = 0;
        this.row = 0
        this.col = 0
        this.randX = Math.floor(Math.random() * (this.field.length-1));
        this.randY = Math.floor(Math.random() * (this.field[0].length-1));
    }
    
    print() {
        return this.field.join('\n').replace(/,/g, '')
    }
    

    getMove(move) {        
    const badMove = 'Out of bounds! try again!'
    const moves ='udlr'
    const length = this.field.length - 1
    console.clear()
    console.log(chalk.blue.bgRed.bold('Find your Hat!'));
    console.log(this.print())
    this.field[this.row][this.col] = fieldCharacter;
    console.log(move)
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');
    stdin.on('data', function(key){
    console.clear()
    if (key == '\u001B\u005B\u0041') {
        myOtherField.getMove('up')
    }
    if (key == '\u001B\u005B\u0043') {
        myOtherField.getMove('right')
    }
    if (key == '\u001B\u005B\u0042') {
        console.log(down)
        this.row +=1
        if (this.row <= length) {
            this.movingTo()
        } else {
            this.row = length
            this.field[this.row][this.col] = chalk.red(pathCharacter);
            this.getMove()
        }    
    }
    if (key == '\u001B\u005B\u0044') {
         myOtherField.getMove('left')

    }
    
    if (key == '\u0003') { process.exit(); }    // ctrl-c
})

        // const input = prompt('What is your move? u: up, d: down, l: left, r: right ');
        // if (!moves.includes(input)) {
        //     this.getMove()
        // }
        switch(move) {
            case 'up':
                this.row -=1
                if (this.row >= 0) {
                    this.movingTo()
                } else {
                    console.log(badMove)
                    this.row = 0
                    this.getMove()
                    this.field[this.row][this.col] = chalk.red(pathCharacter);

                }
            break;
            case 'down':
            this.row +=1
                if (this.row <= this.field.length - 1) {
                    this.movingTo()
                } else {
                    this.row = this.field.length - 1
                    this.field[this.row][this.col] = chalk.red(pathCharacter);
                    this.getMove()
                }
            break;
            case 'left':
                this.col -=1
                if (this.col >= 0) {
                    this.movingTo()
                } else {
                    this.col = 0
                    this.field[this.row][this.col] = chalk.red(pathCharacter);
                    this.getMove()
                }
            break;
            case 'right':
                this.col +=1
                if (this.col <= this.field[0].length - 1) {
                    this.movingTo()
                } else {
                    this.col = this.field[0].length - 1
                    this.field[this.row][this.col] = chalk.red(pathCharacter);
                    this.getMove()
                }
                break;
        }
    }

                    
    movingTo = () => {
        this.moveCounter++
        if (this.field[this.row][this.col] === fieldCharacter || this.field[this.row][this.col] === pathCharacter) {
            this.field[this.row][this.col] = pathCharacter;
            this.hardMode && this.moveCounter % 3 === 0 ? this.hardGame() : this.getMove();
        } else {
            console.clear()
            if (this.field[this.row][this.col] === hat ) {
                this.field[this.row][this.col] = chalk.blue.bgWhite('!');
                console.clear()
                console.log(chalk.blue.bgWhite('Congratulations you found your hat!'))
                console.log(this.print()) 
            }else {
                console.log(chalk.white.bgRed('XXX Oops you fell down a Hole XXX'))
                this.field[this.row][this.col] = chalk.bgRed('X');
                console.log(this.print())
            }
            this.playAgain();
        }
    }
    
    hardGame = () => {
        let i = 0;
        do {
        this.randX = (Math.floor(Math.random() * (this.field.length-1)))
        this.randY = (Math.floor(Math.random() * (this.field[0].length-1)))
        if (this.field[this.randX][this.randY] != hole && this.field[this.randX][this.randY] != hat &&  this.field[this.randX][this.randY] != pathCharacter ) {
            this.field[this.randX][this.randY] = hole;
            i++;
        }
        } while ( i < 1) 
        this.getMove();
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
                console.log(this.randX)
                console.log(this.randY)
                do {
                    this.row = (Math.floor(Math.random() * (this.field.length-1)))
                    this.col = (Math.floor(Math.random() * (this.field[0].length-1)))
                    if (this.field[this.row][this.col] != hole && this.field[this.row][this.col] != hat) {
                        this.field[this.row][this.col] = pathCharacter;
                        console.log(this.field[this.row][this.col])
                        i++;
                        this.getMove(this.row,this.col)
                    }
                    else {}
                } while ( i < 1) 
            } else {
                console.log(`You will start in the top left corner of the board.`)
                this.row = 0;
                this.col = 0;
                this.field[this.row][this.col] = pathCharacter;
            }
            answer.hardMode === 'Yes' ? this.hardMode = true : this.hardMode = false;
            console.log(this.hardMode)
            this.getMove(this.col,this.row)
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
        let i = 0;
        do {
        this.randX = (Math.floor(Math.random() * rows))
        this.randY = (Math.floor(Math.random() * cols))
            if (arr[this.randX][this.randY] != hole && (this.randX != 0 && this.randY != 0)) {
                arr[this.randX][this.randY] = hole;
                i++;
            }
        }
        while (i < freq) 
        i = 0;
        do {
            this.randX = (Math.floor(Math.random() * rows))
            this.randY= (Math.floor(Math.random() * cols))
            if (arr[this.randX][this.randY] != hole && arr[this.randX][this.randY] != pathCharacter) {
                arr[this.randX][this.randY] = hat;
                i++;
            }
        }
        while (i < 1) 
        return arr
        }
    }
            
            const myField = new Field([
                    ['*', '░', 'O'],
                    ['░', 'O', '░'],
                    ['░', '^', '░'],
                ]);

// class Cell {
//     constructor(col , row) {
//         this.col = col;
//         this.row = row;

//         this.visited = false;
//     }

//     index = (col, row) => {
//         if (i < 0 || j < 0  || i > cols - 1 || j > rows - 1) {
//           return -1;
//         }
//         return i + j * cols;
//       }

// }

// const current = new Cell(0,0)
// console.log(current



const myOtherField = new Field(Field.generateField(4,8,20))
myOtherField.start()  