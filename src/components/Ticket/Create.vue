<template>
    <v-container fluid fill-height>
        <v-row>
            <v-card
                    class="col-8 mx-auto"
                    raised
                    shaped
            >
                <v-card-text>
                    <p class="display-1 text--primary">Tworzenie zgłoszenia</p>

                    <ticket-form ref="createForm" @valid="checkValid"></ticket-form>
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
