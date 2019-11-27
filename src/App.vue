<template>
    <div>
        <div v-if="!loading">
            <div v-if="isInitialized">
                <Main></Main>
            </div>

            <div v-else>
                <v-app id="app">
                    <v-content class="content" v-if="!currentUser">
                        <login></login>
                    </v-content>
                    <v-content class="content" v-else>
                        <initialize @initialized="checkInitialized"></initialize>
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
        data: () => ({
            service: [],
            logged: false,
            loading: true,
        }),
        components: {
            Main,
            Login,
            Initialize,
            Loading
        },
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