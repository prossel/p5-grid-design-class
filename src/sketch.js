var iGrid = 0;

function setup() {
  createCanvas(600, 400);

  // Default grid
  grid1 = new Grid();

  // Custom grid size
  grid2 = new Grid({
    gutter: 20,
    margin: 40,
    columns: 6,
    rows: 4,
  });

  // Colored modules with transparent grid and flow lines
  grid3 = new Grid({
    gutter: 100, // any value will be overriden by the flow lines height
    margin: 40,
    columns: 6,
    rows: 4,
    strokeGrid: null,  // no grid
    flowLines: 5,
    fillModule: color(0, 200, 255, 30)  // set a color to draw the modules
  });

  // Fully customized colors
  grid4 = new Grid({
    gutter: 5,
    margin: 40,
    columns: 6,
    rows: 4,
    flowLines: 5,
    strokeGrid: color(0, 255, 0, 50),
    strokeFlowLines: color(0, 0, 255, 50),
    fillModule: color(255, 255, 0, 30)
  });

  // Custom position without margin nor gutter
  grid5 = new Grid({
    x: 50,
    y: 50,
    w: 400,
    h: 250,
    margin: 0,
    gutter: 0,
  });

  grids = [grid1, grid2, grid3, grid4, grid5];
}

function draw() {
  background(220);

  // ellipse(width / 2, height / 2, width, height);

  // draw the grid
  var grid = grids[iGrid];
  grid.draw();

  // draw an ellipse in top left 4 modules
  var rect = grid.getRectangle(0, 0, 2, 2);
  var center = rect.getCenter();
  noStroke();
  fill(255, 0, 0, 50);
  ellipse(center.x, center.y, rect.w, rect.h);

  // draw an ellipse in bottom right 4 modules
  var rect = grid.getRectangle(grid.columns - 2, grid.rows - 2, 2, 2);
  var center = rect.getCenter();
  ellipse(center.x, center.y, rect.w, rect.h);

  // draw the grid number and instructions
  fill(0)
  text("Grid " + (iGrid + 1), 10, 20);
  text("Mousewheel to change grid", 10, height - 10);

}

// mouswheel event
function mouseWheel(event) {
  // move to the next or previous grid depending on the scroll direction
  if (event.delta > 0) {
    iGrid = (iGrid + 1) % grids.length;
  } else {
    iGrid = (iGrid - 1 + grids.length) % grids.length;
  }
}
