<template>
    <v-container fluid>
        <v-row>
            <v-col class="col-12">
                <v-card class="ma-3" :elevation="5">
                    <v-card-title>
                        Informacje o urządzeniu: {{ device.name }}

                        <v-spacer></v-spacer>

                        <device-management :device="device"></device-management>
                    </v-card-title>
                </v-card>
            </v-col>

            <v-col class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                <device :device="device" :loading="loading"></device>
            </v-col>

            <v-col class="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                <timeline v-if="ticketsLength" :loading="loading" title="Zgłoszenia" :itemsCount="ticketsLength">
                    <ticket v-for="ticket in tickets.data" :key="ticket.id" :ticket="ticket"></ticket>

                    <template v-slot:pagination>
                        <v-pagination
                                v-model="page"
                                :length="tickets.last_page"
                                total-visible="7"
                                circle
                        ></v-pagination>
                    </template>
                </timeline>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import Ticket from "../Timelines/Items/Ticket";
    import Timeline from "../Timelines/Timeline";
    import Device from "./Device"
    import DeviceManagement from "./Management/Management"

    export default {
        name: 'DeviceSummary',
        data: () => ({
            device: [],
            tickets: [],
            ticketsLoading: true,
            page: 1,
            loading: true,
        }),
        components: {
            Ticket,
            Device,
            Timeline,
            DeviceManagement
        },
        methods: {
            async fetchDevice() {
                this.$http.get(`/api/device/${this.$route.params.id}`).then((response) => {
                    this.device = response.data.data.device;
                    this.loading = false;
                });

                this.getDeviceTickets(1);
            },
            getDeviceTickets(page) {
                this.$http.get(`/api/device/${this.$route.params.id}/tickets?page=${page}`).then((response) => {
                    this.tickets = response.data.data.tickets;
                    this.ticketsLoading = false;
                });
            },
        },
        created() {
            this.fetchDevice()
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
                this.getDeviceTickets(value);
            },
        },
    }
</script>

<style>
</style>
