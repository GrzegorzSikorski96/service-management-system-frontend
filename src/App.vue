<template>
    <div>
        <div v-if="!loading">
            <div v-if="isInitialized">
                <Main/>
            </div>

            <div v-else>
                <v-app id="app">
                    <v-content class="content" v-if="!currentUser">
                        <login/>
                    </v-content>
                    <v-content class="content" v-else>
                        <initialize @initialized="checkInitialized"/>
                    </v-content>
                </v-app>
            </div>
        </div>

        <div v-else>
            <v-app id="app">
                <v-content class="content">
                    <loading/>
                </v-content>
            </v-app>
        </div>
    </div>
</template>

<style>
    .content {
        background-color: #eceff1;
    }
</style>

<script>
    import Login from "./components/Login";
    import Initialize from "./components/Service/Initialize";
    import Main from "./components/Layout/Main";
    import Loading from "./components/Helpers/Loading"

    export default {
        name: 'App',
        components: {
            Main,
            Login,
            Initialize,
            Loading
        },
        data: () => ({
            service: [],
            logged: false,
            loading: true,
        }),
        methods: {
            checkInitialized() {
                this.$http.get('/api/service/initialized')
                    .then((response) => {
                        this.isInitialized = response.data.data.initialized;
                        this.loading = false;
                    })
            },
        },
        created() {
            this.checkInitialized();
        }
    }
</script>