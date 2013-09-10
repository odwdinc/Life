#include "timerhander.h"

TimerHander::TimerHander(QQuickItem *parent) : QQuickItem(parent){
}

void TimerHander::startTimer(const int &delay){
    QTimer *timer = new QTimer(this);
    timer->setSingleShot(true);
    QObject::connect(timer, &QTimer::timeout, this, &TimerHander::update);
    timer->start(delay);
    QString strre;
    strre.sprintf("TimerHander::startTimer(%d)",delay);
    qDebug() << strre;
}

void TimerHander::update(){
    qDebug() << "TimerHander::update()";
    QMetaObject::invokeMethod(this->parent(), "update");
}
