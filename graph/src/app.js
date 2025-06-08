//import { Node } from "./Objects/node";
//import { Point } from "./Objects/point";

draw = (g) => {
    g.lineStyle(4, 0x000FF0, 1);
    g.beginFill(0x000FF0);
    nodes.draw(g);
    g.endFill();
}




//Create a Pixi Application
let width = 512;
let height = 256;
var app = new PIXI.Application(width, height,
    { antialias: true, transparent: false, resolution: 1, backgroundColor: 0xffff00 }
);

app.autoResize = true;
document.body.appendChild(app.view);

let nodes = [];
nodes.push(new Node(2));
nodes.push(new Node(25556));
nodes.push(new Node(33));
nodes.push(new Node(36));
nodes.push(new Node(37));
nodes.push(new Node(38));


nodes.forEach((element, index) => {
    element.setXY(100 + Math.floor(index / 2) * 100, 50 + 100 * (index % 2));
    element.drawMe(app.stage);
});

let intersects = [[1, 2], [1, 3], [2, 5]]
intersects.forEach((pair) => {
    const [p1, p2] = nodes[pair[0]].connect(nodes[pair[1]]);
    let gs = new PIXI.Graphics();
    gs.lineStyle(4, 0x0, 1);
    gs.moveTo(p1.x, p1.y);
    gs.lineTo(p2.x, p2.y);
    app.stage.addChild(gs);
});

app.render();

function zoom(option) {
    let oldScaleX = app.stage.scale.x;
    let oldScaleY = app.stage.scale.y;
    switch (option) {
        case '+':
            app.stage.setTransform(0,0,oldScaleX*1.1,oldScaleY*1.1);
            break;
        case '-':
            app.stage.setTransform(0,0,oldScaleX*0.9,oldScaleY*0.9);
            break;
    
        default:
            console.log('invalid');
        
            break;
    }
}


