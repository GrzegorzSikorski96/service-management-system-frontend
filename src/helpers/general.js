import axios from 'axios';
import Vue from 'vue'
import {refreshToken} from '../helpers/auth';

export function initialize(store, router) {
    router.beforeEach((to, from, next) => {
            const currentUser = store.state.currentUser;

            if (!(to.meta.forVisitors && currentUser)) {
                if (to.matched.some(record => record.meta.roles)) {
                    if (currentUser) {
                        if (!(to.meta.roles.includes(currentUser.role.name))) {
                            return next({path: '/'})
                        }
                    } else {
                        return next({path: '/login'})
                    }
                }
                return next()
            }
            return next({path: '/'})
        }
    );

    axios.interceptors.request.use((config) => {
        config.baseURL = process.env.VUE_APP_BACKEND_URL;

        return config;
    });

    axios.interceptors.response.use(null, (error => {
        switch (error.response.status) {
            case 400: {
                Vue.toasted.show(error.response.data.message, {
                    type: 'error'
                });
                break;
            }
            case 401: {
                // eslint-disable-next-line no-console
                console.log(error.response.data.message)
                switch (error.response.data.message) {
                    case 'TOKEN_EXPIRED':
                        refreshToken()
                            .then((res) => {
                                store.commit('refreshToken', res);
                                router.go(0);
                            });
                        break;
                    case 'TOKEN_BLACKLISTED':
                    case 'TOKEN_INVALID':
                        store.commit('logout');
                        router.push('/login');
                        break;
                    default:
                        router.push('/unauthorized')
                }

                break;
            }
            case 403: {
                router.push('/forbidden');
                break;
            }
            case 404: {
                router.push('/404');
                break;
            }
        }
    }));

    if (store.getters.currentUser) {
        setAuthorization(store.getters.getToken);
    }
}

export function setAuthorization(token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
