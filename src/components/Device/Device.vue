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
            panels: [],
        }),
        methods: {
            async fetchDevices() {
                this.$http.get(`/api/device/${this.$route.params.id}`).then((response) => {
                    this.device = response.data.data.device;
                    this.loading = false;
                    this.loadPanels()
                });
            },
            async loadPanels() {
                this.panels.push(
                    {
                        title: 'Dane urządzenia: ', titleValue: '', details: [
                            {label: 'Nazwa: ', value: this.device.name},
                            {label: 'Numer seryjny: ', value: this.device.serial_number},
                            {label: 'Opis: ', value: this.device.description},
                        ]
                    },
                )
            }
        },
        created() {
            this.fetchDevices();
        }
    }
</script>

<style>
    .route {
        text-decoration: none;
    }
</style>
