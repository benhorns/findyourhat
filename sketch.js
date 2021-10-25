// Depth-first search
// Recurisve backtracker
// code c/o Daniel Shiffman https://www.youtube.com/watch?v=HyK_Q5rrcr4

var cols, rows;
var w = 40;
var grid = [];

// this is crucial for the backtracking step 2
var stack = [];

// current cell being visited
var current;

function setup() {
    createCanvas(400, 400);
    cols = floor(width/w);
    rows = floor(height/w)
    // frameRate(5);


// nested loop constructing cell objects
    for (var j=0; j < rows; j++) {
        for (var i=0; i < cols; i++) {
            var cell = new Cell(i,j);
            grid.push(cell)
        }
    }
    
    current = grid[0];

}

function draw() {
    background(51);
    for (var i =0; i < grid.length; i++) {
        grid[i].show();
    }

    current.visited = true;
    current.highlight();
    // STEP 1 From wikipedia explanation of algorithm: 
    //https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_backtracker
    var next = current.checkNeighbors();
    if (next) {
      next.visited = true;
      //STEP 2 Including this for sake of finishing this project, but for Find  Your Hat this part
      // is not needed
      stack.push(current);

      //STEP 3
      removeWalls(current, next);
      
      // STEP 4
      current = next;
    } else if (stack.length > 0) {
      current = stack.pop();

    }

}

function index(i, j) {
  if (i < 0 || j < 0  || i > cols - 1 || j > rows - 1) {
    return -1;
  }
  return i + j * cols;
}
// consturctor function for a cell object
// i is col, j is row
function Cell(i, j) {
    this.i = i;
    this.j = j;
    //            top   right bot   left
    this.walls = [true, true, true, true];
    this.visited = false;

    this.checkNeighbors = function () {
      var neighbors = [];

      // gives us the index of a 1 dimensional array, which is what we're working with in this 
      //program
      var top    = grid[index(i    , j - 1)];
      var right  = grid[index(i + 1, j)];
      var bottom = grid[index(i    , j + 1)];
      var left   = grid[index(i - 1, j)];

      if (top && !top.visited) {
        neighbors.push(top);
      }
      if (right && !right.visited) {
        neighbors.push(right);
      }
      if (bottom && !bottom.visited) {
        neighbors.push(bottom);
      }
      if (left && !left.visited) {
        neighbors.push(left);
      }

      if (neighbors.length > 0) {
        var r = floor(random(0, neighbors.length));
        return neighbors[r];
      } else {
        return undefined;
      }

    }

    this.highlight = function() {
      var x = this.i*w;
      var y = this.j*w;
      noStroke();
      fill(0,0,255,124);
      rect(x,y,w,w);
    }

    this.show = function () {
        var x = this.i*w;
        var y = this.j*w;
        stroke(255);
        if (this.walls[0]){
          //top
          line (x    ,      y,  x + w,  y);
        }
        if (this.walls[1]){
          //right
          line (x + w,  y    ,  x + w,  y + w);
        }
        if (this.walls[2]){
          //bottom
          line (x + w,  y + w,      x,  y + w);
        }
        if (this.walls[3]){
          //left
          line (x    ,  y + w,      x,  y);
        }

        if (this.visited) {
        noStroke();
        fill(255, 0, 255, 100);
        rect(x,y,w,w);
      }
    }

}










function removeWalls (a,b) {
  
  var x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  var y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }


}










