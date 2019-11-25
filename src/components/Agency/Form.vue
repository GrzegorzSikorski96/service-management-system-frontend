<template>
    <v-form v-model="valid">
        <v-text-field
                v-model="credentials.name"
                :rules="rules.agency.name"
                label="Nazwa oddziału"
                required
        ></v-text-field>

        <v-text-field
                v-model="credentials.address"
                :rules="rules.agency.address"
                label="Adres"
                required
        ></v-text-field>

        <v-text-field
                v-model="credentials.phone_number"
                :rules="rules.agency.phone_number"
                label="Numer telefonu"
                required
        ></v-text-field>

    </v-form>
</template>

<script>
    export default {
        name: 'AgencyForm',
        props: {
            agency: {},
        },
        data: () => ({
            valid: false,
            credentials: {},
            rules: {
                agency: {
                    name: [
                        v => !!v || 'Nazwa jest wymagana.',
                    ],
                    address: [
                        v => !!v || 'Adres jest wymagany.',
                    ],
                    phone_number: [
                        v => !!v || 'Numer telefonu jest wymagany.',
                    ],
                }
            },
        }),
        methods: {
            parseFormData() {
                if (this.agency) {
                    this.credentials = JSON.parse(JSON.stringify(this.agency))
                }
            }
        },
        created() {
            this.parseFormData();
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
