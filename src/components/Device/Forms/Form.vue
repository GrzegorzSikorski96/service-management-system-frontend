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
            }
        },
        created() {
            this.parseFormData()
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
