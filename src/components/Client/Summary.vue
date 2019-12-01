<template>
    <v-container fluid>
        <v-row>
            <v-col class="col-12">
                <v-card class="ma-3" :elevation="5">
                    <v-card-title>
                        Informacje o kliencie: {{ client.name }}

                        <v-spacer/>

                        <client-management :client="client"/>
                    </v-card-title>
                </v-card>
            </v-col>

            <v-col class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                <client :client="client" :loading="loading"/>
            </v-col>

            <v-col class="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                <timeline :loading="ticketsLoading" title="Zgłoszenia" :itemsCount="ticketsLength">
                    <ticket v-for="ticket in tickets.data" :key="ticket.id" :ticket="ticket"/>

                    <template v-slot:pagination>
                        <v-pagination
                                v-model="page"
                                :length="tickets.last_page"
                                total-visible="7"
                                circle
                        />
                    </template>
                </timeline>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import Timeline from "../Timelines/Timeline";
    import Ticket from "../Timelines/Items/Ticket"
    import Client from "./Client";
    import ClientManagement from "./Management/Management";

    export default {
        name: 'ClientSummary',
        data: () => ({
            client: [],
            tickets: [],
            loading: true,
            ticketsLoading: true,
            page: 1,
        }),
        components: {
            Timeline,
            Ticket,
            Client,
            ClientManagement
        },
        methods: {
            async fetchClient() {
                await this.$http.get(`/api/client/${this.$route.params.id}`).then((response) => {
                    this.client = response.data.data.client;
                    this.loading = false;
                });
            },
            getClientTickets() {
                this.$http.get(`/api/client/${this.client.id}/tickets?page=${this.page}`).then((response) => {
                    this.tickets = response.data.data.tickets;
                    this.ticketsLoading = false;
                });
            },
            initPusher() {
                let client = this.$pusher.subscribe(`client-${this.client.id}`);

                client.bind('update', this.fetchClient);
                client.bind('tickets', this.getClientTickets);
                client.bind('remove', () => {
                    this.$router.push('/clients');
                });
            },
            init() {
                this.fetchClient().then(() => {
                    this.getClientTickets();
                    this.initPusher();
                })
            },
        },
        created() {
            this.init()
        },
        computed: {
            ticketsLength() {
                if (this.tickets.data) {
                    return this.tickets.data.length;
                } else {
                    return 0;
                }
            },
        },
        watch: {
            page: function (value) {
                this.getClientTickets(value);
            },
        },
    }
</script>

<style>
</style>
