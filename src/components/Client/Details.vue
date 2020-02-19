<template>
    <v-card class="ma-3 pa-1" :elevation="5">
        <span v-if="!loading">
            <v-card-title>
                Dane klienta

                <v-spacer/>

                <v-btn icon @click="changeEditState" color="info">
                    <font-awesome-icon icon="user-edit" size="lg"/>
                </v-btn>

                <v-btn v-if="!checkRoute" icon :to="{name: 'ClientSummary', params: { id: client.id,}}">
                    <font-awesome-icon icon="external-link-alt" size="lg"/>
                </v-btn>
            </v-card-title>

            <v-card-text>
                <span class="font-weight-bold">
                    Nazwa:
                </span>
                {{ client.name }}

                <br>

                <span class="font-weight-bold">
                    Adres:
                </span>
                {{ client.address }}

                <span v-if="client.NIP">
                    <br>

                    <span class="font-weight-bold">
                        NIP:
                    </span>
                    {{ client.NIP }}
                </span>

                <br>

                <span class="font-weight-bold">
                    Email:
                </span>
                <a :href="'mailto:'+client.email">
                    {{ client.email }}
                </a>

                <br>

                <span class="font-weight-bold">
                    Numer telefonu:
                </span>
                <a :href="'tel:'+client.phone_number">
                    {{ client.phone_number }}
                </a>

                <br>

                <span class="font-weight-bold">
                    Opis:
                </span>
                {{ client.description }}
            </v-card-text>
        </span>

        <loading v-else/>
    </v-card>
</template>

<script>
    import Loading from "../Helpers/Loading"

    export default {
        name: 'ClientDetails',
        props: {
            client: {},
            loading: {},
        },
        components: {
            Loading,
        },
        methods: {
            changeEditState() {
                this.$emit('editCard', true)
            }
        },
        computed: {
            checkRoute() {
                return this.$router.currentRoute.name === 'ClientSummary'
            }
        },
    }
</script>

<style>
    a {
        text-decoration: none;
    }
</style>
