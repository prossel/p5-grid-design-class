// Grid design class for p5.js
//
// Pierre Rossel 2025-03-21
// https://github.com/prossel/p5-grid-design-class
// Inspired by https://visme.co/blog/layout-design/

class Rectangle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    draw() {
        rect(this.x, this.y, this.w, this.h);
    }

    getCenter() {
        return createVector(this.x + this.w / 2, this.y + this.h / 2);
    }
}

class Grid {

    constructor(config = {}) {

        this.VERSION = "0.2.0";

        const defaultConfig = {
            x: 0,
            y: 0,
            w: width,
            h: height,
            gutter: 10,
            margin: 30,
            columns: 6,
            rows: 6,
            flowLines: null, // set to a number to draw flow lines, gutter is calculated to be the same as the flow lines
            strokeGrid: color(0, 50),
            strokeFlowLines: color(255, 50, 255, 50),
            fillModule: null, // set to a color to draw the modules
        }

        Object.assign(this, defaultConfig, config);
    }

    draw() {
        var x = this.x;
        var y = this.y;
        var w = this.w;
        var h = this.h;

        push();
        translate(x + this.margin, y + this.margin);

        // remove the margins
        w -= 2 * this.margin;
        h -= 2 * this.margin;

        noFill()

        // If flow lines is set, the gutter is calculated to be the same as the flow lines
        if (this.flowLines) {
            var flowLineHeight = h / (this.rows * this.flowLines + this.rows - 1)
            this.gutter = flowLineHeight
        };

        // calculate the width of a column
        var colWidth = (w - this.gutter * (this.columns - 1)) / this.columns;
        // calculate the height of a row
        var rowHeight = (h - this.gutter * (this.rows - 1)) / this.rows;

        // draw the modules
        if (this.fillModule) {
            noStroke()
            fill(this.fillModule);
            for (var i = 0; i < this.rows; i++) {
                var y = i * (rowHeight + this.gutter);
                for (var iCol = 0; iCol < this.columns; iCol++) {
                    var x = iCol * (colWidth + this.gutter);
                    rect(x, y, colWidth, rowHeight);
                }
            }
        }

        // draw the grid
        if (this.strokeGrid) {
            stroke(this.strokeGrid);
            noFill();

            // draw the outline of the grid  
            rect(0, 0, w, h);

            // draw the vertical lines
            for (var i = 0; i < this.columns - 1; i++) {
                var x = i * (colWidth + this.gutter) + colWidth;
                line(x, 0, x, h);
                if (this.gutter != 0) {
                    line(x + this.gutter, 0, x + this.gutter, h);
                }
            }

            // draw the horizontal lines
            for (var i = 0; i < this.rows - 1; i++) {
                var y = i * (rowHeight + this.gutter) + rowHeight;
                line(0, y, w, y);
                if (this.gutter != 0) {
                    line(0, y + this.gutter, w, y + this.gutter);
                }
            }
        }

        // draw the flow lines
        if (this.flowLines && this.strokeFlowLines) {
            stroke(this.strokeFlowLines);

            // horizontal flow lines
            for (var iRow = 0; iRow < this.rows; iRow++) {
                for (var iLine = 1; iLine <= this.flowLines; iLine++) {
                    var yLine = iRow * (rowHeight + this.gutter) + iLine * flowLineHeight;
                    line(0, yLine, w, yLine);
                }
            }
        }

        pop();
    }

    // calculate the width of a column
    colWidth() {
        // remove the margins
        var w = this.w - 2 * this.margin;
        return (w - this.gutter * (this.columns - 1)) / this.columns;
    }

    // calculate the height of a row
    rowHeight() {
        var h = this.h - 2 * this.margin;
        return (h - this.gutter * (this.rows - 1)) / this.rows;
    }

    getRectangle(iCol, iRow, nCols = 1, nRows = 1) {
        var colWidth = this.colWidth();
        var rowHeight = this.rowHeight();
        var x = this.x + this.margin + iCol * (colWidth + this.gutter);
        var y = this.y + this.margin + iRow * (rowHeight + this.gutter);
        var w = nCols * colWidth + (nCols - 1) * this.gutter;
        var h = nRows * rowHeight + (nRows - 1) * this.gutter;
        return new Rectangle(x, y, w, h);
    }
}
