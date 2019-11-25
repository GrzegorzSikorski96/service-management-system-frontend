<template>
    <v-card class="ma-3 pa-1" :elevation="5">
        <span v-if="!loading">
            <v-card-title>
                Dane oddziału

                <v-spacer></v-spacer>

                <v-btn icon @click="changeEditState" color="info">
                    <font-awesome-icon icon="user-edit" size="lg"/>
                </v-btn>

                <v-btn v-if="!checkRoute" icon :to="{name: 'AgencySummary', params: { id: agency.id,}}">
                    <font-awesome-icon icon="external-link-alt" size="lg"/>
                </v-btn>
            </v-card-title>

            <v-card-text>
                <span class="font-weight-bold">
                    Nazwa:
                </span>
                {{ agency.name }}

                <br>

                <span class="font-weight-bold">
                                Adres:
                            </span>
                {{ agency.address }}

                <br>

                <span class="font-weight-bold">
                                Numer telefonu:
                            </span>
                <a :href="'tel:'+ agency.phone_number">
                    {{ agency.phone_number }}
                </a>

            </v-card-text>
        </span>

        <v-progress-circular v-else
                             class="mx-auto"
                             :size="80"
                             indeterminate
                             color="primary"
        ></v-progress-circular>
    </v-card>
</template>

<script>
    export default {
        name: 'AgencyDetails',
        props: {
            agency: {},
            loading: {},
        },
        methods: {
            changeEditState() {
                this.$emit('editCard', true)
            }
        },
        computed: {
            checkRoute() {
                return this.$router.currentRoute.name === 'AgencySummary'
            }
        },
    }
</script>

<style>
    a {
        text-decoration: none;
    }
</style>
