<template>
    <v-dialog v-model="modal" max-width="500px" @click:outside="closeDialog()">
        <v-card>
            <v-card-title>
                Usuń klienta {{ client.name }}
            </v-card-title>

            <v-card-text>
                Czy napewno chcesz usunąć klienta <strong>{{ client.name }}</strong>oraz jego
                elementy:

                <ul>
                    <li>
                        Zgłoszenia
                    </li>
                </ul>

                <br>

                <span class="error--text font-weight-bold text-uppercase mx-auto">Usuniętych elementów nie można przywrócić</span>
            </v-card-text>

            <v-card-actions>
                <v-spacer/>
                <v-btn color="red darken-1" text @click="removeClient()">Usuń</v-btn>
                <v-btn color="darken-1" text @click="closeDialog()">Anuluj</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: 'RemoveClientDialog',
        props: {
            modal: {},
            client: {},
        },
        methods: {
            async removeClient() {
                this.$http.delete(`/api/client/${this.client.id}`)
                    .then(() => {
                        this.$toasted.show('Usunięto klienta.', {
                            type: 'success'
                        });

                        this.$router.push('/clients');
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
