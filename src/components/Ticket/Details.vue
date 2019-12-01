<template>
    <v-card class="ma-3 pa-1" :elevation="5">
        <span v-if="!loading">
            <v-card-title>
                Dane zgłoszenia

                <v-spacer/>

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

                <span v-if="ticket.message">
                    <br>

                    <span class="font-weight-bold">
                        Wiadomość zwrotna:
                    </span>
                    {{ ticket.message }}
                </span>

                <br>

                <span class="font-weight-bold">
                    Status zgłoszenia:
                </span>
                {{ ticket.ticket_status.name }}
            </v-card-text>
        </span>

        <Loading v-else/>
    </v-card>
</template>

<script>
    import Loading from "./../Helpers/Loading"

    export default {
        name: 'TicketDetails',
        props: {
            ticket: {},
            loading: {},
        },
        components:{
            Loading,
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
