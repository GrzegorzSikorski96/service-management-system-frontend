<template>
    <v-container fluid fill-height>
        <v-row>
            <v-card
                    class="col-8 mx-auto"
                    raised
                    shaped
            >
                <v-card-text>
                    <p class="display-1 text--primary">Tworzenie użytkownika</p>

                    <user-form ref="createForm" @valid="checkValid"></user-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn
                            text
                            class="mx-auto font-weight-bold"
                            @click="createUser"
                            :disabled="!valid"
                    >
                        Dodaj użytkownika
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
    import UserForm from "./Form"

    export default {
        name: 'UserCreate',
        data: () => ({
            valid: false,
        }),
        components:{
            UserForm
        },
        methods: {
            async createUser() {
                this.$http.post('/api/user', this.$refs.createForm.credentials)
                    .then(() => {
                        this.$toasted.show('Utworzono uzytkownika', {
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
            },
            isAdmin() {
                return this.$store.state.currentUser.role.name === 'administrator';
            },
        },
    }
</script>

<style>

</style>
