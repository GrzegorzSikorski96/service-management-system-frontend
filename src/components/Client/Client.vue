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
                        Klient: {{ client.name }}
                    </v-card-title>

                    <v-card-subtitle>
                        Numer telefonu:
                        <a :href="'tel:' + client.phone_number" class="text--secondary">
                            {{ client.phone_number }}
                        </a>
                    </v-card-subtitle>

                    <v-expansion-panels multiple>
                        <v-expansion-panel>
                            <v-expansion-panel-header>
                                <span>
                                    <span class="font-weight-bold">
                                        Dane klienta
                                    </span>
                                </span>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-row>
                                    <span>
                                        <span class="font-weight-bold">
                                            Nazwa:
                                        </span>
                                        {{ client.name }}
                                    </span>
                                </v-row>
                                <v-row>
                                    <span>
                                        <span class="font-weight-bold">
                                            Adres:
                                        </span>
                                        {{ client.address }}
                                    </span>
                                </v-row>
                                <v-row>
                                    <span>
                                        <span class="font-weight-bold">
                                            Email:
                                        </span>
                                        <a :href="'mailto:' + client.email">
                                            {{ client.email }}
                                        </a>
                                    </span>
                                </v-row>
                                <v-row>
                                    <span>
                                        <span class="font-weight-bold">
                                            Numer telefonu:
                                        </span>
                                        <a :href="'tel:' + client.phone_number">
                                        {{ client.phone_number }}
                                        </a>
                                    </span>
                                </v-row>
                                <v-row>
                                    <span>
                                        <span class="font-weight-bold">
                                            Opis:
                                        </span>
                                        {{ client.description }}
                                    </span>
                                </v-row>
                            </v-expansion-panel-content>
                        </v-expansion-panel>

                        <v-expansion-panel>
                            <v-expansion-panel-header>
                                <span>
                                    <span class="font-weight-bold">
                                        Zgłoszenia
                                    </span>
                                </span>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-timeline dense>
                                    <v-timeline-item
                                            v-for="ticket in client.tickets"
                                            :key="ticket.id"
                                            :color="ticket.ticket_status.color"
                                            icon="assignment"
                                    >
                                        <template>
                                            <router-link :to="{name: 'Ticket', params: { id: ticket.id }}"
                                                         class="route">
                                                <span class="font-weight-bold text--primary">Numer zgłoszenia: {{ ticket.token }} </span>
                                            </router-link>
                                        </template>

                                        <v-card class="elevation-2">
                                            <v-card-text class="text--primary">
                                                {{ ticket.description }}
                                            </v-card-text>

                                            <v-card-actions class="text--secondary">
                                                <v-spacer></v-spacer>
                                                {{ ticket.created_at }}
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
        name: 'Client',
        data: () => ({
            client: [],
        }),
        methods: {
            async fetchClient() {
                this.$http.get(`/api/client/${this.$route.params.id}`).then((response) => {
                    this.client = response.data.data.client;
                });
            },
        },
        created() {
            this.fetchClient();
        }
    }
</script>

<style>
    .route {
        text-decoration: none;
    }
</style>
