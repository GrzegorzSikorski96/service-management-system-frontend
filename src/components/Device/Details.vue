<template>
    <v-card class="ma-3 pa-1" :elevation="5">
        <span v-if="!loading">
            <v-card-title>
                Dane urządzenia

                <v-spacer/>

                <v-btn icon @click="changeEditState" color="info">
                    <font-awesome-icon icon="pen" size="lg"/>
                </v-btn>

                <v-btn v-if="!checkRoute" icon :to="{name: 'DeviceSummary', params: { id: device.id,}}">
                    <font-awesome-icon icon="external-link-alt" size="lg"/>
                </v-btn>
            </v-card-title>

            <v-card-text>
                <span class="font-weight-bold">
                    Nazwa:
                </span>
                {{ device.name }}

                <br>

                <span class="font-weight-bold">
                    Numer seryjny:
                </span>
                {{ device.serial_number }}

                <br>

                <span class="font-weight-bold">
                    Opis:
                </span>
                {{ device.description }}
            </v-card-text>
        </span>

        <loading v-else/>
    </v-card>
</template>

<script>
    import Loading from "../Helpers/Loading"

    export default {
        name: 'Details',
        components: {
            Loading
        },
        props: {
            device: {},
            loading: {},
        },
        methods: {
            changeEditState() {
                this.$emit('editCard', true)
            }
        },
        computed: {
            checkRoute() {
                return this.$router.currentRoute.name === 'DeviceSummary'
            }
        },
    }
</script>

<style>
</style>
