const TIME_FORMAT = Intl.DateTimeFormat('de-DE',
    { hour: 'numeric', minute: 'numeric', second: 'numeric' });

function postTimeMessage(countDown) {
    const time = TIME_FORMAT.format(new Date())
    console.debug(`message to main: ${time}`);
    postMessage({ myTime: time });
    if (countDown > 0) {
        //this is not a recursive call to postTimeMessage!
        setTimeout(() => postTimeMessage(countDown - 1), 1000);
    } else {
        postMessage({ idle: true });
    }
}

onmessage = (event) => {
    console.debug(`message from main: ${event.data}`);
    if (event.data.getClockTicks && !Number.isNaN(event.data.getClockTicks)) {
        //expected message format: { getClockTicks: number }
        postTimeMessage(event.data.getClockTicks);
    }
}

onerror = (errorEvent) => {
    console.log(`Error in worker: ${errorEvent.message}`);
}