import Vue from 'vue';
import './plugins/fontawesome';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import axios from "axios";
import VueAxios from 'vue-axios';
import Vuex from 'vuex';
import store from './store';
import {initialize} from "./helpers/general";
import Toasted from 'vue-toasted';
import * as pusher from './plugins/pusher'

Vue.use(Vuex);

Vue.use(Toasted, {
    theme: "bubble",
    position: "top-center",
    duration: 5000
});

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

Vue.mixin({
    methods: {
        isAdmin() {
            return store.state.currentUser.role.name === 'administrator';
        },
    }
});

axios.defaults.baseURL = "http://sms.test";

initialize(store, router);

new Vue({
    vuetify,
    router,
    store,
    pusher,
    render: h => h(App)
}).$mount('#app')
