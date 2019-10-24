<template>
    <v-container fluid fill-height>
        <v-row>
            <v-card
                    class="col-8 mx-auto"
                    raised
                    shaped
            >
                <v-card-text>
                    <p class="display-1 text--primary">Tworzenie klienta</p>
                    <v-form v-model="valid">
                        <v-text-field
                                v-model="credentials.name"
                                :rules="rules.client.name"
                                label="Nazwa klienta"
                                required
                        ></v-text-field>

                        <v-text-field
                                v-model="credentials.address"
                                label="Adres"
                                required
                        ></v-text-field>

                        <v-text-field
                                v-model="credentials.phone_number"
                                label="Numer telefonu"
                                required
                        ></v-text-field>

                        <v-text-field
                                v-model="credentials.email"
                                label="Email"
                                required
                        ></v-text-field>

                        <v-textarea
                                v-model="credentials.description"
                                label="Opis"
                        ></v-textarea>
                    </v-form>
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
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: 'ClientCreate',
        data: () => ({
            valid: false,
            credentials: {
                description: '',
                phone_number: '',
                name: '',
                email: '',
                address: '',
            },
            rules: {
                client: {
                    description: [
                        v => !!v || 'Opis jest wymagany.',
                    ],
                    name: [
                        v => !!v || 'Nazwa jest wymagana.',
                    ],
                    phone_number: [
                        v => !!v || 'Numer telefonu jest wymagany.',
                    ],
                    email: [
                        v => /.+@.+/.test(v) || 'Wprowawdź prawidłowy adres E-mail',
                    ],
                }
            },
        }),
        methods: {
            async createClient() {
                this.$http.post('/api/client', this.credentials)
                    .then(() => {
                        this.$toasted.show('Utworzono Klienta', {
                            type: 'success'
                        });
                    })
                    .catch(() => {
                        this.$toasted.show('Nie udało się utworzyć zgłoszenia', {
                            type: 'error'
                        });
                    })
            }
        },
    }
</script>

<style>

</style>
