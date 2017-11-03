//Create the renderer
function drawLayers(inicialPoints,heights,colors,totalHeight,angle,mystage) {
    /*
        D       C

    A           B
    */
    var myLayer = new PIXI.Graphics();
    myLayer.lineStyle(2,0xFFFFFF,1);
    for (var i = 0; i < heights.length; i++) {   
        var disp = heights[i]/Math.tan(Math.PI*angle/180);     
        var layerA = {
            x : inicialPoints[0].x,
            y : inicialPoints[0].y
        }
        var layerB = {
            x : inicialPoints[1].x,
            y : layerA.y
        }
        var layerC = {
            x : layerB.x,
            y : layerB.y-heights[i]
        }
        var layerD = {
            x : layerA.x+disp,
            y : layerC.y
        }
        inicialPoints[0]=layerD;
        inicialPoints[1]=layerC;
        var layerPath = [
            layerA.x,layerA.y,
            layerB.x,layerB.y,
            layerC.x,layerC.y,
            layerD.x,layerD.y,
            layerA.x,layerA.y,
        ]
        myLayer.beginFill(colors[i]);
        myLayer.drawPolygon(layerPath);
        myLayer.endFill();
        
    }

//como alterei as coordenadas do slope depois de desenhar, tive que fazer o mesmo aqui
    myLayer.x+=20;
    myLayer.y-=20;

    mystage.addChild(myLayer);
}
function drawSlope(angle,height) {
    /*
               D        C
               |->(height)
    F     E-----  
            disp
    A                   B
    */
    //fatores multiplicativos do talude
    var factor1 = 2; //fator que gera a altura de B até C
    var factor2 = 2; //fator que gera o comprimento de F até E
    var factor3 = 2; //fator que gera o comprimento de D até C


    var baseX = 0;
    //fazendo assim pois o P(0,0) fica no canto superior esquerdo
    var baseY = renderer.view.height; //Y base é agora o canto inferior esquerdo
    var slope = new PIXI.Graphics();
    slope.lineStyle(2,0xFFFFFF,1);
    
    var displacement = height/Math.tan(Math.PI*angle/180);    
    var A = {
        x:baseX,
        y:baseY
    }    
    var B = {
        x:factor2*factor3*height+displacement,
        y:baseY
            }
    var C = {
        x:B.x,
        y:baseY-factor1*height
    }
    var D = {
        x:C.x-factor2*height,
        y:C.y
    }
    var E = {
        x:factor2*height,
        y:baseY-(factor1*height-height)
    }
    var F = {
        x:0,
        y:E.y
    }    
    //lista que liga todos os pontos do talude
    var path = [
        A.x,A.y,
        B.x,B.y,
        C.x,C.y,
        D.x,D.y,
        E.x,E.y,
        F.x,F.y,
        A.x,A.y
    ]
    slope.beginFill(0x00FFF0);
    slope.drawPolygon(path);
    slope.endFill();
    stage.addChild(slope);
    C.y=E.y //mutreta pra nao ter que fazer outro ponto 
    var inicial = [
        E,C
    ]
    var colors = [
        0xff0000,
        0x00ff00,
        0x0000ff
    ]
    var alturas = [
        height/3,
        height/3,
        height/3
    ]
    drawLayers(inicial,alturas,colors,height,angle,stage);
    //acessando variavel global, considerar receber por parametro
    slope.x=20;//movendo o slope pra fora do canto
    slope.y=-20;
    

}

// pro render só precisa passar o width e o height o resto é opcional
var renderer = PIXI.autoDetectRenderer(512, 256,
{antialias: true, transparent: false, resolution: 1}
);
renderer.backgroundColor = 0x061639;
renderer.autoResize = true;

//Add the canvas to the HTML document
document.body.appendChild(renderer.view);

//Create a container object called the `stage`
var stage = new PIXI.Container();

//drawSlope(angulo,altura)
drawSlope(30,80);


//Tell the `renderer` to `render` the `stage`
renderer.render(stage);

    
          
        
