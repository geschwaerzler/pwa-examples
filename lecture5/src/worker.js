const TIME_FORMAT = Intl.DateTimeFormat('de-DE',
    { hour: 'numeric', minute: 'numeric', second: 'numeric' });

function postTimeFormatted() {
    const time = TIME_FORMAT.format(new Date())
    console.debug(`message to main: ${time}`);
    postMessage({ myTime: time });
}

onmessage = (event) => {
    console.debug(`message to worker: ${event.data}`);
    if (event.data.waitFor && !Number.isNaN(event.data.waitFor)) {
        //expected message format: { waitFor: number }
        setTimeout(postTimeFormatted, 1000 * event.data.waitFor)
    }
}

onerror = (errorEvent) => {
    console.log(`Error in worker: ${errorEvent.message}`);
}