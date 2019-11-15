<template>
    <v-container fluid>
        <v-row>
            <v-col class="col-12">
                <v-card class="ma-3" :elevation="5">
                    <v-card-title>
                        Informacje o urządzeniu: {{ device.name }}
                    </v-card-title>
                </v-card>
            </v-col>

            <v-col class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                <device :device="device" :loading="loading"></device>
            </v-col>

            <v-col class="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                <timeline :loading="loading" title="Zgłoszenia" :itemsCount="ticketsLength">
                    <ticket v-for="ticket in device.tickets" :key="ticket.id" :ticket="ticket"></ticket>
                </timeline>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import Ticket from "../Timelines/Items/Ticket";
    import Timeline from "../Timelines/Timeline";
    import Device from "./Device";

    export default {
        name: 'DeviceSummary',
        data: () => ({
            device: [],
            loading: true,
        }),
        components: {
            Ticket,
            Device,
            Timeline
        },
        methods: {
            async fetchDevice() {
                this.$http.get(`/api/device/${this.$route.params.id}`).then((response) => {
                    this.device = response.data.data.device;
                    this.loading = false;
                });
            },
        },
        created() {
            this.fetchDevice()
        },
        computed: {
            ticketsLength() {
                if ('tickets' in this.device) {
                    return this.device.tickets.length;
                } else {
                    return 0;
                }
            },
        }
    }
</script>

<style>
</style>
