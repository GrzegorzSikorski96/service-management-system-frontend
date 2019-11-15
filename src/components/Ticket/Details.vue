<template>
    <v-card class="ma-3 pa-1" :elevation="5">
        <span v-if="!loading">
            <v-card-title>
                Dane zgłoszenia

                <v-spacer></v-spacer>

                <v-btn icon @click="changeEditState" color="info">
                    <font-awesome-icon icon="user-edit" size="lg"/>
                </v-btn>

                <v-btn v-if="!checkRoute" icon :to="{name: 'TicketSummary', params: { id: ticket.id,}}">
                    <font-awesome-icon icon="external-link-alt" size="lg"/>
                </v-btn>
            </v-card-title>

            <v-card-text>
                <span class="font-weight-bold">
                    Numer:
                </span>
                {{ ticket.token }}

                <br>

                <span class="font-weight-bold">
                                Opis:
                            </span>
                {{ ticket.description }}

                <br>

                <span class="font-weight-bold">
                                Dodatkowe informacje:
                            </span>
                {{ ticket.additional_information }}

                <br>

                <span class="font-weight-bold">
                                Wiadomość zwrotna:
                            </span>
                {{ ticket.message }}
            </v-card-text>
        </span>

        <v-progress-circular v-else
                             class="mx-auto"
                             :size="80"
                             indeterminate
                             color="primary"
        ></v-progress-circular>
    </v-card>
</template>

<script>
    export default {
        name: 'TicketDetails',
        props: {
            ticket: {},
            loading: {},
        },
        methods: {
            changeEditState() {
                this.$emit('editCard', true)
            }
        },
        computed: {
            checkRoute() {
                return this.$router.currentRoute.name === 'TicketSummary'
            }
        },
    }
</script>

<style>
    a {
        text-decoration: none;
    }
</style>
