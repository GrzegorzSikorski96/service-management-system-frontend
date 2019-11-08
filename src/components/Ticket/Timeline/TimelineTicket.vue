<template>
    <v-timeline-item
            :color="ticket.ticket_status.color"
            icon="assignment"
    >
        <template>
            <router-link :to="{name: 'Ticket', params: { id: ticket.id }}"
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
                <v-spacer></v-spacer>
                {{ ticket.created_at }}
            </v-card-actions>
        </v-card>
    </v-timeline-item>
</template>

<script>
    export default {
        name: 'TimelineTicket',
        props: {
            ticket: {},
        },
    }
</script>

<style>
</style>
