<template>
    <v-container fluid fill-height>
        <v-card
                raised
                shaped
                class="mx-auto col-12"
        >
            <v-card-title>
                Klienci
                <v-spacer></v-spacer>
                <v-text-field
                        v-model="search"
                        append-icon="search"
                        label="Szukaj"
                        single-line
                        hide-details
                ></v-text-field>
            </v-card-title>

            <v-data-table
                    :headers="headers"
                    :items="clients"
                    :search="search"
                    :loading="loading"
            >
                <template v-slot:item.email="{ item }">
                    <a :href="'mailto:' + item.email" class="route">
                        {{ item.email }}
                    </a>
                </template>

                <template v-slot:item.phone_number="{ item }">
                    <a :href="'tel:'+item.phone_number" class="route">
                        {{ item.phone_number }}
                    </a>
                </template>

                <template v-slot:item.actions="{ item }">
                    <v-btn text icon color="info" :to="{name: 'ClientSummary', params: { id: item.id, client: item}}"
                           elevation="2">
                        <v-icon>keyboard_arrow_right</v-icon>
                    </v-btn>
                </template>
            </v-data-table>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        name: 'ClientList',
        loading: true,
        data: () => ({
            search: '',
            loading: true,
            clients: [],
            headers: [
                {text: 'Nazwa', value: 'name', align: 'left'},
                {text: 'Adres', value: 'address'},
                {text: 'Email', value: 'email'},
                {text: 'Numer Telefonu', value: 'phone_number', sortable: false,},
                {value: 'actions', sortable: false, align: 'right'},
            ],
        }),
        methods: {
            async fetchClients() {
                this.$http.get(`/api/clients`).then((response) => {
                    this.clients = response.data.data.clients;
                    this.loading = false;
                });
            },
        },
        created() {
            this.fetchClients();
        },
    }
</script>

<style>
    .route {
        text-transform: none;
    }
</style>
