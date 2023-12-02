// Canvas-Instanz für Section "animation"
new p5(function (p) {

  let colors = ['#5050ff', '#FF8811', '#16DB93', '#EFEA5A'];
  let currentIndex = 0;
  let nextIndex = 1;
  // lerpFactor 0,1 heisst, dass die interpolierende Farbe nache an der ersten Farbe ist.
  // lerpFactor 0,5 heisst, dass die interpolierende Farbe genau in der Mitte zwischen den beiden Farben ist.
  // lerpfactor 0,9 heisst, dass die interpolierende Farbe genau an der zweiten Farbe ist.
  let lerpFactor = 0;
  let changeSpeed = 0.01; // Geschwindigkeit der Farbänderung


  p.setup = function() {
    let container = p.select('#animation');
    let width = container.width;
    let height = container.height;

    let canvas = p.createCanvas(width, height);
    canvas.parent('animation');
    p.background('#212121');
  };

  p.draw = function() {
    
    // Aktuelle und nächste Farbe interpolieren
    let currentColor = p.color(colors[currentIndex]);
    let nextColor = p.color(colors[nextIndex]);
    let strokeColor = p.lerpColor(currentColor, nextColor, lerpFactor);

    p.stroke(strokeColor);
    p.strokeWeight(18);
    p.line(p.pmouseX, p.pmouseY, p.mouseX, p.mouseY);

    // Update des Lerp-Faktors und der Farbindizes
    lerpFactor += changeSpeed;
    if (lerpFactor >= 1) {
      lerpFactor = 0;
      currentIndex = (currentIndex + 1) % colors.length;
      nextIndex = (currentIndex + 1) % colors.length;
    }
  };

  p.mousePressed = function() {
    p.background('#212121');
  };

  p.windowResized = function() {
    let container = p.select('#animation');
    let width = container.width;
    let height = container.height;
    p.resizeCanvas(width, height);
  };

});