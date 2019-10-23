<template>
    <v-container fluid fill-height>
        <v-row>
            <v-card
                    class="col-8 mx-auto"
                    raised
                    shaped
            >
                <v-card-text>
                    <p class="display-1 text--primary">Klient: {{ client.name }}</p>
                </v-card-text>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: 'Client',
        data: () => ({
            client: [],
        }),
        methods: {
            async fetchClient() {
                this.$http.get(`/api/client/${this.$route.params.id}`,).then((response) => {

                    this.client = response.data.data.client;
                });
            },
        },
        created() {
            this.fetchClient();
        }
    }
</script>

<style>

</style>
