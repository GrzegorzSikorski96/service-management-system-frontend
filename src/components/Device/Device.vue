<template>
    <v-container fluid fill-height>
        <v-row>
            <v-card
                    class="col-8 mx-auto"
                    raised
                    shaped
            >


                <v-card-text>
                    <p class="display-1 text--primary">Zgłoszenie: {{ device.name }}</p>
                </v-card-text>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: 'Device',
        data: () => ({
            device: [],
        }),
        methods: {
            async fetchDevice() {
                this.$http.get(`/api/device/${this.$route.params.id}`,).then((response) => {
                    this.device = response.data.data.device;
                });
            },
        },
        created() {
            this.fetchDevice();
        }
    }
</script>

<style>

</style>
