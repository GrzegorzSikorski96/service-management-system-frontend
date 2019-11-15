<template>
    <v-form v-model="valid">
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
                :rules="rules.ticket.client_id"
                v-model="credentials.client_id"
                label="Klient"
                item-text="clientString"
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
                :rules="rules.ticket.device_id"
                v-model="credentials.device_id"
                label="Urządzenie"
                item-text="deviceString"
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
                :rules="rules.ticket.ticket_status_id"
                label="Status zgłoszenia"
                v-model="credentials.ticket_status_id"
                item-text="name"
                item-value="id"
        ></v-select>
    </v-form>
</template>

<script>
    export default {
        name: 'TicketForm',
        props: {
            ticket: {},
        },
        data: () => ({
            credentials: {},
            clients: [],
            devices: [],
            ticketStatuses: [],
            valid: false,
            rules: {
                ticket: {
                    description: [
                        v => !!v || 'Opis jest wymagany.',
                    ],
                    client_id: [
                        v => !!v || 'Klient jest wymagany.',
                    ],
                    device_id: [
                        v => !!v || 'Urządzenie jest wymagane.',
                    ],
                    ticket_status_id: [
                        v => !!v || 'Status zgłoszenia jest wymagany..',
                    ],
                }
            },
        }),
        methods: {
            createClientsString() {
                this.clients.forEach(function (value) {
                    value['clientString'] = value.name + ' ' + value.address;
                })
            },
            createDevicesString() {
                this.devices.forEach(function (value) {
                    value['deviceString'] = value.name + ' ' + value.serial_number;
                })
            },
            async fetchClients() {
                this.$http.get(`/api/clients`,).then((response) => {
                    this.clients = response.data.data.clients;
                    this.createClientsString()
                });
            },
            async fetchDevices() {
                this.$http.get(`/api/devices`).then((response) => {
                    this.devices = response.data.data.devices;
                    this.createDevicesString();
                });
            },
            async fetchTicketStatuses() {
                this.$http.get(`/api/ticketStatuses`).then((response) => {
                    this.ticketStatuses = response.data.data.ticket_statuses;
                });
            },
            async createTicket() {
                this.$http.post('/api/ticket', this.credentials)
                    .then(() => {
                        this.$toasted.show('Utworzono zgłoszenie', {
                            type: 'success'
                        });
                    })
                    .catch(() => {
                        this.$toasted.show('Nie udało się utworzyć zgłoszenia', {
                            type: 'error'
                        });
                    })
            },
            parseFormData() {
                if (this.ticket) {
                    this.credentials = JSON.parse(JSON.stringify(this.ticket))
                }
            }
        },
        created() {
            this.parseFormData();
            this.fetchClients();
            this.fetchDevices();
            this.fetchTicketStatuses();
        },
        watch: {
            valid: function (value) {
                this.$emit('valid', value)
            },
        },
    }
</script>

<style>

</style>
