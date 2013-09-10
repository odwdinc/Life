/* This script file handles the game logic */
.import QtQuick.LocalStorage 2.0 as Sql
.import QtQuick 2.0 as Quick
.import "js/game-of-life-v3.1.1.js" as GS

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


var component;


//Index function used instead of a 2D array
function index(column, row) {
    return column + (row * maxColumn);
}

function handleClick(xPos, yPos) {
    var column = Math.floor(xPos / GS.GOL.zoom.schemes[GS.GOL.zoom.current].cellSize);
    var row = Math.floor(yPos / GS.GOL.zoom.schemes[GS.GOL.zoom.current].cellSize);
    if (column >= maxColumn || column < 0 || row >= maxRow || row < 0)
        return [-1,-1];
    return [column,row];
}

var Context = {
    fillRect: function (x,y ,width ,height){

        if(width != GS.GOL.zoom.schemes[GS.GOL.zoom.current].cellSize){
            return;
        }

        var column = Math.floor(x / GS.GOL.zoom.schemes[GS.GOL.zoom.current].cellSize);
        var row = Math.floor(y / GS.GOL.zoom.schemes[GS.GOL.zoom.current].cellSize);

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

                dynamicObject.x = x;
                dynamicObject.y = y;
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


        if(cellState === currentSchemes.dead){
            dynamicObject.sTate = 0;
        }else if(cellState === currentSchemes.alive || currentSchemes.alive.indexOf(cellState) > -1){
            dynamicObject.sTate = 2;
        }else{
            dynamicObject.sTate = 5;
            dynamicObject.trailColor.color = cellState;
        }


    }

};

GS.setTimeout = function setTimeout(func,delay){
    //console.log("function setTimeout("+func+","+delay+")");
    screen.startTimer(delay);

}

GS.GOL.helpers.mousePosition = function (e) {
    return handleClick(e.x,e.y);
}


var Element = {
    getContext : function(vale){
        console.log("Element.getContext : function(" +vale+")");
        return Context;
    },
    s:{

    },
    style:{
        display:""
    },

    addEventListener :function (event, handler, capture){
        console.log("Element.addEventListener: function(" + event + ", " + handler + ", " + capture + ")" );

    },
    setAttribute : function(type,vale){
        console.log("Element.setAttribute : function("+ type + "," + vale + ")");
    },
    getAttribute : function(type,vale){
        console.log("Element.getAttribute : function("+ type + "," + vale + ")");
    },
    value : "Run",
    OldValue : "Run"

};


GS.navigator ={
    userAgent : "Mozilla/5.0"
}

GS.window={
    location:{
        href:"http://pmav.eu/stuff/javascript-game-of-life-v3.1.1/?autoplay=0&trail=0&grid=1&colors=1&zoom=1&s=%5B{%2239%22:%5B110%5D},{%2240%22:%5B112%5D},{%2241%22:%5B109,110,113,114,115%5D}%5D"
    }
};


GS.GOL.zoom={
    current : 0,
    schedule : false,
    schemes : [
        {
            columns : 23,
            rows : 16,
            cellSize : 36
        }
    ]
};

var testing = function(){
    GS.GOL.handlers.buttons.run();
};



GS.document ={
    body: Element,

    getElementById : function(type){
        console.log("document.getElementById("+type+")");
        if(ElementID[type] == null){
            ElementID[type] = Element;
        }
        /*
                           ["canvas",
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
                           buttonGrid
                           buttonColors
                           exportUrlLink
                           exportTinyUrlLink
                           exportUrl]
        */
        return ElementID[type];
    },
    addEventListener :function (event, handler, capture){
        console.log("document.addEventListener: function(" + event + ", " + handler + ", " + capture + ")" );

    }
};

/**
this.element.steptime.text = "steptime 0 / 0 (0 / 0)"
this.element.livecells.text = "livecells: 0";
this.element.generation.text = 'Generation: 0';
this.element.generation = generation;
this.element.steptime = steptime;
this.element.livecells = livecells;

this.element.generation.text = "Generation: "+this.generation;
this.element.steptime.text = "steptime "+algorithmTime + ' / '+guiTime+' ('+Math.round(this.times.algorithm) + ' / '+Math.round(this.times.gui)+')';
this.element.livecells.text = "livecells: "+liveCellNumber;

**/

function startNewGame(){
    console.log("Start New Game!");
    GS.GOL.init();
}

function update(){
    //console.log("function update()");
    GS.GOL.nextStep();
}


function gamePause(){
    GS.GOL.handlers.buttons.run();

}

function gameClear(){
    GS.GOL.handlers.buttons.clear();
}

function gameStep(){
    GS.GOL.handlers.buttons.step();
}

function chengeCell(column,row){

}

function MouseDown(event){
    GS.GOL.handlers.canvasMouseDown(event);
}

function MouseUp(event){
    GS.GOL.handlers.canvasMouseUp();
}
function  MouseMove(event){
    //event.offsetParent = false;
    GS.GOL.handlers.canvasMouseMove(event);
}








function setupscreen(){
    //Calculate board size
    maxColumn = Math.floor(gameCanvas.width / gameCanvas.blockSize);
    maxRow = Math.floor(gameCanvas.height / gameCanvas.blockSize);
    maxIndex = maxRow * maxColumn;
    //Initialize Board
    board = new Array(maxIndex);

    for (var column = 0; column < maxColumn; column++) {
        for (var row = 0; row < maxRow; row++) {
            createBlock(column, row);
        }
    }
}

function createBlock(column, row) {

    if (component == null)
        component = Qt.createComponent("Block.qml");

    // Note that if Block.qml was not a local file, component.status would be
    // Loading and we should wait for the component's statusChanged() signal to
    // know when the file is downloaded and ready before calling createObject().
    if (component.status == Quick.Component.Ready) {
        var dynamicObject = component.createObject(gameCanvas);
        if (dynamicObject == null) {
            console.log("error creating block");
            console.log(component.errorString());
            return false;
        }
        dynamicObject.row = row;
        dynamicObject.column = column;

        dynamicObject.x = column * gameCanvas.blockSize;
        dynamicObject.y = row * gameCanvas.blockSize;
        dynamicObject.width = gameCanvas.blockSize;
        dynamicObject.height = gameCanvas.blockSize;
        board[index(column, row)] = dynamicObject;
    } else {
        console.log("error loading block component");
        console.log(component.errorString());
        return false;
    }
    return true;
}








