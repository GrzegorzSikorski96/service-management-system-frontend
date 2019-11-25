<template>
    <v-timeline-item
            color="green lighten-2"
            icon="assignment"
    >
        <router-link v-if="isAdmin() || isManager() && !checkRoute" :to="{name: 'UserSummary', params: { id: note.author.id }}"
                     class="route">
            <span class="font-weight-bold">{{ note.author.name }} {{ note.author.surname }} </span>
        </router-link>

        <span class="font-weight-bold" v-else>{{ note.author.name }} {{ note.author.surname }} </span>
        <v-spacer></v-spacer>

        <v-card class="elevation-2">
            <v-card-text class="text--primary">
                {{ note.content }}
            </v-card-text>

            <v-card-actions class="text--secondary">
                <router-link v-if="note.ticket" :to="{name: 'TicketSummary', params: { id: note.ticket.id }}"
                             class="route">
                    <span class="text--secondary">Numer zgłoszenia: </span>
                    {{ note.ticket.token }}
                </router-link>

                <v-spacer></v-spacer>
                {{ note.created_at }}
            </v-card-actions>
        </v-card>
    </v-timeline-item>
</template>

<script>
    export default {
        name: 'Notes',
        props: {
            note: {},
        },
        computed: {
            checkRoute() {
                return this.$router.currentRoute.name === 'UserSummary'
            }
        },
    }
</script>

<style>
</style>
