<template>
    <v-container fluid>
        <v-row>
            <v-col class="col-12">
                <v-card class="ma-3" :elevation="5">
                    <v-card-title>
                        Informacje o kliencie: {{ client.name }}
                    </v-card-title>
                </v-card>
            </v-col>

            <v-col class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                <client :client="client" :loading="loading"></client>
            </v-col>

            <v-col class="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                <timeline :loading="loading" title="Zgłoszenia" :itemsCount="ticketsLength">
                    <ticket v-for="ticket in client.tickets" :key="ticket.id" :ticket="ticket"></ticket>
                </timeline>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import Timeline from "../Timelines/Timeline";
    import Ticket from "../Timelines/Items/Ticket"
    import Client from "./Client";

    export default {
        name: 'ClientSummary',
        data: () => ({
            client: [],
            loading: true,
        }),
        components: {
            Timeline,
            Ticket,
            Client
        },
        methods: {
            async fetchClient() {
                this.$http.get(`/api/client/${this.$route.params.id}`).then((response) => {
                    this.client = response.data.data.client;
                    this.loading = false;
                });
            },
        },
        created() {
            this.fetchClient()
        },
        computed: {
            ticketsLength() {
                if ('tickets' in this.client) {
                    return this.client.tickets.length;
                } else {
                    return 0;
                }
            },
        }
    }
</script>

<style>
</style>
