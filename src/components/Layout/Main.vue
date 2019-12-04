<template>
    <v-app id="app">
        <v-navigation-drawer
                v-model="drawer"
                app
                clipped
                dark
                color="#202338"
        >
            <v-list-item v-if="currentUser">
                <v-list-item-content>
                    <v-list-item-title class="title">
                        {{ currentUser.name }} {{ currentUser.surname }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        {{ currentUser.role.name }}
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <NavigationDrawerItems/>

            <template v-slot:append>
                <v-list-item link :ripple="{ class: 'red-text' }" @click="logout" v-if="currentUser">
                    <v-list-item-action>
                        <font-awesome-icon icon="sign-out-alt" size="lg" class="red--text"/>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title class="red--text">Wyloguj</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <router-link :to="{name: 'Login'}" class="route" v-else>
                    <v-list-item link :ripple="{ class: 'green-text' }">
                        <v-list-item-action>
                            <font-awesome-icon icon="sign-in-alt" size="lg" class="green--text"/>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title class="green--text">Zaloguj</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </router-link>
            </template>
        </v-navigation-drawer>

        <Toolbar>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
        </Toolbar>

        <v-content class="content">
            <router-view/>
        </v-content>
    </v-app>
</template>

<script>
    import Toolbar from "./Toolbar";
    import NavigationDrawerItems from "./NavigationDrawerItems";

    export default {
        name: 'MainLayout',
        components: {
            Toolbar,
            NavigationDrawerItems,
        },
        data: () => ({
            drawer: null,
            service: {},
        }),
        methods: {
            fetchService() {
                this.$http.get('/api/service').then((response) => {
                    this.service = response.data.data.service;
                    document.title = this.service.name;
                })
            },
            logout() {
                this.$http.post('/api/auth/logout')
                    .then(() => {
                        this.$store.commit('logout');
                        this.$router.push('/login');
                    });
            },
        },
        created() {
            this.fetchService();
        }
    }
</script>

<style scoped>
    .route {
        text-decoration: none;
    }
</style>