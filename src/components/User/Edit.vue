<template>
    <v-card class="ma-3 pa-1" :elevation="5">
        <span v-if="!loading">
            <v-card-title>
                Edycja użytkownika

                <v-spacer></v-spacer>

                <v-btn color="green" :disabled="!valid" icon @click="updateUser">
                    <font-awesome-icon icon="save" size="lg"/>
                </v-btn>

                <v-btn color="red" icon @click="changeEditState">
                    <font-awesome-icon icon="times" size="lg"/>
                </v-btn>
            </v-card-title>

            <v-card-text>
                <user-form :user="user" ref="editForm" :edit="true"></user-form>
            </v-card-text>
        </span>

        <loading v-else/>
    </v-card>
</template>

<script>
    import UserForm from "./Form";
    import Loading from "./../Helpers/Loading"

    export default {
        name: 'UserEdit',
        data: () => ({
            valid: false,
        }),
        props: {
            user: {},
            loading: {},
        },
        components: {
            UserForm,
            Loading
        },
        methods: {
            async updateUser() {
                this.$http.put('/api/user', this.$refs.editForm.credentials)
                    .then(() => {
                        this.$toasted.show('Zedytowano Użytkownika', {
                            type: 'success'
                        });
                    })
                    .catch(() => {
                        this.$toasted.show('Nie udało się utworzyć zgłoszenia', {
                            type: 'error'
                        });
                    })
            },
            changeEditState() {
                this.$emit('editCard', false)
            },
            checkValid(value) {
                this.valid = value
            }
        },
        computed: {
            checkRoute() {
                return this.$router.currentRoute.name === 'User'
            },
        },
    }
</script>

<style>
    a {
        text-decoration: none;
    }
</style>
