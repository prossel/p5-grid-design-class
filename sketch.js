var grid;

function setup() {
  createCanvas(400, 400);

  grid = new Grid();

  // configure the grid
  // grid.gutter = 5;
  // grid.margin = 20;
  // grid.columns = 8;
  // grid.rows = 8;
  // grid.strokeGrid = color(200, 0, 0);
  // grid.strokeGrid = color(200, 0, 0, 0); // transparent
  // grid.strokeFlowLines = color(255, 0, 0, 50);
  // grid.flowLines = 5;
  // grid.fillModule = color("#EEEEFF66");
}

function draw() {
  background(220);

  // ellipse(width / 2, height / 2, width, height);
  grid.draw();


  // grid.draw(100, 100, 200, 200);
}
