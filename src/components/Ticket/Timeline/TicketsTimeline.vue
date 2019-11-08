<template>
    <v-card class="ma-3 pa-1">
        <span v-if="!loading">
            <v-card-title>
            Zgłoszenia
        </v-card-title>

        <v-card-text>
            <v-timeline dense v-if="tickets.length">
                <timeline-ticket v-for="ticket in tickets" :key="ticket.id" :ticket="ticket"></timeline-ticket>
            </v-timeline>

            <v-alert v-else
                     border="bottom"
                     color="#202338"
                     dark
            >Brak notatek</v-alert>
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
    import TimelineTicket from "./TimelineTicket";

    export default {
        name: 'TicketsTimeline',
        components: {
            TimelineTicket
        },
        props: {
            tickets: {
                type: Array,
            },
            loading: {},
        },
    }
</script>

<style>
</style>
