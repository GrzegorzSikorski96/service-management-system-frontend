<template>
    <v-dialog v-model="modal" max-width="500px" @click:outside="closeDialog()">
        <v-card>
            <v-card-title>
                Usuń użytkownika {{ user.name }} {{ user.surname }}
            </v-card-title>

            <v-card-text>
                Czy napewno chcesz usunąć użytkownika <strong>{{ user.name }} {{ user.surname }}</strong>oraz jego
                elementy:

                <ul>
                    <li>
                        Notatki
                    </li>
                </ul>

                <br>

                <span class="error--text font-weight-bold text-uppercase mx-auto">Usuniętych elementów nie można przywrócić</span>
            </v-card-text>

            <v-card-actions>
                <v-spacer/>
                <v-btn color="red darken-1" text @click="removeUser()">Usuń</v-btn>
                <v-btn color="darken-1" text @click="closeDialog()">Anuluj</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: 'RemoveUserDialog',
        props: {
            modal: {},
            user: {},
        },
        methods: {
            async removeUser() {
                this.$http.delete(`/api/user/${this.user.id}`)
                    .then(() => {
                        this.$toasted.show('Usunięto użytkownika.', {
                            type: 'success'
                        });

                        this.$router.push('/users');
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
