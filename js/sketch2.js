// Zweite Canvas-Instanz für Section "data"
var sand = function (p) {

    // Konstanten
    const CELL_SIZE = 48;
    const COLOR_R = 79;
    const COLOR_G = 38;
    const COLOR_B = 233;
    const STARTING_ALPHA = 255;
    const BACKGROUND_COLOR = '#ededed';
    const PROB_OF_NEIGHBOR = 0.5;
    const AMT_FADE_PER_FRAME = 5;
    const STROKE_WEIGHT = 1;

    // Variablen
    let colorWithAlpha;
    let numRows;
    let numCols;
    let currentRow = -1;
    let currentCol = -1;
    let allNeighbors = []; // Array für alle Nachbaren

    p.setup = function () {
        // Wähle das Element mit der ID 'data'
        let container = p.select('#cursoreffect');

        // Ermittle die Größe des Containers
        let width = container.size().width;
        let height = container.size().height;

        // Erstelle den Canvas und passe seine Größe an
        let canvas = p.createCanvas(width, height);
        canvas.parent('cursoreffect');
       

        // Setup-Code hier...
        p.colorWithAlpha = p.color(COLOR_R, COLOR_G, COLOR_B, STARTING_ALPHA);
        p.noFill();
        p.stroke(p.colorWithAlpha);
        p.strokeWeight(STROKE_WEIGHT);
        p.numRows = Math.ceil(height / CELL_SIZE);
        p.numCols = Math.ceil(width / CELL_SIZE);
    };

    p.draw = function () {
        p.background(BACKGROUND_COLOR);
        
        //ich berechne Zeile und Spalte auf der sich Cursor befindet
        let row = p.floor(p.mouseY / CELL_SIZE);
        let col = p.floor(p.mouseX / CELL_SIZE);

        //herausfinden, ob der Cursor sich auf eine andere Zelle verschoben hat
        // Wenn ja, getRandomNeighbors anzeigen

        if (row!== p.currentRow || col !== p.currentCol) {
            p.currentRow = row;
            p.currentCol = col;
            
            allNeighbors.push(...p.getRandomNeighbors(row, col));
        }

        //use the calculated row and clumn to determine the position of the cell
        let x = col * CELL_SIZE;
        let y = row * CELL_SIZE;

        //Draw a highlighted rectangle over the cell under the mouse cursor
        p.stroke(p.colorWithAlpha);
        p.circle(x,y, CELL_SIZE, CELL_SIZE);

        //p.stroke(55,155,20);
        //p.rect(x+2,y+2, 80, 80);


        //Draw and update all neighbors
        for (let neighbor of allNeighbors) {
            let neighborX = neighbor.col * CELL_SIZE;
            let neighborY = neighbor.row * CELL_SIZE;

            // Decrease the opacity of the neighbor each frame
            neighbor.opacity = p.max(0, neighbor.opacity - AMT_FADE_PER_FRAME);
            p.stroke(COLOR_R, COLOR_G, COLOR_B, neighbor.opacity);
            p.circle(neighborX, neighborY, CELL_SIZE, CELL_SIZE);

        }
        // Remove neighbors with zero opacity
        allNeighbors = allNeighbors.filter((neighbor) => neighbor.opacity > 0);

    };

    p.getRandomNeighbors = function (row, col) {
        let neighbors = []; //leeres Array um Nachbarszellen zu speichern

        //Loop durch die umliegenden Zellen
        for (let dRow = -1; dRow <= 1; dRow++) {
            for(let dCol = -1; dCol <= 1; dCol++) {
                //Index der anliegenden Nachbarszellen berechnene für row und col
                let neighborRow = row + dRow;
                let neighborCol = col + dCol;

                //Check if the current cell in the loop is the given cell (row, col)
                let isCurrentCell = dRow === 0 && dCol === 0;

                //Check if the neighboring cell is within the grid boundaries
                let isInBounds = 
                    neighborRow >= 0 &&
                    neighborRow < p.numRows &&
                    neighborCol >= 0 &&
                    neighborCol < p.numCols;

                    //if the cell is not current cell, is within bounds, and meets prob,
                    //add the neighboring cell to the neighbors array
                    if (!isCurrentCell && isInBounds && Math.random() < PROB_OF_NEIGHBOR) {
                        neighbors.push({
                            row: neighborRow,
                            col: neighborCol,
                            opacity: STARTING_ALPHA,
                        });
                    }
            }
        }
        //Return the array of randomly-selected neighboring cells
        return neighbors;
    };

    p.windowResized = function () {
        let container = p.select('#data');
        let width = container.size().width;
        let height = container.size().height;
        p.resizeCanvas(width, height);

        // Code zur Anpassung bei Größenänderung...
    };

    // Weitere Funktionen und Logik für diese Instanz...
};

var myp5 = new p5(sand);