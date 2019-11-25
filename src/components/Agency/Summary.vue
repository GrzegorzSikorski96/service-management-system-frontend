<template>
    <v-container fluid>
        <v-row class="col-12">
            <v-col class="col-12">
                <v-card class="ma-3" :elevation="5">
                    <v-card-title>
                        Informacje o oddziale: {{ agency.name }}

                        <v-spacer></v-spacer>

                        <agency-management :agency="agency"></agency-management>
                    </v-card-title>
                </v-card>
            </v-col>

            <v-col class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                <agency :agency="agency" :loading="loading"></agency>
            </v-col>

            <v-col class="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import Agency from "../Agency/Agency";
    import AgencyManagement from "./Management/Management";

    export default {
        name: 'AgencySummary',
        data: () => ({
            agency: [],
            loading: true,
            note: {
                credentials: {},
            }
        }),
        components: {
            Agency,
            AgencyManagement
        },
        methods: {
            fetchData() {
                this.$http.get(`/api/agency/${this.$route.params.id}`).then((response) => {
                    this.agency = response.data.data.agency;
                    this.loading = false;
                });
            },
        },
        created() {
            this.fetchData();
        },
    }
</script>

<style>
</style>
