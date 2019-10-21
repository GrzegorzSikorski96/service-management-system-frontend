<template>
    <v-list dense>
        <v-subheader class="mt-4 white--text font-weight-bold text--darken-1">GŁÓWNE</v-subheader>
        <router-link :to="{name: 'HomePage'}" class="route">
            <v-list-item ripple link>
                <v-list-item-action>
                    <font-awesome-icon icon="home" size="lg"/>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Strona Główna</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </router-link>

        <v-subheader class="mt-4 white--text font-weight-bold text--darken-1">ZGŁOSZENIA</v-subheader>
        <router-link :to="{name: 'TicketCheckStatus'}" class="route">
            <v-list-item ripple link>
                <v-list-item-action>
                    <font-awesome-icon icon="list-alt" size="lg"/>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Sprawdź status zgłoszenia</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </router-link>
        <router-link :to="{name: 'TicketCreate'}" class="route">
            <v-list-item ripple link>
                <v-list-item-action>
                    <font-awesome-icon icon="plus" size="lg"/>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Dodaj zgłoszenie</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </router-link>
    </v-list>
</template>

<script>
    export default {
        data: () => ({
            drawer: null,
            applicationName: 'Service Management System',
            logged: true
        }),
    }
</script>

<style scoped>

</style>