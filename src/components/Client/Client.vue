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
                        Klient: {{ client.name }}
                    </v-card-title>

                    <v-card-subtitle>
                        Numer telefonu:
                        <a :href="'tel:' + client.phone_number" class="text--secondary">
                            {{ client.phone_number }}
                        </a>
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
                                <v-row dense v-if="detail.value">
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
                                        Zgłoszenia
                                    </span>
                                </span>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-timeline dense v-if="client.tickets.length">
                                    <v-timeline-item
                                            v-for="ticket in client.tickets"
                                            :key="ticket.id"
                                            :color="ticket.ticket_status.color"
                                            icon="assignment"
                                    >
                                        <template>
                                            <router-link :to="{name: 'Ticket', params: { id: ticket.id }}"
                                                         class="route">
                                                <span class="font-weight-bold text--primary">Numer zgłoszenia: </span>
                                                {{ ticket.token }}
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
        name: 'Client',
        data: () => ({
            loading: true,
            client: [],
            panels: [],
        }),
        methods: {
            async fetchClient() {
                this.$http.get(`/api/client/${this.$route.params.id}`).then((response) => {
                    this.client = response.data.data.client;
                    this.loading = false;
                    this.loadPanels()
                });
            },
            async loadPanels() {
                this.panels.push(
                    {
                        title: 'Dane klienta: ', titleValue: '', details: [
                            {label: 'Nazwa: ', value: this.client.name},
                            {label: 'Adres: ', value: this.client.address},
                            {label: 'Email: ', value: this.client.email, type: 'mailto:'},
                            {label: 'Numer telefonu: ', value: this.client.phone_number, type: 'tel:'},
                            {label: 'Opis: ', value: this.client.description},
                        ]
                    },
                )
            }
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
