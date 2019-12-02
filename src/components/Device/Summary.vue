<template>
    <v-container fluid>
        <v-row>
            <v-col class="col-12">
                <v-card class="ma-3" :elevation="5">
                    <v-card-title>
                        Informacje o urządzeniu: {{ device.name }}

                        <v-spacer/>

                        <device-management :device="device"/>
                    </v-card-title>
                </v-card>
            </v-col>

            <v-col class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                <device :device="device" :loading="loading"/>
            </v-col>

            <v-col class="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                <timeline :loading="loading" title="Zgłoszenia" :itemsCount="ticketsLength">
                    <ticket v-for="ticket in tickets.data" :key="ticket.id" :ticket="ticket"/>

                    <template v-slot:pagination>
                        <v-pagination
                                v-model="page"
                                :length="tickets.last_page"
                                total-visible="7"
                                circle/>
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
                await this.$http.get(`/api/device/${this.$route.params.id}`).then((response) => {
                    this.device = response.data.data.device;
                    this.loading = false;
                });
            },
            getDeviceTickets() {
                this.$http.get(`/api/device/${this.device.id}/tickets?page=${this.page}`).then((response) => {
                    this.tickets = response.data.data.tickets;
                    this.ticketsLoading = false;
                });
            },
            initPusher() {
                let device = this.$pusher.subscribe(`device-${this.device.id}`);

                device.bind('update', this.fetchDevice);
                device.bind('tickets', this.getDeviceTickets);

                device.bind('remove', () => {
                    this.$router.push('/devices');
                });
            },
            init() {
                this.fetchDevice().then(() => {
                    this.initPusher();
                    this.getDeviceTickets();
                });
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
                this.getDeviceTickets(value);
            },
        },
        destroyed() {
            this.$puhser.unsubscribe(`device-${this.device.id}`)
        }
    }
</script>

<style>
</style>
