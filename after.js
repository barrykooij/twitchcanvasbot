// this code will be executed after page load
(function() {

  var isRunning = false;

  // run every 3 seconds
  setInterval(function() {mainLoop()}, 3100);

  function placePixel(pixel) {
    console.log("Placing pixel: ", pixel);
    document.dispatchEvent(new CustomEvent('placePixel', { detail: pixel }))
  }

  async function mainLoop() {
    if(!isRunning)
      return

    // fetch pixel
    const response = fetch('https://ttvcanvashelper.fun/Pixel').then(response => response.json()).then(data => {
      console.log("Placing pixel", data)
      placePixel(data);
    })

    //placePixel(pixels[pixelIndex]);
  }

  // catch session token
  document.addEventListener('twitchSessionTokenAvailable', function (e) {
    var data = e.detail;
    console.log('Session token received, activate main loop', data);
    isRunning = true;
  });

  if(location.href.startsWith("https://9jjigdr1wlul7fbginbq7h76jg9h3s.ext-twitch.tv")) {
    console.log('injecting code');

    var s = document.createElement('script');
    s.src = chrome.runtime.getURL('inject.js');
    s.onload = function() {
      this.remove();
    };
    (document.head || document.documentElement).appendChild(s);
  }
})();
