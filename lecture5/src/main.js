const KICK_OFF_WORKER_ID = "kick-off-worker";
const WORKERS_TIME_ID = "workers-time";

function updateWorkersTime(event) {
    //we expect a message in event.data in the form of
    //{myTime: string}
    if (event.data.myTime) {
        const timeElem = document.getElementById(WORKERS_TIME_ID);
        timeElem.innerHTML = event.data.myTime;
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

function kickOffWorker() {
    worker.postMessage({ waitFor: 5.0 });
}

document.getElementById(KICK_OFF_WORKER_ID)
    .addEventListener('click', kickOffWorker);