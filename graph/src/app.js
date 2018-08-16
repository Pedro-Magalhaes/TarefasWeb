//import { Node } from "./Objects/node";

let node = [];
node.push(new Node(2));

draw = (g) => {
    g.lineStyle(4,0x000FF0,1);
    g.beginFill(0x000FF0);
    node.draw(g);
    g.endFill();
}




//Create a Pixi Application
var app = new PIXI.Application(512, 256,
    {antialias: true, transparent: false, resolution: 1,backgroundColor: 0xffff00}
    );
    
    app.autoResize = true;
document.body.appendChild(app.view);

node[0].setXY(256,128);
node[0].drawMe(app.stage);
node.push (new Node(25556));
node[1].setXY(256,200);
node[1].drawMe(app.stage);
let intersect = node[0].connect(node[1]);
console.log(intersect.length);
intersect.forEach(element => {
    let graphics = new PIXI.Graphics();
    graphics.lineStyle(1);
    graphics.beginFill(0xFFFFFF, 0.5);
    graphics.drawCircle(element.x, element.y,5);
    graphics.endFill();
    app.stage.addChild(graphics);
});

app.render();




