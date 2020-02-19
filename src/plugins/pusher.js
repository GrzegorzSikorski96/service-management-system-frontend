import Vue from 'vue'

Vue.use(require('vue-pusher'), {
    api_key: process.env.VUE_APP_PUSHER_API_KEY,
    options: {
        cluster: process.env.VUE_APP_PUSHER_CLUSTER,
        forceTLS: true
    }
});