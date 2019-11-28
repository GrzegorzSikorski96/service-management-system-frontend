<template>
    <v-container fluid>
        <v-row>
            <v-col class="col-12">
                <v-card class="ma-3" :elevation="5">
                    <v-card-title>
                        Zgłoszenia

                        <v-spacer></v-spacer>

                        <v-btn v-if="isAdmin()" icon :to="{name: 'TicketCreate'}">
                            <font-awesome-icon icon="plus" size="lg"/>
                        </v-btn>
                    </v-card-title>
                </v-card>
            </v-col>

            <v-col class="col-12">
                <v-card
                        elevation="5"
                        class="ma-3"
                >
                    <v-card-title>
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
                            :loading="loading"
                    >
                        <template v-slot:item.client.name="{ item }">
                            <router-link :to="{name: 'ClientSummary', params: { id: item.client.id }}" class="route">
                                {{ item.client.name }}
                            </router-link>
                        </template>

                        <template v-slot:item.device.name="{ item }">
                            <router-link text :to="{name: 'DeviceSummary', params: { id: item.device.id }}"
                                         class="route">
                                {{ item.device.name }}
                            </router-link>
                        </template>

                        <template v-slot:item.ticket_status.name="{ item }">
                    <span :class="item.ticket_status.color+'--text'">
                        {{ item.ticket_status.name }}
                    </span>
                        </template>

                        <template v-slot:item.actions="{ item }">
                            <v-btn text icon color="info" :to="{name: 'TicketSummary', params: { id: item.id }}"
                                   elevation="2">
                                <v-icon>keyboard_arrow_right</v-icon>
                            </v-btn>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: 'List',
        data: () => ({
            search: '',
            loading: true,
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
                await this.$http.get(`/api/tickets`).then((response) => {
                    this.tickets = response.data.data.tickets;
                    this.loading = false;
                });
            },
            initPusher() {
                let tickets = this.$pusher.subscribe('tickets');

                tickets.bind('update', () => {
                    this.fetchTickets();
                });
            },
            init() {
                this.fetchTickets().then(() => {
                    this.initPusher();
                })
            }
        },
        created() {
            this.init();
        },
    }
</script>

<style>
    .route {
        text-transform: none;
    }
</style>
