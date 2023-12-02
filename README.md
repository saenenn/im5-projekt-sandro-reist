#DOKUMENTATION Creative Coding – Interaktive Medien 5

Sandro Reist
mmp21cv
Thema: Creative Coding mit JavaScript Library p5.js
Interaktive Medien 5
Dezember 2023

<span style="color: red;">Hinweis: Da ich nur mit HTML, CSS und JavaScript gearbeitet habe, nutze ich keinen Webserver.
Bittet laden Sie sich von Github die Datei-Struktur auf ihren Rechner und rufen Sie die index.html Datei
in ihrem Browser auf.</span>


## Projektidee
Da ich zu Beginn der ersten IM5 Projektwoche noch kein Bachelor-Thema habe, in IM5 aber vorwärts machen möchte, habe ich mich für dafür entschieden mich mit Creative Coding mit JavaScript auseinander zu setzen. Ich erstelle eine kleine digitale Gallerie, in welcher meine ersten Creative Coding Versuche darstelle.

### Fokus
Für meinen zukünftigen Werdegang sehe ich JavaScript als wichtigste Technologie, welche wir in den Interaktiven Medien behandelt haben. Voraussichtlich werde ich mich nicht weiter mit PHP, SQL und Datenbanken befassen. Daher möchte ich etwas neues mit Java Script ausprobieren.

Für die Gallerie erstelle ich ein einfaches HTML und CSS Gerüst. Mein Fokus liegt aber klar auf der Auseinandersetzung mit der JavaScript Library p5.js.

### Responsive Design
Da mein Fokus auf JavaScript und der p5.js Library liegt, investiere ich nur so viel Zeit ins Responsive Design, dass die Webseite auf Tablet und Smartphone okay dargestellt wird. Auch das Design der Webseite halte ich simpel, da ich in diesem Bereich sowohl in IM als auch in privaten Projekten gute Erfahrungen sammeln konnte.

## Creative Coding mit JavaScript

### Möglichkeiten
Es gibt verschiedenen JavaScript Librarys die für Creativ Coding verwendet werden können. Ich habe mir zu Beginn einige dieser Librarys angesehen und mich relativ schnell für die p5.js-Library entschieden, da es gute Ressourcen dazu gibt und sie anscheinend relativ einfach anzuwenden ist. Folgende Librarys habe ich mir angesehen:

- p5.js -> inspiriert von Processing, relativ einfache Bibliothek zum erstellen von kreativen Grafiken, Animationen und Interaktionen im Browser
- Three.js: 3D-Grafiken, komplexere Visualisierungen, interaktive 3D-Erlebnisse.
- Processing.js: JavaScript-Version von Processing, für Künstler und Designer.
- Two.js: 2D-Grafiken, Formen, Kurven, Pfade, unterstützt SVG, Canvas, WebGL.

