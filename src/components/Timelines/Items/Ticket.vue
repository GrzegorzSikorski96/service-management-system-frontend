<template>
    <v-timeline-item
            :color="ticket.ticket_status.color"
    >
        <template v-slot:icon>
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <font-awesome-icon icon="sticky-note" size="lg" color="white" v-on="on"/>
                </template>
                <span>
                    {{ ticket.ticket_status.name }}
                </span>
            </v-tooltip>
        </template>

        <template>
            <router-link :to="{name: 'TicketSummary', params: { id: ticket.id }}"
                         class="route">
                <span class="font-weight-bold text--primary">Numer zgłoszenia: </span>
                {{ ticket.token }}
            </router-link>
        </template>

        <v-card class="elevation-2">
            <v-card-text class="text--primary">
                {{ ticket.description }}
            </v-card-text>

            <v-card-actions class="text--secondary">
                <v-spacer/>
                {{ ticket.created_at }}
            </v-card-actions>
        </v-card>
    </v-timeline-item>
</template>

<script>
    export default {
        name: 'Ticket',
        props: {
            ticket: {},
        },
    }
</script>

<style>
</style>
