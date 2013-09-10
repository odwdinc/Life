import QtQuick 2.0
import QtQuick.Particles 2.0

Item {
    id: block
    property int sTate: 0


    property int column: 0
    property int row: 0
    property alias napors: text1.text
    property alias trailColor: rectangle2

    Rectangle {
        id: rectangle2
        x: -18
        y: -18
        width: 36
        height: 36
        color: "#ffffff"
        opacity: 0
    }

    Image {
        id: img
        scale: 1
        anchors.fill: parent
        source: "Living.png"
        opacity: 1

    }

    Text {
        id: text1
        x: 17
        y: 13
        width: 7
        height: 14
        text: qsTr("0")
        font.pixelSize: 12
    }



    states: [
        State {
            name: "AliveState"
            when: sTate == 2
            PropertyChanges { target: img; opacity: 1 }

            PropertyChanges {
                target: text1
                x: 16
                y: 9
                color: "#d7eace"
                font.pointSize: 11
                transformOrigin: "Center"
                styleColor: "#000000"
            }
        },

        State {
            name: "DeathState"
            when: sTate == 0
            PropertyChanges { target: img; opacity: 0 }

        },
        State {
            name: "StartingLlife"
            when: sTate == 1
            PropertyChanges {
                target: img
                scale: 0.5
                sourceSize.height: 259
                sourceSize.width: 243
                opacity: 1
            }

            PropertyChanges {
                target: text1
                color: "#34c429"
            }
        },
        State {
            name: "EndingLife"
            when: sTate == 3
            PropertyChanges {
                target: img
                scale: 0.7
                rotation: 100
                z: 0
                transformOrigin: "Center"
                smooth: true
                source: "Living.png"
                opacity: "1"
            }

            PropertyChanges {
                target: text1
                color: "#d10c5e"
            }
        },
        State {
            name: "Cancer"
            when: sTate == 4
            PropertyChanges {
                target: img
                source: "Cancer.png"
                sourceSize.height: 259
                sourceSize.width: 243
                opacity: 1
                scale: 1
            }

            PropertyChanges {
                target: text1
                color: "#a83f87"
            }
        },
        State {
            name: "History"
            when: sTate == 5
            PropertyChanges {
                target: img
                opacity: 0
            }
        }
    ]
}
