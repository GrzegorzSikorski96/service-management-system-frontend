<template>
    <v-form v-model="valid">
        <v-text-field
                v-model="credentials.number"
                :rules="rules.number.required"
                label="NIP lub numer klienta"
                required
        ></v-text-field>

        <v-autocomplete
                v-if="isAdmin()"
                :items="agencies"
                :rules="rules.agency_id.required"
                v-model="credentials.agency_id"
                label="Oddział"
                item-text="agencyString"
                item-value="id"
        >
            <template v-slot:item="data">
                <v-list-item-content>
                    <v-list-item-title>{{ data.item.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ data.item.address }}</v-list-item-subtitle>
                </v-list-item-content>
            </template>
        </v-autocomplete>
    </v-form>
</template>

<script>
    export default {
        name: 'CheckExistForm',
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
            isAdmin() {
                return this.$store.state.currentUser.role.name === 'administrator';
            },
            createAgenciesString() {
                this.agencies.forEach(function (value) {
                    value['agencyString'] = value.name + ' ' + value.address;
                })
            },
            async fetchAgencies() {
                if (this.isAdmin()) {
                    this.$http.get(`/api/agencies`,).then((response) => {
                        this.agencies = response.data.data.agencies;
                        this.createAgenciesString()
                    });
                }
            },
            setDefault() {
                if (!this.isAdmin()) {
                    this.credentials.agency_id = this.$store.state.currentUser.agency_id;
                }
            },
        },
        created() {
            this.fetchAgencies();
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
