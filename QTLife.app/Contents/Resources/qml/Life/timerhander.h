#ifndef TIMERHANDER_H
#define TIMERHANDER_H

#include <QQuickItem>
#include <QTimer>
#include <QThread>

class TimerHander : public QQuickItem
{
    Q_OBJECT
public:
    explicit TimerHander(QQuickItem *parent = 0);

private:

signals:

public slots:
    void update();
    void startTimer(const int &delay);
};

#endif // TIMERHANDER_H
