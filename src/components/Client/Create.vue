<template>
    <v-container fluid>
        <v-row>
            <v-col class="col-12">
                <v-card class="ma-3" :elevation="5">
                    <v-card-title>
                        Tworzenie klienta
                    </v-card-title>
                </v-card>
            </v-col>

            <v-col class="col-12">
                <v-card class="ma-3" :elevation="5">
                    <v-card-text>
                        <client-form ref="createForm" @valid="checkValid"></client-form>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                                text
                                class="mx-auto font-weight-bold"
                                @click="createClient"
                                :disabled="!valid"
                        >
                            Dodaj klienta
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import ClientForm from "./Form"

    export default {
        name: 'ClientCreate',
        data: () => ({
            valid: false,
        }),
        components: {
            ClientForm
        },
        methods: {
            async createClient() {
                this.$http.post('/api/client', this.$refs.createForm.credentials)
                    .then(() => {
                        this.$toasted.show('Utworzono zgłoszenie', {
                            type: 'success'
                        });
                    })
                    .catch(() => {
                        this.$toasted.show('Nie udało się utworzyć zgłoszenia', {
                            type: 'error'
                        });
                    })
            },
            checkValid(value) {
                this.valid = value
            }
        },
    }
</script>

<style>

</style>
