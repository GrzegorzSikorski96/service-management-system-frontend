<template>
    <v-form v-model="valid">
        <v-text-field
                v-model="credentials.number"
                :rules="rules.number.required"
                label="NIP lub numer klienta"
                required
        ></v-text-field>
    </v-form>
</template>

<script>
    export default {
        name: 'CheckExistForm',
        data: () => ({
            credentials: {},
            valid: false,
            rules: {
                number: {
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
