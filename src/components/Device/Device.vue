<template>
    <v-container fluid>
        <v-row>
            <v-col class="col-12">
                <v-card class="ma-3">
                    <v-card-title>
                        Informacje o urządzeniu: {{ device.name }}
                    </v-card-title>
                </v-card>
            </v-col>

            <v-col class="col-4">
                <device-details :device="device" :loading="loading"></device-details>
            </v-col>

            <v-col class="col-8">
                <timeline :loading="loading" title="Zgłoszenia" :itemsCount="ticketsLength">
                    <ticket v-for="ticket in device.tickets" :key="ticket.id" :ticket="ticket"></ticket>
                </timeline>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import DeviceDetails from "./Details";
    import Timeline from "../Timelines/Timeline";
    import Ticket from "../Timelines/Items/Ticket";

    export default {
        name: 'Device',
        data: () => ({
            device: {},
            loading: true,
        }),
        components: {
            DeviceDetails,
            Timeline,
            Ticket,
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
            }
        }
    }
</script>

<style>
</style>
