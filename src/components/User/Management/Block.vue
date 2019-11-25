<template>
    <v-dialog v-model="modal" max-width="500px" @click:outside="closeDialog()">
        <v-card>
            <v-card-title>
                Zablokuj użytkownika {{ user.name }} {{ user.surname }}
            </v-card-title>

            <v-card-text>
                Czy napewno chcesz zablokować użytkownika <strong>{{ user.name }} {{ user.surname }}</strong>?
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="blockUser()">Zablokuj</v-btn>
                <v-btn color="darken-1" text @click="closeDialog()">Anuluj</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: 'RemoveUserDialog',
        props: {
            modal: {
                default: {},
            },
            user: {},
        },
        methods: {
            async blockUser() {
                this.$http.post(`/api/user/${this.user.id}/block`)
                    .then(() => {
                        this.$toasted.show('Zablokowano użytkownika.', {
                            type: 'success'
                        });
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
