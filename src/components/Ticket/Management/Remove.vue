<template>
    <v-dialog v-model="modal" max-width="500px" @click:outside="closeDialog()">
        <v-card>
            <v-card-title>
                Usuń zgłoszenie {{ ticket.token }}
            </v-card-title>

            <v-card-text>
                Czy napewno chcesz usunąć zgłoszenie <strong>{{ ticket.token }}</strong>?

                <br>

                <span class="error--text font-weight-bold text-uppercase mx-auto">Usuniętych elementów nie można przywrócić</span>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="removeTicket()">Usuń</v-btn>
                <v-btn color="darken-1" text @click="closeDialog()">Anuluj</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: 'RemoveTicketDialog',
        props: {
            modal: {},
            ticket: {},
        },
        methods: {
            async removeTicket() {
                this.$http.delete(`/api/ticket/${this.ticket.id}`)
                    .then(() => {
                        this.$toasted.show('Usunięto zgloszenie.', {
                            type: 'success'
                        });

                        this.$router.push('/tickets');
                    })
            },
            closeDialog() {
                this.$emit('modal', false)
            },
        },
    }
</script>

<style>
</style>
