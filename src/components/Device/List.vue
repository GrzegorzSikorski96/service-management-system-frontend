<template>
    <v-container fluid>
        <v-row>
            <v-col class="col-12">
                <v-card class="ma-3" :elevation="5">
                    <v-card-title>
                        Urządzenia

                        <v-spacer></v-spacer>

                        <v-btn v-if="isAdmin()" icon :to="{name: 'DeviceCreate'}">
                            <font-awesome-icon icon="plus" size="lg"/>
                        </v-btn>
                    </v-card-title>
                </v-card>
            </v-col>

            <v-col class="col-12">
                <v-card
                        elevation="5"
                        class="ma-3"
                >
                    <v-card-title>
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
                            <v-btn text icon color="info"
                                   :to="{name: 'DeviceSummary', params: { id: item.id, device: item }}"
                                   elevation="2">
                                <v-icon>keyboard_arrow_right</v-icon>
                            </v-btn>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
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
            async fetchDevices() {
                await this.$http.get(`/api/devices`).then((response) => {
                    this.devices = response.data.data.devices;
                    this.loading = false;
                });
            },
            initPusher() {
                let devices = this.$pusher.subscribe('devices');

                devices.bind('update', this.fetchDevices);
            },
            init() {
                this.fetchDevices().then(() => {
                    this.initPusher();
                })
            }
        },
        created() {
            this.fetchDevices();
            this.initPusher();
        },
    }
</script>

<style>
</style>
