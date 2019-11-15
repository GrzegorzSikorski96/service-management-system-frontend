<template>
    <v-container fluid fill-height>
        <v-row>
            <v-card
                    class="col-8 mx-auto"
                    raised
                    shaped
            >
                <v-card-text>
                    <p class="display-1 text--primary">Sprawdź status zgłoszenia</p>

                    <v-form v-model="valid">
                        <v-text-field
                                v-model="token"
                                :rules="rules.ticket.token"
                                :counter="15"
                                label="Numer zgłoszenia"
                                required
                        ></v-text-field>
                    </v-form>

                    <v-alert
                            border="left"
                            colored-border
                            type="info"
                            elevation="2"
                            v-if="!!status"
                    >
                        Status zgłoszenia to: {{status.name}}
                    </v-alert>
                </v-card-text>

                <v-card-actions>
                    <v-btn
                            text
                            class="mx-auto font-weight-bold"
                            @click="checkStatus"
                            :disabled="!valid"
                    >
                        Sprawdź status
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: 'CheckStatus',
        data: () => ({
            valid: false,
            token: '',
            status: null,
            rules: {
                ticket: {
                    token: [
                        v => !!v || 'Numer zgłoszenia jest wymagany.',
                        v => v.length === 15 || 'Numer zgłoszenia składa się z 15 znaków.'
                    ],
                }
            },
        }),
        methods: {
            checkStatus() {
                this.$http.get(`/api/ticket/${this.token}/status`).then((response) => {
                    this.status = response.data.data.status
                });
            }
        }
    }
</script>

<style>

</style>
