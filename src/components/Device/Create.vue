<template>
    <v-container fluid>
        <v-row>
            <v-col class="col-12">
                <v-card class="ma-3" :elevation="5">
                    <v-card-title>
                        Tworzenie urządzenia
                    </v-card-title>
                </v-card>
            </v-col>

            <v-col class="col-12">
                <v-card class="ma-3" elevation="5">
                    <v-tabs
                            v-model="tab"
                            centered
                            grow
                            icons-and-text
                            color="#202338"
                            background-color="transparent"
                    >
                        <v-tabs-slider></v-tabs-slider>

                        <v-tab href="#create">
                            Nowe urządzenie
                            <font-awesome-icon icon="plus" size="lg"/>
                        </v-tab>

                        <v-tab href="#check">
                            Istniejące
                            <font-awesome-icon icon="search-plus" size="lg"/>
                        </v-tab>
                    </v-tabs>

                    <v-tabs-items v-model="tab">
                        <v-tab-item value="check">
                            <check-exist></check-exist>
                        </v-tab-item>

                        <v-tab-item value="create">
                            <v-card-text>
                                <device-form ref="createForm" @valid="checkValid"></device-form>
                            </v-card-text>

                            <v-card-actions>
                                <v-btn
                                        text
                                        class="mx-auto font-weight-bold"
                                        @click="createDevice"
                                        :disabled="!valid"
                                >
                                    Dodaj urządzenie
                                </v-btn>
                            </v-card-actions>
                        </v-tab-item>
                    </v-tabs-items>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import DeviceForm from "./Forms/Form"
    import CheckExist from "./Forms/CheckExist";

    export default {
        name: 'ClientCreate',
        data: () => ({
            valid: false,
            tab: null,
        }),
        components: {
            CheckExist,
            DeviceForm
        },
        methods: {
            async createDevice() {
                this.$http.post('/api/device', this.$refs.createForm.credentials)
                    .then(() => {
                        this.$toasted.show('Utworzono urządzenie', {
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
