<template>
    <v-container fluid fill-height>
        <v-card
                raised
                shaped
                class="mx-auto col-10"
        >
            <v-card-title>
                Urządzenia
                <v-spacer></v-spacer>
                <v-text-field
                        v-model="search"
                        append-icon="search"
                        label="Szukaj"
                        single-line
                        hide-details
                ></v-text-field>
            </v-card-title>

            <v-data-table
                    :headers="headers"
                    :items="devices"
                    :search="search"
                    :loading="loading"
            >
                <template v-slot:item.actions="{ item }">
                    <v-btn text icon color="info" :to="{name: 'Device', params: { id: item.id }}"
                           elevation="2">
                        <v-icon>keyboard_arrow_right</v-icon>
                    </v-btn>
                </template>
            </v-data-table>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        name: 'List',
        loading: true,
        data: () => ({
            search: '',
            loading: true,
            devices: [],
            headers: [
                {text: 'Numer seryjny', value: 'serial_number', sortable: false, align: 'left'},
                {text: 'Nazwa', value: 'name'},
                {text: 'Opis', value: 'description'},
                {value: 'actions', sortable: false, align: 'right'},
            ],
        }),
        methods: {
            fetchDevices() {
                this.$http.get(`/api/devices`).then((response) => {
                    this.devices = response.data.data.devices;
                    this.loading = false;
                });
            },
            initPusher() {
                this.channel = this.$pusher.subscribe(`devices`);
                this.channel.bind('devicesListUpdated', () => {
                    this.fetchDevices();
                })
            },
        },
        created() {
            this.fetchDevices();
            this.initPusher();
        },
    }
</script>

<style>
</style>
