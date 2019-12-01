<template>
    <v-form v-model="valid">
        <v-text-field
                v-model="credentials.name"
                :rules="rules.client.name"
                label="Nazwa klienta"
                required/>

        <v-text-field
                v-model="credentials.address"
                :rules="rules.client.address"
                label="Adres"
                required
                aria-multiline="true"/>

        <v-text-field
                v-model="credentials.NIP"
                label="Numer NIP"
                required/>

        <v-text-field
                v-model="credentials.phone_number"
                :rules="rules.client.phone_number"
                label="Numer telefonu"
                required/>

        <v-text-field
                v-model="credentials.email"
                :rules="rules.client.email"
                label="Email"
                required/>

        <v-textarea
                v-model="credentials.description"
                label="Opis"/>

        <agencies-autocomplete v-if="isAdmin() && !edit" v-model="credentials.agency_id"/>
    </v-form>
</template>

<script>
    import AgenciesAutocomplete from "../../Forms/Autocomplete/Agencies"

    export default {
        name: 'ClientForm',
        props: {
            client: {},
            edit: {},
        },
        components: {
            AgenciesAutocomplete
        },
        data: () => ({
            credentials: {},
            valid: false,
            rules: {
                client: {
                    description: [
                        v => !!v || 'Opis jest wymagany.',
                    ],
                    name: [
                        v => !!v || 'Nazwa jest wymagana.',
                    ],
                    address: [
                        v => !!v || 'Adres jest wymagany.',
                    ],
                    phone_number: [
                        v => !!v || 'Numer telefonu jest wymagany.',
                    ],
                    email: [
                        v => /.+@.+/.test(v) || 'Wprowawdź prawidłowy adres E-mail',
                    ],
                }
            },
        }),
        methods: {
            parseFormData() {
                if (this.client) {
                    this.credentials = JSON.parse(JSON.stringify(this.client))
                }
            },
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
