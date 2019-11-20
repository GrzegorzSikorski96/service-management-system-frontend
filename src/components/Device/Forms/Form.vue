<template>
    <v-form v-model="valid">
        <v-text-field
                v-model="credentials.serial_number"
                :rules="rules.device.serial_number"
                label="Numer seryjny"
                required
        ></v-text-field>

        <v-text-field
                v-model="credentials.name"
                :rules="rules.device.name"
                label="Nazwa urządzenia"
                required
        ></v-text-field>

        <v-textarea
                v-model="credentials.description"
                label="Opis"
        ></v-textarea>

        <v-autocomplete
                v-if="isAdmin()"
                :items="agencies"
                :rules="rules.device.agency_id"
                v-model="credentials.agency_id"
                label="Oddział"
                item-text="agencyString"
                item-value="id"
        >
            <template v-slot:item="data">
                <v-list-item-content>
                    <v-list-item-title>{{ data.item.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ data.item.address }}</v-list-item-subtitle>
                </v-list-item-content>
            </template>
        </v-autocomplete>

    </v-form>
</template>

<script>
    export default {
        name: 'DeviceForm',
        props: {
            device: {},
        },
        data: () => ({
            credentials: {},
            valid: false,
            agencies: [],
            rules: {
                device: {
                    name: [
                        v => !!v || 'Nazwa jest wymagana.',
                    ],
                    serial_number: [
                        v => !!v || 'Numer seryjny jest wymagany.',
                    ],
                }
            },
        }),
        methods: {
            parseFormData() {
                if (this.device) {
                    this.credentials = JSON.parse(JSON.stringify(this.device))
                }
            },
            isAdmin() {
                return this.$store.state.currentUser.role.name === 'administrator';
            },
            createAgenciesString() {
                this.agencies.forEach(function (value) {
                    value['agencyString'] = value.name + ' ' + value.address;
                })
            },
            async fetchAgencies() {
                if (this.isAdmin()) {
                    this.$http.get(`/api/agencies`,).then((response) => {
                        this.agencies = response.data.data.agencies;
                        this.createAgenciesString()
                    });
                }
            },
            setDefault() {
                if (!this.isAdmin()) {
                    this.credentials.agency_id = this.$store.state.currentUser.agency_id;
                }
            },
        },
        created() {
            this.parseFormData();
            this.fetchAgencies();
            this.setDefault();
        },
        watch: {
            valid: function (value) {
                this.$emit('valid', value)
            },
        },
    }
</script>

<style>

</style>
