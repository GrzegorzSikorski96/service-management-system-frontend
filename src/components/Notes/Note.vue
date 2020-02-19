<template>
    <v-card>
        <v-card-title class="subtitle-2" dense>
            <router-link v-if="isAdmin() || (isManager() && currentUser.agency_id === note.author.agency_id ) && !checkRoute"
                         :to="{name: 'UserSummary', params: { id: note.author.id }}"
                         class="route">
                <span class="font-weight-bold">{{ note.author.name }} {{ note.author.surname }} </span>

                <v-spacer/>
            </router-link>

            <span class="font-weight-bold" v-else>{{ note.author.name }} {{ note.author.surname }} </span>

            <v-spacer/>

            <v-btn icon v-if="currentUser.id === note.author.id && note.editable" color="info" @click="changeEditState">
                <font-awesome-icon icon="pen"/>
            </v-btn>
        </v-card-title>

        <v-card-text class="white text--primary">
            {{ note.content }}
        </v-card-text>

        <v-card-actions class="text--secondary">
            <router-link v-if="note.ticket" :to="{name: 'TicketSummary', params: { id: note.ticket.id }}"
                         class="route">
                <span class="text--secondary">Numer zgłoszenia: </span>
                {{ note.ticket.token }}
            </router-link>

            <v-spacer/>
            {{ note.created_at }}
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: 'Note',
        props: {
            note: {},
        },
        methods: {
            changeEditState() {
                this.$emit('editCard', true)
            }
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
