(function (window) {
    'use strict';

    /*
     * Override alert
     * */
    if ('alert' in window) {
        window.alert = function (msg) {
            console.log(msg);

            if (Crafty('DebugMsg').log) {
                Crafty('DebugMsg').log(msg);
            }
        }
    }
}(window));