<template>
    <v-card class="ma-3 pa-1">
        <span v-if="!loading">
            <v-card-title>
                Edycja klienta

                <v-spacer></v-spacer>

                <v-btn color="red" icon @click="changeEditState">
                    <font-awesome-icon icon="times" size="lg"/>
                </v-btn>
                <v-btn color="green" icon @click="updateClient">
                    <font-awesome-icon icon="save" size="lg"/>
                </v-btn>
            </v-card-title>

            <v-card-text>
                <client-form :client="client" ref="editForm" :valid="valid"></client-form>
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
    import ClientForm from "./Form";

    export default {
        name: 'Edit',
        data: () => ({
            valid: false,
        }),
        props: {
            client: {},
            loading: {},
        },
        components: {
            ClientForm
        },
        methods: {
            async updateClient() {
                this.$http.put('/api/client', this.$refs.editForm.credentials)
                    .then(() => {
                        this.$toasted.show('Zedytowano Klienta', {
                            type: 'success'
                        });
                    })
                    .catch(() => {
                        this.$toasted.show('Nie udało się utworzyć zgłoszenia', {
                            type: 'error'
                        });
                    })
            },
            changeEditState() {
                this.$emit('editCard', false)
            },
        },
        computed: {
            checkRoute() {
                return this.$router.currentRoute.name === 'Client'
            },
        },
    }
</script>

<style>
    a {
        text-decoration: none;
    }
</style>
