if('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        this.navigator.serviceWorker.register('/sw.js').then(function(registeration) {
            //Registeration successful
            console.log('ServiceWorker registeration successful')
        }).catch(function(err) {
            console.log('ServiceWorker Failed');
        });
    });
}

