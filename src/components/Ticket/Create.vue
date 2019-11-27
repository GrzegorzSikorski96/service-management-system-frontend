<template>
    <v-container fluid>
        <v-row>
            <v-col class="col-12">
                <v-card class="ma-3" :elevation="5">
                    <v-card-title>
                        Tworzenie zgłoszenia
                    </v-card-title>
                </v-card>
            </v-col>

            <v-col class="col-12">
                <v-card class="ma-3" elevation="5">
                    <v-card-text>
                        <ticket-form ref="createForm" @valid="checkValid"/>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                                text
                                class="mx-auto font-weight-bold"
                                @click="createTicket"
                                :disabled="!valid"
                        >
                            Dodaj zgłoszenie
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import TicketForm from "./Form"

    export default {
        name: 'TicketCreate',
        data: () => ({
            valid: false,
        }),
        components:{
          TicketForm
        },
        methods: {
            async createTicket() {
                this.$http.post('/api/ticket', this.$refs.createForm.credentials)
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
