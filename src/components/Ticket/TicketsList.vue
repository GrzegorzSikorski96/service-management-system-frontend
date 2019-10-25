<template>
    <v-container fluid fill-height>
        <v-card
                raised
                shaped
                class="mx-auto col-8"
        >
            <v-card-title>
                Zgłoszenia
                <v-spacer></v-spacer>
                <v-text-field
                        v-model="search"
                        append-icon="search"
                        label="Szukaj"
                        single-line
                        hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table
                    :headers="headers"
                    :items="tickets"
                    :search="search"
                    :loading="!loading"
            >
                <template v-slot:item.client.name="{ item }">
                    <router-link :to="{name: 'Client', params: { id: item.id }}" class="route">
                        {{ item.client.name }}
                    </router-link>
                </template>

                <template v-slot:item.device.name="{ item }">
                    <router-link text :to="{name: 'Device', params: { id: item.id }}" class="route">
                        {{ item.device.name }}
                    </router-link>
                </template>

                <template v-slot:item.ticket_status.name="{ item }">
                    <span :class="item.ticket_status.color+'--text'">
                        {{ item.ticket_status.name }}
                    </span>
                </template>

                <template v-slot:item.actions="{ item }">
                    <v-btn text icon color="info" :to="{name: 'Ticket', params: { id: item.id }}"
                           elevation="2">
                        <v-icon>keyboard_arrow_right</v-icon>
                    </v-btn>
                </template>
            </v-data-table>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        name: 'TicketsList',
        data: () => ({
            search: '',
            tickets: [],
            headers: [
                {text: 'Token', value: 'token', align: 'left', sortable: false,},
                {text: 'Klient', value: 'client.name'},
                {text: 'Urządzenie', value: 'device.name'},
                {text: 'Numer seryjny', value: 'device.serial_number',},
                {text: 'Status', value: 'ticket_status.name'},
                {value: 'actions', sortable: false, align: 'right'},
            ],
        }),
        methods: {
            async fetchTickets() {
                this.$http.get(`/api/tickets`).then((response) => {
                    this.tickets = response.data.data.tickets;
                });
            },
        },
        created() {
            this.fetchTickets();
        },
        computed: {
            loading() {
                return this.tickets.length;
            }
        }
    }
</script>

<style>
    .route {
        text-transform: none;
    }
</style>
