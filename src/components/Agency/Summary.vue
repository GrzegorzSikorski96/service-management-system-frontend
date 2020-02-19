<template>
    <v-container fluid>
        <v-row class="col-12">
            <v-col class="col-12">
                <v-card class="ma-3" :elevation="5">
                    <v-card-title>
                        Informacje o oddziale: {{ agency.name }}

                        <v-spacer/>

                        <agency-management :agency="agency"/>
                    </v-card-title>
                </v-card>
            </v-col>

            <v-col class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                <agency :agency="agency" :loading="agencyLoading"/>
            </v-col>

            <v-col class="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                <agency-statistics v-if="isManager()" :statistics="statistics"
                                   :loading="statisticsLoading"/>
            </v-col>
        </v-row>

        <v-row class="col-12">
            <users-list v-if="isManager() && !agencyLoading" :agency="true"/>
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
        components: {
            Agency,
            AgencyManagement,
            UsersList,
            AgencyStatistics
        },
        data: () => ({
            agency: [],
            statistics: [],
            agencyLoading: true,
            statisticsLoading: true,
            note: {
                credentials: {},
            }
        }),
        methods: {
            async fetchAgency() {
                await this.$http.get(`/api/agency/${this.$route.params.id}`).then((response) => {
                    this.agency = response.data.data.agency;
                    this.agencyLoading = false;
                });
            },
            fetchStatistics() {
                this.$http.get(`/api/agency/${this.agency.id}/statistics`).then((response) => {
                    this.statistics = response.data.data;
                    this.statisticsLoading = false;
                });
            },
            initPusher() {
                let agency = this.$pusher.subscribe(`agency-${this.agency.id}`);

                agency.bind('update', this.fetchAgency);
                agency.bind('statistics', this.fetchStatistics);
            },
            init() {
                this.fetchAgency().then(() => {
                    this.fetchStatistics();
                    this.initPusher();
                })
            }
        },
        created() {
            this.init();
        },
        destroyed() {
            this.$pusher.unsubscribe(`agency-${this.agency.id}`);
        }
    }
</script>

<style>
</style>
