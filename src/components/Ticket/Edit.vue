<template>
    <v-card class="ma-3 pa-1" :elevation="5">
        <span v-if="!loading">
            <v-card-title>
                Edycja Zgłoszenia

                <v-spacer></v-spacer>

                <v-btn color="green" :disabled="!valid" icon @click="updateTicket">
                    <font-awesome-icon icon="save" size="lg"/>
                </v-btn>

                <v-btn color="red" icon @click="changeEditState">
                    <font-awesome-icon icon="times" size="lg"/>
                </v-btn>
            </v-card-title>

            <v-card-text>
                <ticket-form :ticket="ticket" :edit="true" ref="editForm" @valid="checkValid"></ticket-form>
            </v-card-text>
        </span>

        <loading v-else/>
    </v-card>
</template>

<script>
    import TicketForm from "./Form";
    import Loading from "./../Helpers/Loading"

    export default {
        name: 'TicketEdit',
        data: () => ({
            valid: false,
        }),
        props: {
            ticket: {},
            loading: {},
        },
        components: {
            TicketForm,
            Loading
        },
        methods: {
            async updateTicket() {
                this.$http.put('/api/ticket', this.$refs.editForm.credentials)
                    .then(() => {
                        this.$toasted.show('Zedytowano zgłoszenie', {
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
    }
</script>

<style>
</style>
