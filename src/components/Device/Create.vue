<template>
    <v-container fluid fill-height>
        <v-row>
            <v-card
                    class="col-8 mx-auto"
                    raised
                    shaped
            >
                <v-card-text>
                    <p class="display-1 text--primary">Tworzenie urządzenia</p>
                    <v-form v-model="valid">
                        <v-text-field
                                v-model="credentials.name"
                                :rules="rules.device.name"
                                label="Nazwa urządzenia"
                                required
                        ></v-text-field>

                        <v-text-field
                                v-model="credentials.serial_number"
                                :rules="rules.device.serial_number"
                                label="Numer seryjny"
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
                            @click="createDevice"
                            :disabled="!valid"
                    >
                        Dodaj urządzenie
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: 'Create',
        data: () => ({
            valid: false,
            credentials: {
                description: '',
                serial_number: '',
                name: '',
            },
            rules: {
                device: {
                    name: [
                        v => !!v || 'Nazwa jest wymagana.',
                    ],
                    serial_number: [
                        v => !!v || 'Numer seryjny jest wymagany.',
                    ],
                }
            },
        }),
        methods: {
            async createDevice() {
                this.$http.post('/api/device', this.credentials)
                    .then(() => {
                        this.$toasted.show('Utworzono urządzenie', {
                            type: 'success'
                        });
                    })
                    .catch(() => {
                        this.$toasted.show('Nie udało się utworzyć urządzenia', {
                            type: 'error'
                        });
                    })
            }
        },
    }
</script>

<style>

</style>
