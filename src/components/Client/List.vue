<template>
    <v-container fluid>
        <v-row>
            <v-col class="col-12">
                <v-card class="ma-3" :elevation="5">
                    <v-card-title>
                        Klienci

                        <v-spacer></v-spacer>

                        <v-btn v-if="isAdmin()" icon :to="{name: 'ClientCreate'}">
                            <font-awesome-icon icon="plus" size="lg"/>
                        </v-btn>
                    </v-card-title>
                </v-card>
            </v-col>

            <v-col class="col-12">
                <v-card
                        class="ma-3"
                        elevation="5"
                >
                    <v-card-title>
                        <v-text-field
                                v-model="search"
                                append-icon="search"
                                label="Search"
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
                            <v-btn text icon color="info"
                                   :to="{name: 'ClientSummary', params: { id: item.id, client: item}}"
                                   elevation="2">
                                <v-icon>keyboard_arrow_right</v-icon>
                            </v-btn>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
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
                {text: 'NIP', value: 'NIP', sortable: false,},
                {value: 'actions', sortable: false, align: 'right'},
            ],
        }),
        methods: {
            async fetchClients() {
                await this.$http.get(`/api/clients`).then((response) => {
                    this.clients = response.data.data.clients;
                    this.loading = false;
                });
            },
            initPusher() {
                let clients = this.$pusher.subscribe('clients');

                clients.bind('update', this.fetchClients);
            },
            init() {
                this.fetchClients().then(() => {
                    this.initPusher();
                })
            },
        },
        created() {
            this.init();
        },
    }
</script>

<style>
    .route {
        text-transform: none;
    }
</style>
