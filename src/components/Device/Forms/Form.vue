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

        <agencies-autocomplete v-if="isAdmin() && !edit" v-model="credentials.agency_id"/>

    </v-form>
</template>

<script>
    import AgenciesAutocomplete from "../../Forms/Autocomplete/Agencies";

    export default {
        name: 'DeviceForm',
        components: {
            AgenciesAutocomplete
        },
        props: {
            device: {},
            edit: {},
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
            checkValid(value) {
                this.agencyValid = value
            },
        },
        created() {
            this.parseFormData();
        },
        computed: {
            formValid() {
                return this.valid && this.agencyValid
            }
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