## p5.js Library
Die Webseite [p5.js Homepage](https://p5js.org/) bietet diverse Ressourcen zu p5.js. 

Unter [p5.js Referenz](https://p5js.org/reference/) werden alle p5-Funktionen erklärt. So habe ich im [p5.js Online-Editor](https://editor.p5js.org/) erste Tests mit der Library gemacht.

Ich habe mir nach den ersten Versuchen mit der Anleitung auf der Homepage die p5.min.js Library heruntergeladen und sie in meiner HTML CSS Struktur integriert.

### Aufteilung in P5-Instanzen
Da ich versucht habe mehrere Zeichenflächen/CreativeCoding-Beispiele auf meiner Webseite einzubauen, habe ich herausgefunden, dass das nicht einfach so geht. Ich musste mich zuerst mit der Syntax von p5.js im Instanzmodus beschäftigen.

#### Warum Instanzmodus?
Der Instanzmodus von p5.js braucht man, wenn man mehrere Zeichenflächen (`canvas`) in einem Projekt verwenden möchte.

- Unabhängige Zeichenflächen -> Im Instanzmodus ist jede Zeichenfläche unabhängig voneinander. Jede Instanz verwaltet ihren eigenen Satz von Variablen und Funktionen, was Überlagerungen zwischen verschiedenen Canvases verhindert.
- Modulare Struktur -> Durch die Aufteilung in Instanzen, war es mir möglich den Code besser zu strukturieren. So habe ich jede Instanz in ihrem eigenen JavaScript-File aufgebaut.
- Bessere Kontrolle -> Durch die Aufteilung in Instanzen habe ich bessere Kontrolle über Ereignisse und Interaktionen innerhalb jeder Zeichenfläche.

#### Beispiel Grundgerüst Instanzmodus
Im folgenden Beispiel wird der Instanzmodus zur Erstellung zweier unabhängiger Zeichenflächen verwendet:

```javascript
// Erste Zeichenfläche
new p5(function (p) {
    p.setup = function() {
        p.createCanvas(400, 400);
    };

    p.draw = function() {
        // Zeichenlogik für die erste Zeichenfläche
    };
});

// Zweite Zeichenfläche
new p5(function (p) {
    p.setup = function() {
        p.createCanvas(400, 400);
    };

    p.draw = function() {
        // Zeichenlogik für die zweite Zeichenfläche
    };
});
```

##### Persönliches Beispiel:

###### Code vor der Verwendung von Instanzmodus:
```
function setup() {
  // Wähle das Element mit der ID 'sketch-animation'
  let container = document.getElementById('animation');

  // Ermittle die Größe des Containers
  let width = container.offsetWidth;
  let height = container.offsetHeight;

  // Erstelle den Canvas und passe seine Größe an
  let canvas = createCanvas(width, height);
  canvas.parent('animation');
}

function draw() {
  // Setzt den Hintergrund der Leinwand auf Weiß
  background('#ededed');

  // Wähle die Farbe für die Zeichnung
  fill('#5050ff'); 
  stroke('#5050ff'); 

  // Zeichne einen Kreis in der Mitte der Leinwand
  ellipse(width / 2, height / 2, 50, 50); // Position (200,200), Durchmesser 50x50 Pixel
}

/*Canvas responsiv machen - Größe des Canvas ändert sich, wenn die Fenstergröße geändert wird*/
/*windowResized() ist ein Event-Handler, der aufgerufen wird, wenn das Browserfenster skaliert wird. Es passt die Größe des Canvas entsprechend an.*/
function windowResized() {
  let container = document.getElementById('animation');
  let width = container.offsetWidth;
  let height = container.offsetHeight;
  resizeCanvas(width, height);
}
```
###### Code aufbereitet für Instanzmodus

```
//Constants
const CELL_SIZE = 40;
const COLOR_BLAU = 79;
const COLOR_DARK = 38;
const COLOR_BRIGHT = 233;
const STARTING_ALPHA = 255;
const BACKGROUND_COLOR = '#212121';
const PROB_OF_NEIGHBOR = 0.5;
const AMT_FADE_PER_FRAME = 5;
const STROKE_WEIGHT = 1; 

//VARIABLES
let colorWithAlpha;
let numRows;
let numCols;
let currentRow = -1;
let currentCol = -1;
let allNeighbors = []; // Array für alle Nachbaren



// Zweite Canvas-Instanz
new p5(function (p) {

    p.setup = function () {
      p.createCanvas(400, 400);
      p.parent('canvas2');
    };
  
    p.draw = function () {
      p.background(0);
      p.fill(0, 255, 0);
      p.rect(50, 50, 300, 300);
    };
  
});



function setup() {
  // Wähle das Element mit der ID 'sketch-animation'
  let container = document.getElementById('data');

  // Ermittle die Größe des Containers
  let width = container.offsetWidth;
  let height = container.offsetHeight;

  // Erstelle den Canvas und passe seine Größe an
  let canvas = createCanvas(width, height);
  canvas.parent('data');
}

function draw() {
  // Setzt den Hintergrund der Leinwand auf Weiß
  background('#212121');

  // Wähle die Farbe für die Zeichnung
  fill('#5050ff'); 
  stroke('#5050ff'); 

  // Zeichne einen Kreis in der Mitte der Leinwand
  ellipse(width / 2, height / 2, 50, 50); // Position (200,200), Durchmesser 50x50 Pixel
}

/*Canvas responsiv machen - Größe des Canvas ändert sich, wenn die Fenstergröße geändert wird*/
/*windowResized() ist ein Event-Handler, der aufgerufen wird, wenn das Browserfenster skaliert wird. Es passt die Größe des Canvas entsprechend an.*/
function windowResized() {
  let container = document.getElementById('data');
  let width = container.offsetWidth;
  let height = container.offsetHeight;
  resizeCanvas(width, height);
}
```

## Quellen & Methodik

### Grundverständnis von p5.js
Die [Tutorial-Reihe von "The Coding Train"](https://www.youtube.com/playlist?list=PLRqwX-V7Uu6Zy51Q-x9tMWIv9cueOFTFA) hat mir dabei geholfen ein Grundverständnis für die Library aufzubauen.

### Übung 1 - Tutorial
Nachdem ich mir einen grossen Teil der [Tutorial-Reihe von "The Coding Train"](https://www.youtube.com/playlist?list=PLRqwX-V7Uu6Zy51Q-x9tMWIv9cueOFTFA) angesehen und einige Übungen im Online-Editor von p5.js gemacht habe, habe ich eine kompexere Übung mit dem [Youtube Video](https://www.youtube.com/watch?v=bI6v2DgpZwM&t=183s) umgesetzt.

#### Herusforderung und Lerneffekt bei Übung 1
Ziel des Tutorials war es für mich vorallem eine erste komplexere Übung mit p5.js zu machen. Dabei war meine grösste Herausforderung, dass das Tutorial nicht im Instanzmodus durchgeführt wurde. Zu beginn war es für mich schwierig nach zu vollziehen, wie ich den Instanzmodus auf die im Tutorial umgesetzte Übung anwenden kann. 

### Übungen 2 & 3 - Eigene Erahrungen sammeln
Nach der Tutorial-Übung habe ich zwei eigenen Arbeiten umgesetzt. Dabei habe ich mit den Funktionen aus [p5.js Referenz](https://p5js.org/reference/) gearbeitet und die Syntax weiter gelernt.

### ChatGPT
ChatGPT hat mir z.B beim Debuggen meines Codes sehr gute Hilfestellung geleistet. Gerade bei der ersten Übung hat mir ChatGPT dabei geholfen meinen Code immer wieder zu debuggen, aber auch zu verstehen, wie ich den Instanzmodus genau anwende.

Ausserdem hat mir ChatGPT dabei geholfen Beispielarbeiten aus dem Web zu verstehen.

### Github Copilot
Den Github Copilot konnte ich aufgrund der Registrierung leider erst am zweitletzten Tag ausprobieren. Ich habe einige Tests damit gemacht und mir z.B. Code erklären lassen mithilfe der Kommentarfunktion für Fragen "// q: Hier kommt die Frage".

### Code Validation 
Um meinen Code zu validieren habe ich folgendes Tool genutzt. [Code Validation](https://validator.w3.org/)
