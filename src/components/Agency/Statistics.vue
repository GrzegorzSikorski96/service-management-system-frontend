<template>
    <v-card class="ma-3 pa-1" :elevation="5">
        <span v-if="!loading">
        <v-card-title>
            Statystyki oddziału
        </v-card-title>

        <v-card-text>
            <span class="font-weight-bold text--primary">
                Liczba pracowników:
            </span>
            {{ statistics.employees }}

            <br>

            <span class="font-weight-bold text--primary">
                Liczba klientów:
            </span>
            {{ statistics.clients }}

            <br>

            <span class="font-weight-bold text--primary">
                                Liczba urządzeń:
            </span>
            {{ statistics.devices }}

            <br>

            <span class="font-weight-bold text--primary">
                                Liczba zgłoszeń:
            </span>
            {{ statistics.tickets }}

            <ul class="text--primary">
                <li v-for="(status, key) in statistics.ticketStatuses" :key="key">
                    <span class="font-weight-bold">{{ key }}:</span> <span class="text--secondary"> {{ status }} </span>
                </li>
            </ul>

        </v-card-text>
        </span>
        <loading v-else/>
    </v-card>
</template>

<script>
    import Loading from "../Helpers/Loading"

    export default {
        name: 'AgencyStatistics',
        components: {
            Loading
        },
        props: {
            statistics: {},
            loading: {},
        },
    }
</script>

<style>
</style>
