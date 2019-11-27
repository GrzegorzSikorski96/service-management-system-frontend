<template>
    <v-card class="ma-3 pa-1" :elevation="5">

        <span v-if="!loading">
        <v-card-title>
            Edycja klienta

            <v-spacer></v-spacer>

            <v-btn color="green" :disabled="!valid" icon @click="updateClient">
                <font-awesome-icon icon="save" size="lg"/>
            </v-btn>

            <v-btn color="red" icon @click="changeEditState">
                <font-awesome-icon icon="times" size="lg"/>
            </v-btn>
        </v-card-title>

        <v-card-text>
            <client-form :client="client" ref="editForm" @valid="checkValid" :edit="true"></client-form>
        </v-card-text>
        </span>
        <loading v-else/>
    </v-card>
</template>

<script>
    import ClientForm from "./Forms/Form";
    import Loading from "../Helpers/Loading"

    export default {
        name: 'ClientEdit',
        data: () => ({
            valid: false,
        }),
        props: {
            client: {},
            loading: {},
        },
        components: {
            ClientForm,
            Loading
        },
        methods: {
            async updateClient() {
                this.$http.put('/api/client', this.$refs.editForm.credentials)
                    .then(() => {
                        this.$toasted.show('Zedytowano Klienta', {
                            type: 'success'
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
                return this.$router.currentRoute.name === 'Client'
            },
        },
    }
</script>

<style>
    a {
        text-decoration: none;
    }
</style>
