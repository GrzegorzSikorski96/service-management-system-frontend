<template>
    <v-card class="ma-3 pa-1" :elevation="5">
        <span v-if="!loading">
            <v-card-title>
                Edycja serwisu

                <v-spacer/>

                <v-btn color="green" :disabled="!valid" icon @click="updateService">
                    <font-awesome-icon icon="save" size="lg"/>
                </v-btn>

                <v-btn color="red" icon @click="changeEditState">
                    <font-awesome-icon icon="times" size="lg"/>
                </v-btn>
            </v-card-title>

            <v-card-text>
                <service-form :service="service" :edit="true" ref="editForm" @valid="checkValid"/>
            </v-card-text>
        </span>

        <loading v-else/>
    </v-card>
</template>

<script>
    import ServiceForm from "./Form";
    import Loading from "./../Helpers/Loading"

    export default {
        name: 'ServiceEdit',
        props: {
            service: {},
            loading: {},
        },
        components: {
            ServiceForm,
            Loading
        },
        data: () => ({
            valid: false,
        }),
        methods: {
            async updateService() {
                this.$http.put('/api/service', this.$refs.editForm.credentials)
                    .then(() => {
                        this.$toasted.show('Zedytowano serwis', {
                            type: 'success'
                        });

                        this.changeEditState();
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
