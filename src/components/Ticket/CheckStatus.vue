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
                                required/>
                    </v-form>

                    <v-alert
                            border="left"
                            colored-border
                            :color="status.color"
                            elevation="2"
                            v-if="!!status"
                    >
                        Status zgłoszenia: {{status.name}}
                    </v-alert>

                    <loading v-if="loading"/>
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
    import Loading from "./../Helpers/Loading"

    export default {
        name: 'CheckStatus',
        components:{
            Loading
        },
        data: () => ({
            valid: false,
            token: '',
            loading: false,
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
                this.loading = true;
                this.status = null;

                this.$http.get(`/api/ticket/${this.token}/status`).then((response) => {
                    this.status = response.data.data.status
                    this.loading = false;
                });
            },
        }
    }
</script>

<style>

</style>
