<template>
    <v-container fluid>
        <v-row>
            <v-col class="col-12">
                <v-card class="ma-3" :elevation="5">
                    <v-card-title>
                        Oddziały

                        <v-spacer></v-spacer>

                        <v-btn v-if="isAdmin()" icon :to="{name: 'AgencyCreate'}">
                            <font-awesome-icon icon="plus" size="lg"/>
                        </v-btn>
                    </v-card-title>
                </v-card>
            </v-col>

            <v-col class="col-12">
                <v-card
                        elevation="5"
                        class="ma-3"
                >
                    <v-card-title>
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
                            :items="agencies"
                            :search="search"
                            :loading="loading"
                    >
                        <template v-slot:item.phone_number="{ item }">
                            <a :href="'tel:'+item.phone_number" class="route">
                                {{ item.phone_number }}
                            </a>
                        </template>

                        <template v-slot:item.actions="{ item }">
                            <v-btn text icon color="info" :to="{name: 'AgencySummary', params: { id: item.id }}"
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
        name: 'AgenciesList',
        data: () => ({
            search: '',
            agencies: [],
            loading: true,
            headers: [
                {text: 'Nazwa', value: 'name', align: 'left',},
                {text: 'Adres', value: 'address'},
                {text: 'Numer telefonu', value: 'phone_number',},
                {value: 'actions', sortable: false, align: 'right'},
            ],
        }),
        methods: {
            fetchAgencies() {
                this.$http.get(`/api/agencies`).then((response) => {
                    this.agencies = response.data.data.agencies;
                    this.loading = false;
                });
            },
        },
        created() {
            this.fetchAgencies();
        },
    }
</script>

<style>
    .route {
        text-transform: none;
    }
</style>
