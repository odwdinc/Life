/* This script file handles the game logic */
.import QtQuick.LocalStorage 2.0 as Sql
.import QtQuick 2.0 as Quick
.import "js/game-of-life-v3.1.1.js" as GS
.import "js/json-sans-eval.js" as JS

var maxColumn = 22;
var maxRow = 15;
var maxIndex = maxColumn * maxRow;
var board = new Array(maxIndex);
var ElementID = new Array(16);

var Elements = new Array(["canvas",
                          "generation",
                          "steptime",
                          "livecells",
                          "layoutMessages",
                          "hint",

                          "buttonRun",
                          "buttonStep",
                          "buttonClear",
                          "buttonExport",
                          "buttonTrail",
                          "buttonGrid",
                          "buttonColors",
                          "exportUrlLink",
                          "exportTinyUrlLink",
                          "exportUrl",]);

/**
innerHTML

value
href
style.display
**/

var component;


//Index function used instead of a 2D array
function index(column, row) {
    return column + (row * maxColumn);
}

function handleClick(xPos, yPos) {
    console.log(GS.GOL.canvas.width + " : " + gameCanvas.width + " -> "+xPos);


    console.log(GS.GOL.canvas.width +" -> "+ " : " + gameCanvas.width + " -> "+Math.floor(xPos/gameCanvas.blockSize));

    var column = Math.floor(xPos/gameCanvas.blockSize);
    var row = Math.floor(yPos/gameCanvas.blockSize);

    return [column,row];
}


var Context = {
    type : "Context",
    fillRect: function (x,y ,width ,height){

        if(width != GS.GOL.zoom.schemes[GS.GOL.zoom.current].cellSize){
            return;
        }

        var cellSpace = GS.GOL.canvas.cellSpace;

        var column = ((x+cellSpace)/cellSpace) / 771 * 720;
        var row = ((y+cellSpace)/cellSpace)/ 496 * 470;



        var  dynamicObject = board[index(column, row)];

        if(dynamicObject == null){

            if (component == null)
                component = Qt.createComponent("Block.qml");

            // Note that if Block.qml was not a local file, component.status would be
            // Loading and we should wait for the component's statusChanged() signal to
            // know when the file is downloaded and ready before calling createObject().
            if (component.status == Quick.Component.Ready) {
                dynamicObject = component.createObject(gameCanvas);
                if (dynamicObject == null) {
                    console.log("error creating block");
                    console.log(component.errorString());
                    return false;
                }

                dynamicObject.x = column;
                dynamicObject.y = row;
                dynamicObject.width = width;
                dynamicObject.height = height;
                dynamicObject.trailColor.width = width;
                dynamicObject.trailColor.height = height;

                board[index(column, row)] = dynamicObject;
            } else {
                console.log("error loading block component");
                console.log(component.errorString());
                return false;
            }
        }

        var cellState = GS.GOL.canvas.context.fillStyle;
        var currentSchemes = GS.GOL.colors.schemes[GS.GOL.colors.current];
        /**
        if(cellState === currentSchemes.dead){
            dynamicObject.sTate = 0;
        }
        else{
        **/
        dynamicObject.sTate = 5;
        dynamicObject.trailColor.color = cellState;
        //}


    }

};

GS.setTimeout = function setTimeout(func,delay){
    updateScreen();
    screen.startTimer(delay);


};

GS.GOL.keepDOMElementsr= function() {

    this.element.generation = generation;
    this.element.steptime = steptime;
    this.element.livecells = livecells;

    this.element.steptime.text = "steptime 0 / 0 (0 / 0)"
    this.element.livecells.text = "livecells: 0";
    this.element.generation.text = 'Generation: 0';

};

GS.GOL.helpers.mousePosition = function (e) {
    //console.log(gameCanvas.width+","+gameCanvas.height);
    return handleClick(e.x,e.y);
};


var Element = function(vale){
    return {
        type : vale,
        getContext : function(vale){
            return Context;
        },
        s:{

        },
        style:{
            display:""
        },
        func : [],
        addEventListener :function (event, handler, capture){
            this.func[event]=handler;
        },
        setAttribute : function(type,vale){
            console.log("Element("+this.type+").setAttribute : function("+ type + "," + vale + ")");
            if(type === "width"){

            }
        },
        getAttribute : function(type,vale){
            console.log("Element("+this.type+").getAttribute : function("+ type + "," + vale + ")");
        },
        innerHTML:"",
        value:"",
        href:"",
        style : {
            display:""
        },
        OldValue : {
            innerHTML:"",
            value:"",
            href:"",
            style:{

                display:""
            }

        }
    };

};


GS.navigator ={
    userAgent : "Mozilla/5.0"
};

GS.window={
    location:{
        href:"http://pmav.eu/stuff/javascript-game-of-life-v3.1.1/?autoplay=0&trail=0&grid=1&colors=1&zoom=1&s=%5B{%2239%22:%5B110%5D},{%2240%22:%5B112%5D},{%2241%22:%5B109,110,113,114,115%5D}%5D"
    }
};

GS.jsonParse =function(json){
    var state, i, j, y;

    console.log("jsonParse("+json+")");
    var myJsonObj = JS.jsonParse(json);
    console.log("myJsonObj.length "+myJsonObj.length);

    for (i = 0; i < myJsonObj.length; i++) {

        console.log("myJsonObj[i] "+myJsonObj[i]);

        for (y in myJsonObj[i]) {
            for (j = 0 ; j < myJsonObj[i][y].length ; j++) {
                console.log("this.listLife.addCell("+myJsonObj[i][y][j]+", "+parseInt(y, 10)+", "+GS.GOL.listLife.actualState+")");
            }
        }
    }


    return myJsonObj;

}






GS.document ={
    body: new Element("document"),

    getElementById : function(type){

        if(ElementID[type] == null){
            ElementID[type] = new Element(type);;
        }
        //srconsole.log("document.getElementById("+type+").type = "+ElementID[type].type );
        return ElementID[type];
    },
    func : [],
    addEventListener :function (event, handler, capture){
        this.func[event]=handler;
    }
};
function updateScreen(){
    generation.text = "Generation: "+GS.GOL.element.generation.innerHTML;
    livecells.text = "livecells: "+GS.GOL.element.livecells.innerHTML;
    steptime.text =  "steptime "+ GS.GOL.element.steptime.innerHTML;
    buttonRun.text = GS.document.getElementById('buttonRun').value;
}

function init(){
    maxColumn = gameCanvas.width/gameCanvas.blockSize;
    maxRow = gameCanvas.height/gameCanvas.blockSize;


    console.log("Start New Game! "+gameCanvas.width+":"+maxColumn+","+gameCanvas.height+":"+maxRow);

    maxIndex = maxColumn * maxRow;





    GS.GOL.zoom={
        current : 0,
        schedule : false,
        schemes : [
            {
                columns :maxColumn-2,
                rows : maxRow-2,
                cellSize : gameCanvas.blockSize
            }
        ]
    };


    GS.GOL.init();
}

function startNewGame(){

    GS.GOL.prepare();
}

function update(){
    GS.GOL.nextStep();
}


function gameRun(){
    GS.GOL.handlers.buttons.run();
}

function gameClear(){
    GS.GOL.handlers.buttons.clear();
}

function gameStep(){
    GS.GOL.handlers.buttons.step();
}

function MouseDown(event){
    GS.GOL.handlers.canvasMouseDown(event);
}

function MouseUp(event){
    GS.GOL.handlers.canvasMouseUp();
}
function  MouseMove(event){
    GS.GOL.handlers.canvasMouseMove(event);
}








