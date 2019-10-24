<template>
    <v-list dense shaped>
        <span v-for="category in links" :key="category.category">
            <v-subheader class="mt-4 white--text font-weight-bold text--darken-1">{{category.category}}</v-subheader>
            <span v-for="link in category.links" :key="link.route">
                <v-list-item ripple link :to="{name: link.route}" class="route" exact>
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
                    category: 'Główne', links: [
                        {route: 'HomePage', label: 'Strona głowna', icon: 'home'},
                    ]
                },
                {
                    category: 'Zgłoszenia', links: [
                        {route: 'TicketCheckStatus', label: 'Sprawdź status zgłoszenia', icon: 'clipboard-check'},
                        {route: 'TicketsList', label: 'Lista zgłoszeń', icon: 'clipboard-list'},
                        {route: 'TicketCreate', label: 'Dodaj zgłoszenie', icon: 'plus'},
                    ]
                },
                {
                    category: 'Klienci', links: [
                        {route: 'ClientList', label: 'Lista klientów', icon: 'users'},
                        {route: 'ClientCreate', label: 'Dodaj klienta', icon: 'user-plus'},
                    ]
                }
            ]
        }),
    }
</script>

<style scoped>

</style>