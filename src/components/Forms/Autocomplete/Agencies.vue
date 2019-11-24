<template>
    <v-autocomplete
            :items="agencies"
            :rules="rules.agency_id.required"
            v-model="agency_id"
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
</template>

<script>
    export default {
        name: 'AgenciesAutocomplete',
        data: () => ({
            agencies: [],
            agency_id: {},
            rules: {
                agency_id: {
                    required: [
                        v => !!v || 'Oddział jest wymagany.',
                    ],
                }
            },
        }),
        methods: {
            createAgenciesString() {
                this.agencies.forEach(function (value) {
                    value['agencyString'] = value.name + ' ' + value.address;
                })
            },
            async fetchAgencies() {
                this.$http.get(`/api/agencies`,).then((response) => {
                    this.agencies = response.data.data.agencies;
                    this.createAgenciesString()
                });
            },
        },
        created() {
            this.fetchAgencies();
        },
        watch: {
            agency_id: function (value) {
                this.$emit('input', value)
            },
        },
    }
</script>

<style>

</style>
