<template>
    <v-card class="ma-3 pa-1" :elevation="5">
        <span v-if="!loading">
        <v-card-title>
            Dane serwisu

            <v-spacer></v-spacer>

            <v-btn icon @click="changeEditState" color="info">
                <font-awesome-icon icon="user-edit" size="lg"/>
            </v-btn>
        </v-card-title>

        <v-card-text>
                <span class="font-weight-bold">
                    Nazwa:
                </span>
            {{ service.name }}

            <br>

            <span class="font-weight-bold">
                                Numer telefonu:
                            </span>
            <a :href="'tel:'+ service.phone_number">
                {{ service.phone_number }}
            </a>

            <br>

            <span class="font-weight-bold">
                                Adres:
                            </span>
            {{ service.address }}

            <br>

            <span class="font-weight-bold">
                                NIP:
                            </span>
            {{ service.NIP }}

            <br>

            <span class="font-weight-bold">
                                Opis:
                            </span>
            {{ service.description }}

        </v-card-text>
        </span>
        <loading v-else/>
    </v-card>
</template>

<script>
    import Loading from "./../Helpers/Loading"

    export default {
        name: 'ServiceDetails',
        components: {
            Loading
        },
        props: {
            service: {},
            loading: {},
        },
        methods: {
            changeEditState() {
                this.$emit('editCard', true)
            }
        },
    }
</script>

<style>
    a {
        text-decoration: none;
    }
</style>
