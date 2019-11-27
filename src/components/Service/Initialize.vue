<template>
    <v-container fluid fill-height>
        <v-row>
            <v-stepper v-model="step" class="col-10 mx-auto">
                <v-stepper-header>
                    <v-stepper-step :complete="step > 1" step="1">Tworzenie serwisu</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :complete="step > 2" step="2">Tworzenie pierwszego oddziału</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :complete="step > 3" step="3">Gotowe!</v-stepper-step>
                </v-stepper-header>

                <v-stepper-items>
                    <v-stepper-content step="1">

                        <service-form ref="createServiceForm" @valid="checkValid"/>

                        <v-btn
                                color="primary"
                                @click="initializeService()"
                                :disabled="!valid"
                        >
                            Utwórz serwis
                        </v-btn>
                    </v-stepper-content>

                    <v-stepper-content step="2">
                        <agency-form ref="createAgencyForm" @valid="checkValid"/>

                        <v-btn
                                color="primary"
                                @click="createAgency()"
                        >
                            Utwórz oddział
                        </v-btn>
                    </v-stepper-content>

                    <v-stepper-content step="3">
                        <v-btn
                                color="primary"
                                class="mx-auto"
                                @click="checkInitialized()"
                                block
                        >
                            Aby przejść do panelu odśwież stronę bądź klinij tutaj
                        </v-btn>
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
        </v-row>
    </v-container>
</template>

<script>
    import ServiceForm from "./Form"
    import AgencyForm from "../Agency/Form"

    export default {
        name: 'ServiceInitialize',
        components: {
            ServiceForm,
            AgencyForm
        },
        props: {
            loading: {},
        },
        data: () => ({
            step: 1,
            valid: false
        }),
        methods: {
            async initializeService() {
                this.$http.post('/api/service/initialize', this.$refs.createServiceForm.credentials)
                    .then((response) => {
                        if (response.data.success) {
                            this.step = 2;
                        }
                    })
            },
            async createAgency() {
                this.$http.post('/api/agency', this.$refs.createAgencyForm.credentials)
                    .then(() => {
                        this.$toasted.show('Utworzono oddział', {
                            type: 'success'
                        });

                        this.step = 3
                    })
            },
            checkService() {
                this.$http.get('/api/service')
                    .then((response) => {
                        if (response.data.data.service.length) {
                            this.checkAgency();
                            this.step = 2;
                        }
                    })
            },
            checkAgency() {
                this.$http.get('/api/agencies')
                    .then((response) => {
                        if (response.data.data.agencies.length) {
                            this.step = 3;
                        }
                    })
            },
            checkInitialized() {
              this.$emit('initialized')
            },
            checkValid(value) {
                this.valid = value
            }
        },
        created() {
            this.checkService();
        }
    }
</script>

<style>
    a {
        text-decoration: none;
    }
</style>
