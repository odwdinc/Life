#include <QtGui/QGuiApplication>
#include "qtquick2applicationviewer.h"
#include "qml/Life/timerhander.h"
#include <QThread>
#include <QQuickItem>
#include <QString>
#include <QObject>




 int main(int argc, char *argv[])
{
    QGuiApplication app(argc, argv);

    QtQuick2ApplicationViewer viewer;


    viewer.setMainQmlFile(QStringLiteral("qml/Life/main.qml"));


    QObject *item = viewer.rootObject();

    TimerHander *handler = new TimerHander(viewer.rootObject());

    QObject::connect(item, SIGNAL(startTimer(int)), handler, SLOT(startTimer(int)));


    viewer.showExpanded();


    QThread *cThread = app.thread();

    handler->moveToThread(cThread);



    if(cThread->isRunning())
    {
        qDebug() << "Thread is Running...";
        QMetaObject::invokeMethod(viewer.rootObject(), "init");
    }

    int re =  app.exec();

   return re;
}
