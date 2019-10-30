<template>
    <v-list dense shaped>
        <span v-for="category in links" :key="category.name">
            <v-subheader class="mt-4 white--text font-weight-bold text--darken-1">{{category.name}}</v-subheader>
            <span v-for="link in category.links" :key="link.route">
                <v-list-item v-if="checkPermitted(link, category)" ripple link :to="{name: link.route}" class="route"
                             exact>
                    <v-list-item-action>
                        <font-awesome-icon :icon="link.icon" size="lg"/>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            {{link.label}}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </span>
        </span>
    </v-list>
</template>

<script>
    export default {
        data: () => ({
            drawer: null,
            applicationName: 'Service Management System',
            logged: true,
            links: [
                {
                    name: 'Główne', available: 0, links: [
                        {route: 'HomePage', label: 'Strona głowna', icon: 'home', available: true},
                    ]
                },
                {
                    name: 'Zgłoszenia', available: 0, links: [
                        {
                            route: 'TicketCheckStatus',
                            label: 'Sprawdź status zgłoszenia',
                            icon: 'clipboard-check',
                            available: true
                        },
                        {route: 'TicketsList', label: 'Lista zgłoszeń', icon: 'clipboard-list', available: true},
                        {route: 'TicketCreate', label: 'Dodaj zgłoszenie', icon: 'plus', available: true},
                    ]
                },
                {
                    name: 'Klienci', available: 0, links: [
                        {route: 'ClientList', label: 'Lista klientów', icon: 'users', available: true},
                        {route: 'ClientCreate', label: 'Dodaj klienta', icon: 'user-plus', available: true},
                    ]
                },
                {
                    name: 'Urządzenia', available: 0, links: [
                        {route: 'DeviceList', label: 'Lista urządzeń', icon: 'laptop', available: true},
                        {route: 'DeviceCreate', label: 'Dodaj urządzenie', icon: 'laptop-medical', available: true},
                    ]
                }
            ]
        }),
        methods: {
            checkPermitted(routeName) {
                if (this.$router.resolve({name: routeName.route}).route.meta.roles) {
                    if (this.$store.currentUser) {
                        return this.$router.resolve({name: routeName}).route.meta.roles.includes(this.$store.state.currentUser.role.name);
                    }
                    return false;
                }
                return true;
            },
        },
        computed: {
            check(routeName) {
                if (this.$router.resolve({name: routeName.route}).route.meta.roles) {
                    if (this.$store.currentUser) {
                        return this.$router.resolve({name: routeName}).route.meta.roles.includes(this.$store.state.currentUser.role.name);
                    }
                    return false;
                }
                return true;
            },
        }
    }
</script>

<style scoped>

</style>