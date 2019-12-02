<template>
    <v-container fluid>
        <v-row>
            <v-col class="col-12">
                <v-card class="ma-3" :elevation="5">
                    <v-card-title>
                        Pracownicy

                        <v-spacer/>

                        <v-btn icon :to="{name: 'UserCreate'}">
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
                                hide-details/>
                    </v-card-title>

                    <v-data-table
                            :headers="headers"
                            :items="users"
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
                                   :to="{name: 'UserSummary', params: { id: item.id, client: item}}"
                                   elevation="2">
                                <v-icon>keyboard_arrow_right</v-icon>
                            </v-btn>
                        </template>

                        <template v-slot:item.role.name="{ item }">
                            <span class="text-uppercase">
                                {{ item.role.name }}
                            </span>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: 'UsersList',
        loading: true,
        props: {
            agency: {},
        },
        data: () => ({
            search: '',
            loading: true,
            users: [],
            headers: [
                {text: 'Imię', value: 'name', align: 'left'},
                {text: 'Nazwisko', value: 'surname'},
                {text: 'Email', value: 'email'},
                {text: 'Numer Telefonu', value: 'phone_number', sortable: false},
                {text: 'Rola', value: 'role.name'},
                {value: 'actions', sortable: false, align: 'right'},
            ],
        }),
        methods: {
            fetchUsers() {
                this.$http.get('/api/users').then((response) => {
                    this.users = response.data.data.users;
                    this.loading = false;
                });
            },
            fetchEmployees() {
                this.$http.get(`/api/agency/${this.$route.params.id}/employees`).then((response) => {
                    this.users = response.data.data.employees;
                    this.loading = false;
                });
            },
            async fetchData() {
                if (this.agency) {
                    await this.fetchEmployees();
                } else {
                    await this.fetchUsers();
                }
            },
            init() {
                this.fetchData().then(() => {
                    this.initPusher();
                })
            },
            initPusher() {
                let users = this.$pusher.subscribe('users');
                users.bind('update', this.fetchData);
            },
        },
        created() {
            this.init();
        },
        destroyed() {
            this.$puhser.unsubscribe(`users`)
        }
    }
</script>

<style>
    .route {
        text-transform: none;
    }
</style>
