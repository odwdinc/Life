import QtQuick 2.0
import QtQuick.Particles 2.0

Item {
    id: block
    property int sTate: 0

    //property alias napors: text1.text
    property alias trailColor: rectangle2

    Rectangle {
        id: rectangle2
        color: "#00000000"
        anchors.fill: parent
        border.color: "#000000"
        opacity: 1
    }
}
