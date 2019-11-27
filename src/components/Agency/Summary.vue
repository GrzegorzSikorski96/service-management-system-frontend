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
                <agency :agency="agency" :loading="agencyLoading"></agency>
            </v-col>

            <v-col class="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                <agency-statistics v-if="isManager()" :statistics="statistics"
                                   :loading="statisticsLoading"></agency-statistics>
            </v-col>
        </v-row>

        <v-row class="col-12">
            <users-list v-if="isManager() && !agencyLoading" :agency="true"></users-list>
        </v-row>
    </v-container>
</template>

<script>
    import Agency from "../Agency/Agency";
    import AgencyManagement from "./Management/Management";
    import UsersList from "../User/List"
    import AgencyStatistics from "./Statistics"

    export default {
        name: 'AgencySummary',
        data: () => ({
            agency: [],
            statistics: [],
            agencyLoading: true,
            statisticsLoading: true,
            note: {
                credentials: {},
            }
        }),
        components: {
            Agency,
            AgencyManagement,
            UsersList,
            AgencyStatistics
        },
        methods: {
            fetchData() {
                this.fetchAgency();
                this.fetchStatistics();
            },
            fetchAgency() {
                this.$http.get(`/api/agency/${this.$route.params.id}`).then((response) => {
                    this.agency = response.data.data.agency;
                    this.agencyLoading = false;
                });
            },
            fetchStatistics() {
                this.$http.get(`/api/agency/${this.$route.params.id}/statistics`).then((response) => {
                    this.statistics = response.data.data;
                    this.statisticsLoading = false;
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
