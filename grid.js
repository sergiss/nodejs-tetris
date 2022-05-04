/**
 * 2022 Sergio Soriano - sergiosoriano.com
 */

const { COLORS } = require('./constants');

 class Grid {
 
     constructor(cols, rows) {
         this.cols = cols;
         this.rows = rows;
         let n = cols * rows;
         this.data = [];
         for(let i = 0; i < n; ++i) {
             this.data[i] = 0;
         }
     }
 
     render = function(renderer) {
         let i, j;
         for(i = 0; i < this.cols; ++i) {
             for(j = 0; j < this.rows; ++j) {
                 //ctx.fillStyle = COLORS[this.data[i * this.rows + j]];
                 //ctx.fillRect(i * TILE_SIZE + (i << 1) + 1, j * TILE_SIZE + (j << 1) + 1, TILE_SIZE, TILE_SIZE);
                 renderer(i, j, COLORS[this.data[i * this.rows + j]]);
             }
         }
     }
 
     getTileAt = function(x, y) {
         return this.data[x * this.rows + y];
     }
 
     setTileAt = function(x, y, tile) {
         if(!tile) console.log(tile);
         this.data[x * this.rows + y] = tile;
     }
 
     checkLines = function() {
         let i, j, k, count = 0;
         inner: for (j = 0; j < this.rows; j++) {
             for (i = 0; i < this.cols; i++) {
                 if (!this.data[i * this.rows + j]) {
                     continue inner;
                 }
             }
             for (k = j; k > 1; k--) {
                 for (i = 0; i < this.cols; i++) {
                     this.data[i * this.rows + k] = this.data[i * this.rows + (k - 1)];
                 }
             }
             for (i = 0; i < this.cols; i++) { // Clear first line
                 this.data[i * this.rows] = 0;
             }
             count++;
         }
         return count;
     }
 
 }

 module.exports = { Grid };