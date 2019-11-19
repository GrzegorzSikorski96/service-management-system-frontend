<template>
    <span>
        <v-card-text>
            <check-exist-form ref="checkExistForm" @valid="checkValid"></check-exist-form>
        </v-card-text>
        <v-card-actions>
            <v-btn
                    text
                    class="mx-auto font-weight-bold"
                    @click="addClientByNumber"
                    :disabled="!valid"
            >
                Dodaj klienta
            </v-btn>
        </v-card-actions>
    </span>

</template>

<script>
    import CheckExistForm from "./CheckExistForm"

    export default {
        name: 'CheckExist',
        components: {
            CheckExistForm,
        },
        data: () => ({
            valid: false,
        }),
        methods: {
            async addClientByNumber() {
                this.$http.post('/api/client/number', this.$refs.checkExistForm.credentials)
                    .then(() => {
                        this.$toasted.show('Dodano klienta do oddziału', {
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
