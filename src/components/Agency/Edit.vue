<template>
    <v-card class="ma-3 pa-1" :elevation="5">
        <span v-if="!loading">
            <v-card-title>
                Edycja Oddziału

                <v-spacer></v-spacer>

                <v-btn color="green" :disabled="!valid" icon @click="updateAgency">
                    <font-awesome-icon icon="save" size="lg"/>
                </v-btn>

                <v-btn color="red" icon @click="changeEditState">
                    <font-awesome-icon icon="times" size="lg"/>
                </v-btn>
            </v-card-title>

            <v-card-text>
                <agency-form :agency="agency" :edit="true" ref="editForm" @valid="checkValid"></agency-form>
            </v-card-text>
        </span>

        <v-progress-circular v-else
                             class="mx-auto"
                             :size="80"
                             indeterminate
                             color="primary"
        ></v-progress-circular>
    </v-card>
</template>

<script>
    import AgencyForm from "./Form";

    export default {
        name: 'AgencyEdit',
        data: () => ({
            valid: false,
        }),
        props: {
            agency: {},
            loading: {},
        },
        components: {
            AgencyForm
        },
        methods: {
            async updateAgency() {
                this.$http.put('/api/agency', this.$refs.editForm.credentials)
                    .then(() => {
                        this.$toasted.show('Zedytowano oddział', {
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
