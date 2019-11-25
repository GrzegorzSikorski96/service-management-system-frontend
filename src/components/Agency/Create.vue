<template>
    <v-container fluid>
        <v-row>
            <v-col class="col-12">
                <v-card class="ma-3" :elevation="5">
                    <v-card-title>
                        Tworzenie oddziału
                    </v-card-title>
                </v-card>
            </v-col>

            <v-col class="col-12">
                <v-card class="ma-3" elevation="5">
                    <v-card-text>
                        <agency-form ref="createForm" @valid="checkValid"></agency-form>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                                text
                                class="mx-auto font-weight-bold"
                                @click="createAgency"
                                :disabled="!valid"
                        >
                            Dodaj oddział
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import AgencyForm from "./Form"

    export default {
        name: 'AgencyCreate',
        data: () => ({
            valid: false,
        }),
        components: {
            AgencyForm
        },
        methods: {
            async createAgency() {
                this.$http.post('/api/agency', this.$refs.createForm.credentials)
                    .then(() => {
                        this.$toasted.show('Utworzono oddział', {
                            type: 'success'
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
