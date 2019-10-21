<template>
    <v-container fluid fill-height>
        <v-row>
            <v-card
                    class="col-8 mx-auto"
                    raised
                    shaped
            >
                <v-card-text>
                    <p class="display-1 text--primary">Tworzenie zgłoszenia</p>

                    <v-text-field
                            v-model="credentials.description"
                            :rules="rules.ticket.description"
                            label="Opis zgłoszenia"
                            required
                    ></v-text-field>

                    <v-text-field
                            v-model="credentials.additional_information"
                            label="Dodatkowe informacje"
                            required
                    ></v-text-field>

                    <v-autocomplete
                            :items="clients"
                            v-model="credentials.client_id"
                            label="Klient"
                            item-text="name"
                            item-value="id"
                    >
                        <template v-slot:item="data">
                            <v-list-item-content>
                                <v-list-item-title>{{ data.item.name }}</v-list-item-title>
                                <v-list-item-subtitle>{{ data.item.address }}</v-list-item-subtitle>
                            </v-list-item-content>
                        </template>
                    </v-autocomplete>

                    <v-autocomplete
                            :items="devices"
                            v-model="credentials.device_id"
                            label="Urządzenie"
                            item-text="name"
                            item-value="id"
                    >
                        <template v-slot:item="data">
                            <v-list-item-content>
                                <v-list-item-title>{{ data.item.name }}</v-list-item-title>
                                <v-list-item-subtitle>{{ data.item.serial_number }}</v-list-item-subtitle>
                            </v-list-item-content>
                        </template>
                    </v-autocomplete>

                    <v-select
                            :items="ticketStatuses"
                            label="Status zgłoszenia"
                            v-model="credentials.ticket_status_id"
                            item-text="name"
                            item-value="id"
                    ></v-select>

                </v-card-text>
                <v-card-actions>
                    <v-btn
                            text
                            class="mx-auto font-weight-bold"
                            @click="createTicket"
                    >
                        Dodaj zgłoszenie
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: 'TicketCreate',
        data: () => ({
            valid: false,
            credentials: {
                description: '',
                additional_information: '',
                ticket_status_id: null,
                client_id: null,
                device_id: null,
            },
            clients: [],
            devices: [],
            ticketStatuses: [],
            rules: {
                ticket: {
                    description: [
                        v => !!v || 'Opis jest wymagany.',
                    ],
                }
            },
        }),
        methods: {
            async fetchClients() {
                this.$http.get(`/api/clients`).then((response) => {
                    this.clients = response.data.data.clients;
                });
            },
            async fetchDevices() {
                this.$http.get(`/api/devices`).then((response) => {
                    this.devices = response.data.data.devices;
                });
            },
            async fetchTicketStatuses() {
                this.$http.get(`/api/ticketStatuses`).then((response) => {
                    this.ticketStatuses = response.data.data.ticket_statuses;
                });
            },
            async createTicket() {
                this.$http.post('/api/ticket', this.credentials)
                    .then((response) => {
                        alert(response);
                    })
                    .catch(() => {
                    })
            }
        },
        created() {
            this.fetchClients();
            this.fetchDevices();
            this.fetchTicketStatuses();
        }
    }
</script>

<style>

</style>
