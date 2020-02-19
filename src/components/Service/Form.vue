<template>
    <v-form v-model="valid">
        <v-text-field
                v-model="credentials.name"
                :rules="rules.service.name"
                label="Nazwa serwisu"
                required/>

        <v-text-field
                v-model="credentials.address"
                :rules="rules.service.address"
                label="Adres"
                required/>

        <v-text-field
                v-model="credentials.NIP"
                :rules="rules.service.NIP"
                label="Numer NIP"
                required/>

        <v-text-field
                v-model="credentials.phone_number"
                :rules="rules.service.phone_number"
                label="Numer telefonu"
                required/>

        <v-text-field
                v-model="credentials.description"
                :rules="rules.service.description"
                label="Opis"
                required/>
    </v-form>
</template>

<script>
    export default {
        name: 'ServiceForm',
        props: {
            service: {},
        },
        data: () => ({
            valid: false,
            credentials: {},
            rules: {
                service: {
                    name: [
                        v => !!v || 'Nazwa jest wymagana.',
                    ],
                    address: [
                        v => !!v || 'Adres jest wymagany.',
                    ],
                    description: [
                        v => !!v || 'Opis jest wymagany.',
                    ],
                    phone_number: [
                        v => !!v || 'Numer telefonu jest wymagany.',
                    ],
                    NIP: [
                        v => !!v || 'Numer NIP jest wymagany.',
                    ],
                }
            },
        }),
        methods: {
            parseFormData() {
                if (this.service) {
                    this.credentials = JSON.parse(JSON.stringify(this.service))
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
