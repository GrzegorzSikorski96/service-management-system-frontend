<template>
    <v-container fluid>
        <v-row>
            <v-col class="col-12">
                <v-card class="ma-3" :elevation="5">
                    <v-card-title>
                        Tworzenie urządzenia
                    </v-card-title>
                </v-card>
            </v-col>

            <v-col class="col-12">
                <v-card class="ma-3" :elevation="5">
                    <v-card-text>
                        <device-form ref="createForm" @valid="checkValid"></device-form>
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
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import DeviceForm from "./Form"

    export default {
        name: 'ClientCreate',
        data: () => ({
            valid: false,
        }),
        components: {
            DeviceForm
        },
        methods: {
            async createDevice() {
                this.$http.post('/api/device', this.$refs.createForm.credentials)
                    .then(() => {
                        this.$toasted.show('Utworzono urządzenie', {
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
