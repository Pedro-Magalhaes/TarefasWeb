//função sendo chamada dentro da drawSlope
function drawLayers(heights,inicialPoints,colors,totalHeight,angle,mystage) {
    /*
        D       C

    A           B
    */
    if (heights==undefined || heights == null){
        console.log("não ha layers a desenhar");
        return
    }
    var MARGIN = 0.01; //margem de erro pra comparação de float

    var alturaRestante = totalHeight;   

    for (var i = 0; i < heights.length; i++) { 
        var myLayer = new PIXI.Graphics();
        myLayer.lineStyle(2,0xFFFFFF,1);
        if ((alturaRestante+MARGIN)-heights[i] < 0){
            //raise error (como fazer?)
            console.log("Erro de Altura, nao vou desenhar o layer",i,"e seguintes",heights,totalHeight);
            break;
        } 
        else {
            alturaRestante-=heights[i];            
        }
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
        //tornando os inicial points os ultimos da layer
        inicialPoints[0]=layerD;
        inicialPoints[1]=layerC;

        var layerPath = new PIXI.Polygon(
            new PIXI.Point (layerA.x,layerA.y),
            new PIXI.Point (layerB.x,layerB.y),
            new PIXI.Point (layerC.x,layerC.y),
            new PIXI.Point (layerD.x,layerD.y),
            new PIXI.Point (layerA.x,layerA.y),
        )
        myLayer.alpha = 0.8; //só pra destacar
        myLayer.beginFill(colors[i]);
        myLayer.drawPolygon(layerPath);
        myLayer.endFill();
        myLayer.hitArea = layerPath;
        myLayer.interactive = true;
        myLayer.buttonMode = true;

        myLayer.mouseover = function (mouseData) {
            this.alpha = 1;
        };
        myLayer.mouseout = function (mouseData) {
            this.alpha = .8;
        };
        mystage.addChild(myLayer);
    }

    //como alterei as coordenadas do slope depois de desenhar, tive que fazer o mesmo aqui

    
    
}
function drawSlope(angle,height,stage) {
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
    var baseY = app.renderer.view.height; //Y base é agora o canto inferior esquerdo
    var slope = new PIXI.Graphics();
    //slope.interactive=true;
    //slope.buttonMode=true;
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

    //acessando variavel global stage, considerar receber por parametro
    stage.addChild(slope);

    /* arrumando as variaveis pra chamar o drawlayers */
    C.y=E.y //mutreta pra nao ter que fazer outro ponto
    var inicial = [
        E,C
    ]
    var colors = [
        0xfff002,
        0xf00f00,
        0xf0b5ff,
    ]
    var alturas = [
        height/3,
        height/3,
        height/3
    ]
    //chamando a função de desenhar layers
    drawLayers(alturas,inicial,colors,height,angle,stage);
    
 
}

var width = document.getElementById('canvas').clientWidth;
var height = (9*width)/16; //16/9 aspect ratio

// pro render só precisa passar o width e o height o resto é opcional
var app = new PIXI.Application(width, height,{backgroundColor : 0xffffff},{antialias:true},{transparent:true});
//app.stage.position.set(width1/2, height2/2);

//Add the canvas to the HTML document
document.getElementById('canvas').appendChild(app.view);

//Create a container object called the `stage`
//var stage = new PIXI.Container();

//drawSlope(angulo,altura)
drawSlope(30,80,app.stage);

   
       