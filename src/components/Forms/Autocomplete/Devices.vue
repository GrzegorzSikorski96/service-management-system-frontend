<template>
    <v-autocomplete
            :disabled="!(agency_id || devices.length)"
            :items="devices"
            :rules="rules.device_id.required"
            v-model="device_id"
            label="Urządzenie"
            item-text="deviceString"
            item-value="id"
    >
        <template v-slot:item="data">
            <v-list-item-content>
                <v-list-item-title>{{ data.item.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ data.item.serial_number }}</v-list-item-subtitle>
            </v-list-item-content>
        </template>
    </v-autocomplete>
</template>

<script>
    export default {
        name: 'DevicesAutocomplete',
        props: {
            agency_id: {},
        },
        data: () => ({
            device_id: null,
            devices: [],
            rules: {
                device_id: {
                    required: [
                        v => !!v || 'Urządzenie jest wymagane.',
                    ],
                }
            },
        }),
        methods: {
            createDevicesString() {
                this.devices.forEach(function (value) {
                    value['deviceString'] = value.name + ' ' + value.serial_number;
                })
            },
            getUrl() {
                if (this.isAdmin()) {
                    if (this.agency_id) {
                        return `/api/agency/${this.agency_id}/devices`;
                    }
                } else {
                    return "/api/devices"
                }
            },
            async fetchDevices() {
                if (this.getUrl()) {
                    this.$http.get(this.getUrl()).then((response) => {
                        this.devices = response.data.data.devices;
                        this.createDevicesString()
                    });
                }
            }
        },
        created() {
            this.fetchDevices();
        },
        watch: {
            device_id: function (value) {
                this.$emit('input', value)
            },
            agency_id: function () {
                this.fetchDevices();
            },
        },
    }
</script>

<style>

</style>
