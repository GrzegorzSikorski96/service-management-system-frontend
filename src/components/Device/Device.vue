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
                        Urządzenie: {{ device.name }}
                    </v-card-title>

                    <v-card-subtitle>
                        Numer seryjny: {{ device.serial_number }}
                    </v-card-subtitle>

                    <v-expansion-panels multiple>
                        <v-expansion-panel>
                            <v-expansion-panel-header>
                                <span>
                                    <span class="font-weight-bold">
                                        Dane urządzenia:
                                    </span>
                                </span>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-row dense>
                                    <span class="font-weight-bold mr-1">
                                        Nazwa:
                                    </span>
                                    {{ device.name }}
                                </v-row>

                                <v-row dense>
                                    <span class="font-weight-bold mr-1">
                                        Numer seryjny:
                                    </span>
                                    {{ device.serial_number }}
                                </v-row>

                                <v-row dense>
                                    <span class="font-weight-bold mr-1">
                                        Opis:
                                    </span>
                                    {{ device.description }}
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
                                <v-timeline dense v-if="device.tickets.length">
                                    <v-timeline-item
                                            v-for="ticket in device.tickets"
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
        name: 'Device',
        data: () => ({
            loading: true,
            device: [],
            channel: {},
        }),
        methods: {
            async fetchDevices() {
                this.$http.get(`/api/device/${this.$route.params.id}`).then((response) => {
                    this.device = response.data.data.device;
                    this.loading = false;
                    this.initPusher()
                });
            },

            async initPusher() {
                this.channel = this.$pusher.subscribe(`device-${this.device.id}`);
                this.channel.bind('deviceUpdate', data => {
                    this.device = data.device;
                })
            },
        },
        created() {
            this.fetchDevices();
        },
    }
</script>

<style>
    .route {
        text-decoration: none;
    }
</style>
