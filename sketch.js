// Estrelas
let estrelas = [], totalEstrelas = 200;

// Chuva
let gotas = [], totalGotas = 300;
let chuvaSom;

// Lua
function desenharLua() {
  let x = 100;
  let y = 100;
  let raio = 80;
  
  fill(245, 245, 220);
  noStroke();
  circle(x, y, raio);
  
  fill(17, 26, 51);
  circle(x + 16, y, 70);
}

function desenharEstrela() {
  for (let i = 0; i < totalEstrelas; i++) {
    let estrela = estrelas[i];
    fill(estrela.brilhoEstrela);
    noStroke();
    circle(estrela.estrelaX, estrela.estrelaY, estrela.tamanhoEstrela);
  }
}

// Chuva
function desenharChuva() {
  strokeWeight(1);
  stroke(102, 170, 255);
  for (let i = 0; i < totalGotas; i++) {
    let chuva = gotas[i];
    line(chuva.gotasX, chuva.gotasY, chuva.gotasX, chuva.gotasY + chuva.cumprimentoGotas);
    chuva.gotasY += chuva.veloGotas;
    
    if (chuva.gotasY > height){
      chuva.gotasY = 0;
      chuva.gotasX = random(width);
    }
  }
}

// Raio
let raio = [];
let raioX = 0;
let raioY = 0;
let tempoUltimoRaio = 0;
let intervaloRaio = 1000;
let mostrarRaio = false;
let tempoRaio = 0;
let flash = false;
let tempoFlash = 0;
raio.push({raioX, raioY});

function gerarRaio(xInicial = random(width)) {
  raioSom.play();
  raio = [];
  let x = xInicial;
  let y = 0;
  raio.push({ x, y });
  
  let passoY = 25;
  let passos = height / passoY;
  
  for (let i = 0; i < passos; i++) {
    x += random(-20, 20);
    y += passoY;
    raio.push({ x, y });
  }
}

function desenharRaio() {
  stroke(0, 204, 255);
  strokeWeight(2);
  noFill();
  
  beginShape();
  for (let i = 0; i < raio.length; i++) {
    vertex(raio[i].x, raio[i].y);
  }
  endShape();
}

// Outros
let aviao;
let aviaoX = 750;
let aviaoY = 550;
let passos;
let iniciou = false;
let canvas;

function mousePressed(){
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    gerarRaio(mouseX);
    mostrarRaio = true;
    tempoRaio = millis();

    flash = true;
    tempoFlash = millis();
  }
}

function preload() {
  chuvaSom = loadSound("sounds/chuva.mp3");
  aviaoSom = loadSound("sounds/somAviao.mp3");
  raioSom = loadSound("sounds/somRaio.mp3");
  aviao = loadImage("images/Avião.png")
}

function setup() {
  let canvas = createCanvas(750, 700);
  canvas.parent("canvas-container");
  noLoop();
  passos = height / 20;

  chuvaSom.setVolume(0.3);
  aviaoSom.setVolume(0.1);
  raioSom.setVolume(0.3)
  
  // Criar estrelas
  for (let i = 0; i < totalEstrelas; i++) {
    estrelas.push({
      estrelaX: random(width),
      estrelaY: random(height),
      brilhoEstrela: random(100, 255),
      tamanhoEstrela: random(1, 2)
    });
  }
  
  // Criar gotas
  for (let i = 0; i < totalGotas; i++) {
    gotas.push({
      gotasX: random(width),
      gotasY: random(height),
      veloGotas: random(10, 25),
      cumprimentoGotas: random(10, 15)
    });
  } 
}

function draw() {
  if (flash) {
    background(255, 255, 255, 40); // branco com transparência para efeito de flash
    if (millis() - tempoFlash > 125) {
      flash = false;
    }
  } else {
    background(17, 26, 51); // fundo normal
    desenharLua();
    desenharEstrela();
    desenharChuva();
    
    image(aviao, aviaoX, aviaoY, 125, 50);
    aviaoX -= 2;
    aviaoY -= 0.9;
  }

  if (mostrarRaio) {
    desenharRaio();

    if (millis() - tempoRaio > 300) {
      mostrarRaio = false;
    }
  } else {
    if (random() < 0.009) {
      gerarRaio();
      mostrarRaio = true;
      tempoRaio = millis();
      
      // Ligar o flash junto com o raio
      flash = true;
      tempoFlash = millis();
    }
  }
}
