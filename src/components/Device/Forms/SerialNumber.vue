<template>
    <v-form v-model="valid">
        <v-text-field
                v-model="credentials.serial_number"
                :rules="rules.serial_number.required"
                label="Numer seryjny"
                required
        ></v-text-field>
    </v-form>
</template>

<script>
    export default {
        name: 'SerialNumberForm',
        data: () => ({
            credentials: {},
            valid: false,
            rules: {
                serial_number: {
                    required: [
                        v => !!v || 'Numer seryjny jest wymagany.',
                    ],
                }
            },
        }),
        watch: {
            valid: function (value) {
                this.$emit('valid', value)
            },
        },
    }
</script>

<style>

</style>
