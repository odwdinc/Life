
import QtQuick 2.0
import "LifeGame.js" as SameGame

Rectangle {
    id: screen
    function startNewGame(){
        SameGame.startNewGame();
    }
    function update(){
        SameGame.update();
    }
    property alias gameModeButton: gameMode.text

    property bool paused: false

    signal startTimer(int delay)

    width: 1020; height: 720

    SystemPalette { id: activePalette }

    Item {
        width: parent.width
        anchors { top: parent.top; bottom: toolBar.top }

        Image {
            id: background
            anchors.fill: parent
            //source: "../shared/pics/background.jpg"
            fillMode: Image.PreserveAspectCrop
        }

        Item {
            id: gameCanvas
            property int score: 0
            property int blockSize: 40

            anchors.centerIn: parent
            width: parent.width - (parent.width % blockSize);
            height: parent.height - (parent.height % blockSize);

            MouseArea {
                anchors.fill: parent;
                onClicked: SameGame.handleClick(mouse.x,mouse.y);
                onPositionChanged: SameGame.handleClick(mouse.x,mouse.y);

            }
        }
    }


    Rectangle {
        id: toolBar
        x: 0
        y: 690
        width: parent.width; height: 30
        color: activePalette.window
        anchors.bottomMargin: 0
        anchors.bottom: screen.bottom

        Button {
            id: buttonRun
            anchors { left: parent.left; }
            text: "New Game"
            anchors.bottom: parent.bottom
            anchors.bottomMargin: 8
            onClicked: SameGame.startNewGame()
        }

        Text {
            id: generation
            x: 335
            y: 4
            width: 109
            height: 18
            text: "Generation: #"
            font.pointSize: 9
            anchors.verticalCenterOffset: -2
            anchors { right: parent.right; verticalCenter: parent.verticalCenter }
            horizontalAlignment: Text.AlignHCenter
            anchors.rightMargin: 636
        }

        Button {

            id: gameMode
            x: 95
            y: 4
            text: "Pause"
            anchors.bottom: parent.bottom
            anchors.bottomMargin: 8
            onClicked:SameGame.gamePause();
        }

        Button {
            id: gameClear
            x: 256
            y: 1
            text: "Clear"
            anchors.bottom: parent.bottom
            anchors.bottomMargin: 8
            onClicked:SameGame.gameClear();
        }

        Button {
            id: gameStep
            x: 173
            y: 1
            text: "Step"
            anchors.bottom: parent.bottom
            anchors.bottomMargin: 8
            onClicked:SameGame.gameStep();
        }

        Text {
            id: livecells
            x: 458
            y: 4
            width: 109
            height: 18
            text: "livecells: #"
            anchors.right: parent.right
            anchors.verticalCenter: parent.verticalCenter
            horizontalAlignment: Text.AlignHCenter
            font.pointSize: 9
            anchors.rightMargin: 513
            anchors.verticalCenterOffset: -2
        }

        Text {
            id: steptime
            x: 592
            y: 4
            width: 216
            height: 18
            text: "steptime # / 0 (0 / 0) ms"
            anchors.verticalCenter: parent.verticalCenter
            anchors.right: parent.right
            font.pointSize: 9
            horizontalAlignment: Text.AlignHCenter
            anchors.rightMargin: 272
            anchors.verticalCenterOffset: -2
        }
    }
    states: [
        State {
            name: "Paused"
            when: paused == true
            PropertyChanges {
                target: gameMode
                text: "Play"
            }
        },
        State {
            when: paused == false
            name: "Playing"
        }
    ]
}
