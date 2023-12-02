// Canvas-Instanz für Section "animation"
new p5(function (p) {

    const colors = [
        "#5050ff", // The base color
        "#5a5aff", "#6464ff", "#6e6eff", "#7878ff", // Lighter shades of base color
        "#4646e0", "#3c3ccc", "#3232b8", "#2828a4", // Darker shades of base color
        "#ffa500", "#ff9f00", "#ff9400", "#ff8900", // Complementary colors (oranges)
        "#ff7f00", "#ff7400", "#ff6900", "#ff5e00",
        "#ff5300", "#ff4800", "#ff3d00", "#ff3200",
        "#ff8c00", "#ff9600", "#ffa000", "#ffaa00", // Tints of complementary colors
        "#ffb400", "#ffbe00", "#ffc800", "#ffd200",
        "#ffd800", "#ffe200", "#ffec00", "#fff600",
        "#8000ff", "#7500ff", "#6a00ff", "#5f00ff", // Analogous colors (purples)
        "#5400ff", "#4900ff", "#3e00ff", "#3300ff",
        "#2800ff", "#1d00ff", "#1200ff", "#0700ff"
      ];      
  
  
    p.setup = function() {
      let container = p.select('#generation');
      let width = container.width;
      let height = container.height;
  
      let canvas = p.createCanvas(width, height);
      canvas.parent('generation');
      
    };
  
    p.draw = function() {
        p.noStroke();
        p.frameRate(p.random(1, 25));
        let colorIndex = p.floor(p.random(colors.length));
        p.fill(colors[colorIndex]);

        //alter Version -> zuerst nur Kreise
        //p.circle(p.random(p.width), p.random(p.height), 40, 40)

        let shapeType = p.floor(p.random(3)); // Zufällige Zahl zwischen 0 und 3
        let x = p.random(p.width);
        let y = p.random(p.height);

        switch (shapeType) {
            case 0: // Kreis
                p.circle(x, y, p.random(80));
                break;
            case 1: // Dreieck
                p.triangle(p.random(p.width), p.random(p.height), p.random(p.width), p.random(p.height), p.random(p.width), p.random(p.height));
                break;
            case 2: // Rechteck
                p.rect(x, y, p.random(160), p.random(160));
                break;
        }
    };
    
  
    p.mousePressed = function() {
        p.clear();
      }
  
    p.windowResized = function() {
      let container = p.select('#generation');
      let width = container.width;
      let height = container.height;
      p.resizeCanvas(width, height);
    };
  
  });