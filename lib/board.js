let Piece = require("./piece");

/**
 * Returns a 2D array (8 by 8) with two black pieces at [3, 4] and [4, 3]
 * and two white pieces at [3, 3] and [4, 4]
 */
function _makeGrid () {
  const grid = [];
  for (let i = 0; i < 8; i++) {
    // if(grid[i] === undefined){
    //   grid.push(new Array(8))
    // } else{
    // grid[i].push(new Array(8));
    // }
    grid.push(new Array(8));
  }
  grid[3][4] = new Piece("black")
  grid[4][3] = new Piece("black")
  grid[3][3] = new Piece("white")
  grid[4][4] = new Piece("white")

  return grid;
};
// let booard = _makeGrid()



/**
 * Constructs a Board with a starting grid set up.
 */
function Board () {
  this.grid = _makeGrid();
}

Board.DIRS = [
  [ 0,  1], [ 1,  1], [ 1,  0],
  [ 1, -1], [ 0, -1], [-1, -1],
  [-1,  0], [-1,  1]
];

/**
 * Checks if a given position is on the Board.
 */
Board.prototype.isValidPos = function (pos) {
  const x = pos[0]
  const y = pos[1]
  if (((x > 7) || (x < 0)) || (((y > 7) || (y < 0)))) {
    return false;
  }
  return true;
};

/**
 * Returns the piece at a given [x, y] position,
 * throwing an Error if the position is invalid.
 */
Board.prototype.getPiece = function (pos) {
  if(this.isValidPos(pos)){
    return this.grid[pos[0]][pos[1]];
  } else {
    throw new Error;
  }

};

/**
 * Checks if the piece at a given position
 * matches a given color.
 */
Board.prototype.isMine = function (pos, color) {
  const x = pos[0]
  const y = pos[1]
  if (this.grid[x][y] === undefined){
    return false;
  } else if (this.grid[x][y].color=== color){
    return true;
  } 
  return false;
};

/**
 * Checks if a given position has a piece on it.
 */
Board.prototype.isOccupied = function (pos) {
  const x = pos[0]
  const y = pos[1]
  if (this.grid[x][y] === undefined) {
    return false;
  }
  return true;
};

/**
 * Recursively follows a direction away from a starting position, adding each
 * piece of the opposite color until hitting another piece of the current color.
 * It then returns an array of all pieces between the starting position and
 * ending position.
 * 
 * Returns an empty array if it reaches the end of the board before finding another piece
 * of the same color.
 *
 * Returns empty array if it hits an empty position.
 *
 * Returns empty array if no pieces of the opposite color are found.
 */
Board.prototype._positionsToFlip = function(pos, color, dir, piecesToFlip){
  if (!piecesToFlip) {
    piecesToFlip = [];
  } else {
    piecesToFlip.push(pos);
  }
  const new_pos = [pos[0]+dir[0], pos[1]+dir[1]]
  if (!this.isValidPos(new_pos)) {
    return [];
  } else if (!this.isOccupied(new_pos)) {
    return [];
  } else if (this.isMine(new_pos, color)) {
    return piecesToFlip.length === 0 ? [] : piecesToFlip;
  } else return this._positionsToFlip(new_pos, color, dir, piecesToFlip);

  // if ((x + del_x) > 7 || (y + del_y) > 7 || (x + del_x) < 0 || (y + del_y) < 0) {
  //   return [];
  // }

  // if (this.grid[x][y] === undefined){
  //   return [];
  // }
  
  // if (this.isValidPos(pos)){
  //   // const next_pos = new Array(2);
    
  //   next_pos[0] = x + del_x;
  //   next_pos[1] = y + del_x;
  //   arr.push(next_pos);
  //   this._positionsToFlip(next_pos, color, dir, piecesToFlip);
  // }
  // return piecesToFlip;
  // return arr;
};

// console.log(booard._positionsToFlip([4,6], "white", [1,1]))



/**
 * Checks that a position is not already occupied and that the color
 * taking the position will result in some pieces of the opposite
 * color being flipped.
 */
Board.prototype.validMove = function (pos, color) {
  if (this.isOccupied(pos)) {
    return false;
  }

  // Board.DIRS.forEach(dir => {
  //   const arrlength = this._positionsToFlip(pos, color, dir).length
  //   // debugger
  //   if (arrlength) {
  //     return true;
  //   }
  // })

  for (let i = 0; i < 8; i++) {
    const dir = Board.DIRS[i]
    const arrlength = this._positionsToFlip(pos, color, dir).length
    if (arrlength) {
      return true;
    } 
  }

  return false 
};

/**
 * Adds a new piece of the given color to the given position, flipping the
 * color of any pieces that are eligible for flipping.
 *
 * Throws an error if the position represents an invalid move.
 */
Board.prototype.placePiece = function (pos, color) {
  if (this.validMove(pos, color)) {
    // let arr = [];
    // debugger
    for (let i = 0; i < 8; i++) {
      const dir = Board.DIRS[i];
      
      const arr = this._positionsToFlip(pos, color, dir);
    // debugger
      return arr;
      // this.grid[arr[i][0]][arr[i][1]].flip
    }
    
    for (let j = 0; j < arr.length; j++) {
      const x = arr[j][0];
      const y = arr[j][1];
      this.grid[x][y].flip;
      mmm = this.grid[x][y];
     
      return mmm;
    }

  } else {
    throw new Error;
  }
};

/**
 * Produces an array of all valid positions on
 * the Board for a given color.
 */
Board.prototype.validMoves = function (color) {
};

/**
 * Checks if there are any valid moves for the given color.
 */
Board.prototype.hasMove = function (color) {
};



/**
 * Checks if both the white player and
 * the black player are out of moves.
 */
Board.prototype.isOver = function () {
};




/**
 * Prints a string representation of the Board to the console.
 */
Board.prototype.print = function () {
};



module.exports = Board;
