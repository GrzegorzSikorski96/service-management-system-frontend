<template>
    <v-autocomplete
            :disabled="!(agency_id || clients.length)"
            :items="clients"
            :rules="rules.client_id.required"
            v-model="client_id"
            label="Klient"
            item-text="clientString"
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
        name: 'ClientsAutocomplete',
        props: {
            agency_id: {},
        },
        data: () => ({
            client_id: null,
            clients: [],
            rules: {
                client_id: {
                    required: [
                        v => !!v || 'Urządzenie jest wymagane.',
                    ],
                }
            },
        }),
        methods: {
            createClientsString() {
                this.clients.forEach(function (value) {
                    value['clientString'] = value.name + ' ' + value.address;
                })
            },
            getUrl() {
                if (this.isAdmin()) {
                    if (this.agency_id) {
                        return `/api/agency/${this.agency_id}/clients`;
                    }
                } else {
                    return '/api/clients'
                }
            },
            async fetchClients() {
                if(this.getUrl()){
                    this.$http.get(this.getUrl()).then((response) => {
                        this.clients = response.data.data.clients;
                        this.createClientsString()
                    });
                }
            }
        },
        created() {
            this.fetchClients();
        },
        watch: {
            client_id: function (value) {
                this.$emit('input', value)
            },
            agency_id: function () {
                this.fetchClients()
            },
        },
    }
</script>

<style>

</style>
