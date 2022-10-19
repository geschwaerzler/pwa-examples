const KICK_OFF_WORKER_ID = "kick-off-worker";

const buttonElem = document.getElementById(KICK_OFF_WORKER_ID);

function updateWorkersTime(event) {
    //we expect a message in event.data in the form of
    //{myTime: string}
    if (event.data.myTime) {
        buttonElem.innerHTML = event.data.myTime;
    } else if (event.data.idle) {
        buttonElem.innerHTML = "Press again to get more time updates";
    }
}

var worker;
if (window.Worker) {
    worker = new Worker(
        new URL('worker.js', import.meta.url),
        { type: 'module', name: 'simple worker' }
    );
    worker.onmessage = updateWorkersTime;
}

document.getElementById(KICK_OFF_WORKER_ID)
    .addEventListener('click', () => {
        worker.postMessage({ getClockTicks: 10 });
    });