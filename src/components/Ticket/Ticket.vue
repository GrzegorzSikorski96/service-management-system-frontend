<template>
    <v-container fluid fill-height>
        <v-row>
            <v-card
                    class="col-8 mx-auto"
                    raised
                    shaped
            >
                <v-card-text>
                    <v-card-title class="display-1 text--primary">
                        Zgłoszenie serwisowe
                    </v-card-title>

                    <v-card-subtitle>
                        Kod zgłoszenia: {{ ticket.token }}
                    </v-card-subtitle>

                    <v-expansion-panels multiple>
                        <v-expansion-panel>
                            <v-expansion-panel-header>
                                <span>
                                    <span class="font-weight-bold">
                                        Klient:
                                    </span>
                                    {{ ticket.client.name }}
                                </span>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-row>
                                    <span>
                                        <span class="font-weight-bold">
                                            Adres:
                                        </span>
                                        {{ ticket.client.address }}
                                    </span>
                                </v-row>
                                <v-row>
                                    <span>
                                        <span class="font-weight-bold">
                                            Email:
                                        </span>
                                        <a :href="'mailto:' + ticket.client.email">
                                            {{ ticket.client.email }}
                                        </a>
                                    </span>
                                </v-row>
                                <v-row>
                                    <span>
                                        <span class="font-weight-bold">
                                            Numer telefonu:
                                        </span>
                                        <a :href="'tel:' +ticket.client.phone_number">
                                        {{ ticket.client.phone_number }}
                                        </a>
                                    </span>
                                </v-row>
                                <v-row>
                                    <span>
                                        <span class="font-weight-bold">
                                            Opis:
                                        </span>
                                        {{ ticket.device.description }}
                                    </span>
                                </v-row>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                        <v-expansion-panel>
                            <v-expansion-panel-header>
                                <span>
                                    <span class="font-weight-bold">
                                        Urządzenie:
                                    </span>
                                    {{ ticket.device.name }}
                                </span>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-row>
                                    <span>
                                        <span class="font-weight-bold">
                                            Numer seryjny:
                                        </span>
                                        {{ ticket.device.serial_number }}
                                    </span>
                                </v-row>
                                <v-row>
                                    <span>
                                        <span class="font-weight-bold">
                                            Opis:
                                        </span>
                                        {{ ticket.device.description }}
                                    </span>
                                </v-row>
                            </v-expansion-panel-content>
                        </v-expansion-panel>

                        <v-expansion-panel>
                            <v-expansion-panel-header>
                                <span>
                                    <span class="font-weight-bold">
                                        Notatki
                                    </span>
                                </span>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-timeline dense>
                                    <v-timeline-item
                                            v-for="note in ticket.notes"
                                            :key="note.id"
                                            color="blue lighten-2"
                                            icon="assignment"
                                    >
                                        <template>
                                            <span class="font-weight-bold">{{ note.author.name }} {{ note.author.surname }} </span>
                                        </template>

                                        <v-card class="elevation-2">
                                            <v-card-text class="text--primary">
                                                {{ note.content }}
                                            </v-card-text>

                                            <v-card-actions class="text--secondary">
                                                <v-spacer></v-spacer>
                                                {{ note.created_at }}
                                            </v-card-actions>
                                        </v-card>
                                    </v-timeline-item>
                                </v-timeline>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-card-text>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: 'Ticket',
        data: () => ({
            ticket: [],
        }),
        methods: {
            async fetchTicket() {
                this.$http.get(`/api/ticket/${this.$route.params.id}`).then((response) => {
                    this.ticket = response.data.data.ticket;
                });
            },
        },
        created() {
            this.fetchTicket();
        }
    }
</script>

<style>

</style>
