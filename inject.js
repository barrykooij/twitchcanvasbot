var readyStateCheckInterval = setInterval(function() {
    if (canvasLoaded) {
        clearInterval(readyStateCheckInterval);
        document.dispatchEvent(new CustomEvent('twitchSessionTokenAvailable', { detail: window.Twitch.ext.viewer.sessionToken }))
    }
}, 1000);

document.addEventListener('placePixel', function (e) {
    var pixel = e.detail;

    socket.emit('p', {
        t: window.Twitch.ext.viewer.sessionToken,
        x: pixel.X,
        y: pixel.Y,
        c: pixel.Color,
    });
});

