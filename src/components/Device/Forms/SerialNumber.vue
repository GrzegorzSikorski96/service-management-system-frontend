<template>
    <v-form v-model="valid">
        <v-text-field
                v-model="credentials.serial_number"
                :rules="rules.serial_number.required"
                label="Numer seryjny"
                required
        ></v-text-field>

        <agencies-autocomplete v-if="isAdmin()" v-model="credentials.agency_id"/>

    </v-form>
</template>

<script>
    import AgenciesAutocomplete from "../../Forms/Autocomplete/Agencies";

    export default {
        name: 'SerialNumberForm',
        components: {
            AgenciesAutocomplete,
        },
        data: () => ({
            credentials: {},
            agencies: [],
            valid: false,
            rules: {
                serial_number: {
                    required: [
                        v => !!v || 'Numer seryjny jest wymagany.',
                    ],
                },
                agency_id: {
                    required: [
                        v => !!v || 'Oddział jest wymagany.',
                    ],
                }
            },
        }),
        methods: {
            setDefault() {
                if (!this.isAdmin()) {
                    this.credentials.agency_id = this.$store.state.currentUser.agency_id;
                }
            },
        },
        created() {
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
