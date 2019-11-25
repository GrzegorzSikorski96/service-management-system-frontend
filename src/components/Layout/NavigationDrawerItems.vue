<template>
    <v-list dense shaped>
        <v-list-item v-if="currentUser && currentUser.agency_id" ripple link
                     :to="{name: 'AgencySummary', params: { id: currentUser.agency_id }}"
                     class="route"
                     active-class="item-active"
                     exact>
            <v-list-item-action>
                <font-awesome-icon icon="toolbox" size="lg"/>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>
                    Oddział
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <span v-for="category in categories" :key="category.name">
            <v-subheader v-if="categoryAvailable(category)" class="mt-4 white--text font-weight-bold text--darken-1">{{category.name}}</v-subheader>
            <span v-for="link in category.links" :key="link.route">
                <v-list-item v-if="checkPermitted(link.route)" ripple link :to="{name: link.route}" class="route"
                             active-class="item-active"
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
            categories: [
                {
                    name: 'Główne', available: 0, links: [
                        {route: 'HomePage', label: 'Strona głowna', icon: 'home',},
                    ]
                },
                {
                    name: 'Zgłoszenia', available: 0, links: [
                        {route: 'TicketCheckStatus', label: 'Sprawdź status zgłoszenia', icon: 'clipboard-check',},
                        {route: 'TicketsList', label: 'Lista zgłoszeń', icon: 'clipboard-list',},
                        {route: 'TicketCreate', label: 'Dodaj zgłoszenie', icon: 'plus',},
                    ]
                },
                {
                    name: 'Klienci', available: 0, links: [
                        {route: 'ClientList', label: 'Lista klientów', icon: 'users',},
                        {route: 'ClientCreate', label: 'Dodaj klienta', icon: 'user-plus',},
                    ]
                },
                {
                    name: 'Urządzenia', available: 0, links: [
                        {route: 'DeviceList', label: 'Lista urządzeń', icon: 'laptop',},
                        {route: 'DeviceCreate', label: 'Dodaj urządzenie', icon: 'laptop-medical',},
                    ]
                },
                {
                    name: 'Użytkownicy', available: 0, links: [
                        {route: 'UsersList', label: 'Lista użytkowników', icon: 'users',},
                        {route: 'UserCreate', label: 'Dodaj użytkownika', icon: 'user-plus',},
                    ]
                },
                {
                    name: 'Oddziały', available: 0, links: [
                        {route: 'AgencyList', label: 'Lista oddziałów', icon: 'city',},
                        {route: 'AgencyCreate', label: 'Dodaj oddział', icon: 'clinic-medical',},
                    ]
                },
            ]
        }),
        methods: {
            checkPermitted(routeName) {
                if (this.$router.resolve({name: routeName}).route.meta.roles) {
                    if (this.$store.state.currentUser) {
                        return this.$router.resolve({name: routeName}).route.meta.roles.includes(this.$store.state.currentUser.role.name);
                    }
                    return false;
                }
                return true;
            },
            categoryAvailable(category) {
                let count = 0;

                category.links.forEach((item) => {
                    if (this.checkPermitted(item.route)) {
                        count++;
                    }
                });

                return count;
            }
        },
    }
</script>

<style scoped>
    .item-active {
        background-color: #48614b;
    }
</style>