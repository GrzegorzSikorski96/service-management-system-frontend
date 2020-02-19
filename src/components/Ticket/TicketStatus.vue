<template>
    <v-card class="ma-3 pa-1" :elevation="5">
        <span v-if="!loading">
            <v-card-title>
                Status zgłoszenia
            </v-card-title>
            <v-card-text>
                <ticket-statuses-select v-model="ticket_status_id"
                                        :ticket="ticket"/>
            </v-card-text>
        </span>

        <Loading v-else/>
    </v-card>
</template>

<script>
    import Loading from "./../Helpers/Loading"
    import TicketStatusesSelect from "../Forms/Select/TicketStatuses";

    export default {
        name: 'TicketStatus',
        props: {
            ticket: {},
            loading: {},
        },
        components: {
            Loading,
            TicketStatusesSelect
        },
        data: () => ({
            ticket_status_id: null,
        }),
        methods: {
            init() {
                this.ticket_status_id = this.ticket.ticket_status_id
            },
        },
        created() {
            this.init();
        },
    }
</script>

<style>
    a {
        text-decoration: none;
    }
</style>
