//Create the renderer

function drawSlope(angle,height) {
    /*
               D    C
               |->(height)
    F     E-----  
            disp
    A               B
    */
    //fatores multiplicativos do talude
    var factor1 = 2;
    var factor2 = 2;
    var factor3 = 2;


    var baseX = 0;
    //fazendo assim pois o P(0,0) fica no canto superior esquerdo
    var baseY = renderer.view.height;
    var slope = new PIXI.Graphics();
    slope.lineStyle(4,0xFFFFFF,1);
    slope.x=20;
    slope.y=-50;
    slope.beginFill(0x00FF00);
    var A = {x:baseX,y:baseY}
    var displacement = height/Math.tan(Math.PI*angle/180);
    console.log(displacement);
    var B = {x:4*height+displacement,
             y:baseY}
    var C = {x:B.x,y:baseY-factor1*height}
    var D = {x:C.x-2*height,y:C.y}
    var E = {x:2*height,y:baseY-(factor1*height-height)}
    var F = {x:0,y:E.y}    

    var path = [
        A.x,A.y,
        B.x,B.y,
        C.x,C.y,
        D.x,D.y,
        E.x,E.y,
        F.x,F.y
    ]
    slope.drawPolygon(path);
    slope.endFill();
    
    stage.addChild(slope);

}


var renderer = PIXI.autoDetectRenderer(512, 512,
{antialias: true, transparent: false, resolution: 1}
);
renderer.backgroundColor = 0x061639;
renderer.autoResize = true;

//Add the canvas to the HTML document
document.body.appendChild(renderer.view);

//Create a container object called the `stage`
var stage = new PIXI.Container();

// PIXI.loader.add("Lenna.png").load(setup);

// //This `setup` function will run when the image has loaded
// function setup() {

// //Create the `cat` sprite from the texture
// var lenna = new PIXI.Sprite(
//     PIXI.loader.resources["Lenna.png"].texture
// );
// stage.addChild(lenna);
//}
drawSlope(30,80);


//Tell the `renderer` to `render` the `stage`
renderer.render(stage);

    
          
        
