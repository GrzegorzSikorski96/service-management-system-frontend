<template>
    <v-form v-model="valid">
        <v-text-field
                v-model="credentials.name"
                :rules="rules.client.name"
                label="Nazwa klienta"
                required
        ></v-text-field>

        <v-text-field
                v-model="credentials.address"
                :rules="rules.client.address"
                label="Adres"
                required
                aria-multiline="true"
        ></v-text-field>

        <v-text-field
                v-model="credentials.phone_number"
                :rules="rules.client.phone_number"
                label="Numer telefonu"
                required
        ></v-text-field>

        <v-text-field
                v-model="credentials.email"
                :rules="rules.client.phone_number"
                label="Email"
                required
        ></v-text-field>

        <v-textarea
                v-model="credentials.description"
                label="Opis"
        ></v-textarea>
    </v-form>
</template>

<script>
    export default {
        name: 'Form',
        props: {
            client: {},
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
        created() {
            this.credentials = JSON.parse(JSON.stringify(this.client))
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
