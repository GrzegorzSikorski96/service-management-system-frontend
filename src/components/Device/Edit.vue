<template>
    <v-card class="ma-3 pa-1" :elevation="5">
        <span v-if="!loading">
            <v-card-title>
                Edycja urządzenia

                <v-spacer/>

                <v-btn color="green" :disabled="!valid" icon @click="updateDevice">
                    <font-awesome-icon icon="save" size="lg"/>
                </v-btn>

                <v-btn color="red" icon @click="changeEditState">
                    <font-awesome-icon icon="times" size="lg"/>
                </v-btn>
            </v-card-title>

            <v-card-text>
                <device-form :device="device" ref="editForm" :edit="true" @valid="checkValid"/>
            </v-card-text>
        </span>

        <loading v-else/>
    </v-card>
</template>

<script>
    import DeviceForm from "./Forms/Form";
    import Loading from "./../Helpers/Loading"

    export default {
        name: 'Edit',
        data: () => ({
            valid: false,
        }),
        props: {
            device: {},
            loading: {},
        },
        components: {
            DeviceForm,
            Loading
        },
        methods: {
            async updateDevice() {
                this.$http.put('/api/device', this.$refs.editForm.credentials)
                    .then(() => {
                        this.$toasted.show('Zedytowano Urządzenie', {
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
                return this.$router.currentRoute.name === 'Device'
            },
        },
    }
</script>

<style>
    a {
        text-decoration: none;
    }
</style>
