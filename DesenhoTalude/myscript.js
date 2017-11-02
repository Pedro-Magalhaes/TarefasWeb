//Create the renderer

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
    slope.lineStyle(4,0xFFFFFF,1);
    slope.x=20;//movendo o slope pra fora do canto
    slope.y=-20;
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
    slope.beginFill(0x00FF00);
    slope.drawPolygon(path);
    slope.endFill();
    
    //acessando variavel global, considerar receber por parametro
    stage.addChild(slope);

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

    
          
        
