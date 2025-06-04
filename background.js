let chuvaSketch = (p) => {
let v = [];
let qtd = 300;

p.setup = function () {
    let cnv = p.createCanvas(p.windowWidth, p.windowHeight);
    cnv.id('chuva');
    cnv.style('position', 'fixed');
    cnv.style('top', '0');
    cnv.style('left', '0');
    cnv.style('z-index', '-1');
    cnv.style('pointer-events', 'none'); // permite clicar em botões normalmente
    p.noStroke();

    for (let i = 0; i < qtd; i++) {
        v[i] = [];
        v[i][0] = p.random(p.width);
        v[i][1] = p.random(p.height);
        v[i][2] = p.random(1, 5);
        }
    };

    p.draw = function () {
        p.background(0, 100);
        p.stroke(200);

        for (let i = 0; i < qtd; i++) {
        let x = v[i][0];
        let y = v[i][1];
        let tamanho = p.map(v[i][2], 1, 5, 12, 4);
        let str = p.map(v[i][2], 1, 5, 2.5, 0.5);
        p.strokeWeight(str);
        p.line(x, y, x, y + tamanho);
        let velo = p.map(v[i][2], 1, 5, 10, 3);
        v[i][1] += velo;

        if (v[i][1] > p.height) {
            v[i][1] = 0;
            v[i][0] = p.random(p.width);
            v[i][2] = p.random(1, 5);
        }
        }
    };

    p.windowResized = function () {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
};

new p5(chuvaSketch);
