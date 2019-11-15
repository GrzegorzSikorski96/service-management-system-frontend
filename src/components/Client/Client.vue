<template>
    <v-container fluid>
        <v-row>
            <v-col class="col-12">
                <v-card :elevation="5">
                    <v-card-title>
                        Informacje o kliencie: {{ client.name }}
                    </v-card-title>
                </v-card>
            </v-col>

            <v-col class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                <client-details v-if="!editClient" :client="client" :loading="loading"
                                @editCard="clientEdit"></client-details>
                <client-edit v-else :client="client" @editCard="clientEdit"></client-edit>
            </v-col>

            <v-col class="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                <tickets-timeline :tickets="client.tickets" :loading="loading"></tickets-timeline>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import TicketsTimeline from "../Ticket/Timeline/TicketsTimeline";
    import ClientDetails from "./Details";
    import ClientEdit from "./Edit";

    export default {
        name: 'Client',
        data: () => ({
            client: [],
            loading: true,
            editClient: false,
        }),
        components: {
            ClientDetails,
            TicketsTimeline,
            ClientEdit,
        },
        methods: {
            async fetchClient() {
                this.$http.get(`/api/client/${this.$route.params.id}`).then((response) => {
                    this.client = response.data.data.client;
                    this.loading = false;
                });
            },
            clientEdit(value) {
                this.editClient = value
            },
        },
        created() {
            this.fetchClient()
        },
    }
</script>

<style>
</style>
