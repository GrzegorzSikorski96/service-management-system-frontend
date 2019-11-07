<template>
    <v-container fluid>
        <v-row v-if="!loading">
            <v-col class="col-4">
                <v-card class="ma-3 pa-1">
                    <v-card-title>
                        Dane urządzenia
                        <v-spacer>
                        </v-spacer>

                        <span v-if="deviceEdit">
                            <v-btn icon @click="deviceEdit = false" :ripple="{ class: 'green--text' }">
                                <font-awesome-icon icon="save" size="lg"/>
                            </v-btn>
                            <v-btn icon @click="deviceEdit = false" :ripple="{ class: 'red--text' }">
                                <font-awesome-icon icon="times" class="red--text" size="lg"/>
                            </v-btn>
                        </span>

                        <span v-else>
                            <v-btn icon @click="deviceEdit = true" :ripple="{ class: 'green--text' }">
                                <font-awesome-icon icon="edit" size="lg"/>
                            </v-btn>
                        </span>


                    </v-card-title>

                    <v-card-text>
                        <span class="font-weight-bold">
                            Nazwa:
                        </span>
                        {{ ticket.device.name }}

                        <br>

                        <span class="font-weight-bold">
                            Numer seryjny:
                        </span>
                        {{ ticket.device.serial_number }}

                        <br>

                        <span class="font-weight-bold">
                            Opis:
                        </span>
                        {{ ticket.device.description }}
                    </v-card-text>
                </v-card>

                <v-card class="ma-3 pa-1">
                    <v-card-title>
                        Dane klienta

                        <v-spacer></v-spacer>

                        <v-btn icon>
                            <font-awesome-icon icon="user-edit" size="lg"/>
                        </v-btn>
                    </v-card-title>

                    <v-card-text>
                        <span class="font-weight-bold">
                            Nazwa:
                        </span>
                        {{ ticket.client.name }}

                        <br>

                        <span class="font-weight-bold">
                            Adres:
                        </span>
                        {{ ticket.client.address }}

                        <br>

                        <span class="font-weight-bold">
                            Email:
                        </span>
                        <a :href="'mailto:'+ticket.client.email">
                            {{ ticket.client.email }}
                        </a>

                        <br>

                        <span class="font-weight-bold">
                            Numer telefonu:
                        </span>
                        <a :href="'tel:'+ticket.client.phone_number">
                            {{ ticket.client.phone_number }}
                        </a>

                        <br>
                        <span class="font-weight-bold">
                            Opis:
                        </span>
                        {{ ticket.client.description }}
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col class="col-8">
                <v-card class="ma-3 pa-1">
                    <v-card-title>
                        Notatki
                    </v-card-title>

                    <v-card-text>
                        <v-timeline dense v-if="ticket.notes.length">
                            <v-timeline-item
                                    v-for="note in ticket.notes"
                                    :key="note.id"
                                    color="green lighten-2"
                                    icon="assignment"
                            >
                                <template>
                                    <span class="font-weight-bold">{{ note.author.name }} {{ note.author.surname }} </span>
                                </template>

                                <v-card class="elevation-2">
                                    <v-card-text class="text--primary">
                                        {{ note.content }}
                                    </v-card-text>

                                    <v-card-actions class="text--secondary">
                                        <v-spacer></v-spacer>
                                        {{ note.created_at }}
                                    </v-card-actions>
                                </v-card>
                            </v-timeline-item>
                        </v-timeline>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <v-progress-circular v-else
                             class="mx-auto my-auto"
                             :size="80"
                             indeterminate
                             color="primary"
        ></v-progress-circular>
    </v-container>
</template>

<script>
    export default {
        name: 'Ticket',
        data: () => ({
            ticket: [],
            panels: [],
            loading: true,
            userEdit: false,
            deviceEdit: false,
        }),
        methods: {
            async fetchData() {
                this.$http.get(`/api/ticket/${this.$route.params.id}`).then((response) => {
                    this.ticket = response.data.data.ticket;
                    this.loading = false;
                });
            },
        },
        created() {
            this.fetchData()
        },
    }
</script>

<style>
</style>
