// Based on https://visme.co/blog/layout-design/

// Pierre Rossel 2025-03-21

class Grid {
    constructor() {
        this.VERSION = "0.1.0";
        this.gutter = 10;
        this.margin = 30;
        this.columns = 6;
        this.rows = 6;
        this.strokeGrid = null;
        this.strokeFlowLines = null;
        this.fillModule = null;  // Fill color of the module
        this.flowLines = null; // Number of flow lines per module. If set, will override the gutter
    }

    draw(x = 0, y = 0, w = width, h = height) {
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

        // draw the outline of the grid  
        if (this.strokeGrid) {
            stroke(this.strokeGrid);
        }
        else {
            stroke(0, 50);
        }
        rect(0, 0, w, h);

        // draw the vertical lines
        for (var i = 0; i < this.columns - 1; i++) {
            var x = i * (colWidth + this.gutter) + colWidth;
            line(x, 0, x, h);
            line(x + this.gutter, 0, x + this.gutter, h);
        }

        // draw the horizontal lines
        for (var i = 0; i < this.rows - 1; i++) {
            var y = i * (rowHeight + this.gutter) + rowHeight;
            line(0, y, w, y);
            line(0, y + this.gutter, w, y + this.gutter);
        }

        // draw the flow lines
        if (this.flowLines) {
            if (this.strokeFlowLines) {
                stroke(this.strokeFlowLines);
            }
            else {
                stroke(255, 50, 255, 50);
            }

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
}
