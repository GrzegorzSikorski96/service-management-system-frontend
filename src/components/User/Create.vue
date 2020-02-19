<template>
    <v-container fluid>
        <v-row>
            <v-col class="col-12">
                <v-card class="ma-3" :elevation="5">
                    <v-card-title>
                        Tworzenie użytkownika
                    </v-card-title>
                </v-card>
            </v-col>

            <v-col class="col-12">
                <v-card class="ma-3" elevation="5">
                    <v-card-text>
                        <user-form ref="createForm" @valid="checkValid"/>
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
            </v-col>
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
        components: {
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
        },
    }
</script>

<style>

</style>
