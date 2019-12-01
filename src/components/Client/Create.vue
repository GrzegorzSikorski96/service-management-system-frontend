<template>
    <v-container fluid>
        <v-row>
            <v-col class="col-12">
                <v-card class="ma-3" :elevation="5">
                    <v-card-title>
                        Tworzenie klienta
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
                            Nowy klient
                            <font-awesome-icon icon="plus" size="lg"/>
                        </v-tab>

                        <v-tab href="#check">
                            Istniejący
                            <font-awesome-icon icon="search-plus" size="lg"/>
                        </v-tab>
                    </v-tabs>

                    <v-tabs-items v-model="tab">
                        <v-tab-item value="check">
                            <check-exist/>
                        </v-tab-item>

                        <v-tab-item value="create">
                            <v-card-text>
                                <client-form ref="createForm" @valid="checkValid"/>
                            </v-card-text>

                            <v-card-actions>
                                <v-btn
                                        text
                                        class="mx-auto font-weight-bold"
                                        @click="createClient"
                                        :disabled="!valid"
                                >
                                    Dodaj klienta
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
    import ClientForm from "./Forms/Form"
    import CheckExist from "./Forms/CheckExist"

    export default {
        name: 'ClientCreate',
        components: {
            ClientForm,
            CheckExist
        },
        data: () => ({
            valid: false,
            tab: null,
        }),
        methods: {
            async createClient() {
                this.$http.post('/api/client', this.$refs.createForm.credentials)
                    .then(() => {
                        this.$toasted.show('Utworzono klienta', {
                            type: 'success'
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
