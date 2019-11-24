<template>
    <v-form v-model="valid">
        <v-text-field
                v-model="credentials.number"
                :rules="rules.number.required"
                label="NIP lub numer klienta"
                required
        />

        <agencies-autocomplete v-if="isAdmin()" v-model="credentials.agency_id"></agencies-autocomplete>

    </v-form>
</template>

<script>
    import AgenciesAutocomplete from "../../Forms/Autocomplete/Agencies";

    export default {
        name: 'CheckExistForm',
        components: {
            AgenciesAutocomplete,
        },
        data: () => ({
            credentials: {},
            valid: false,
            agencies: [],
            rules: {
                number: {
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
