<template>
    <v-container fluid fill-height>
        <v-row>
            <v-card
                    class="col-8 mx-auto"
                    raised
                    shaped
                    v-if="!loading"
            >
                <v-card-text>
                    <v-card-title class="display-1 text--primary">
                        Zgłoszenie serwisowe
                    </v-card-title>

                    <v-card-subtitle>
                        Kod zgłoszenia: {{ ticket.token }}
                    </v-card-subtitle>

                    <v-expansion-panels multiple>
                        <v-expansion-panel v-for="panel in panels" :key="panel.title">
                            <v-expansion-panel-header>
                                <span>
                                    <span class="font-weight-bold">
                                        {{ panel.title }}
                                    </span>
                                    {{ panel.titleValue }}
                                </span>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content v-for="detail in panel.details" :key="detail.label">
                                <v-row dense>
                                    <span v-if="detail.type">
                                        <span class="font-weight-bold">
                                            {{ detail.label }}
                                        </span>
                                        <a :href="detail.type + detail.value">
                                            {{ detail.value }}
                                        </a>
                                    </span>

                                    <span v-else>
                                        <span class="font-weight-bold">
                                            {{ detail.label }}
                                        </span>
                                        {{ detail.value }}
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
                                <v-timeline dense v-if="ticket.notes.length">
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

                                <span v-else>
                                    Brak zgłoszeń
                                </span>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-card-text>
            </v-card>

            <v-progress-circular v-else
                                 class="mx-auto"
                                 :size="80"
                                 indeterminate
                                 color="primary"
            ></v-progress-circular>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: 'Ticket',
        data: () => ({
            ticket: [],
            panels: [],
            loading: true,
        }),
        methods: {
            async fetchData() {
                this.$http.get(`/api/ticket/${this.$route.params.id}`).then((response) => {
                    this.ticket = response.data.data.ticket;
                    this.loading = false;
                    this.loadPanels();
                });
            },

            async loadPanels() {
                this.panels.push(
                    {
                        title: 'Klient: ', titleValue: this.ticket.client.name, details: [
                            {label: 'Adres: ', value: this.ticket.client.address},
                            {label: 'Email: ', value: this.ticket.client.email, type: 'mailto:'},
                            {label: 'Numer telefonu: ', value: this.ticket.client.phone_number, type: 'tel:'},
                            {label: 'Opis: ', value: this.ticket.client.description},
                        ]
                    },
                    {
                        title: 'Urządzenie: : ', titleValue: this.ticket.device.name, details: [
                            {label: 'Numer seryjny: ', value: this.ticket.device.serial_number},
                            {label: 'Opis: ', value: this.ticket.device.description},
                        ]
                    }
                )
            }
        },
        created() {
            this.fetchData()
        },
    }
</script>

<style>

</style>
