import Vue from 'vue'

Vue.use(require('vue-pusher'), {
    api_key: 'b523965da7bc10d9d529',
    options: {
        cluster: 'eu',
        forceTLS: true
    }
});