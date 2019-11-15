<template>
    <v-container fluid>
        <v-row class="col-12">
            <v-col class="col-12">
                <v-card class="ma-3" :elevation="5">
                    <v-card-title>
                        Informacje o zgłoszeniu: {{ ticket.token }}
                    </v-card-title>
                </v-card>
            </v-col>

            <v-col class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                <device-details :device="ticket.device" :loading="loading"></device-details>

                <client-details v-if="!editClient" :client="ticket.client" :loading="loading"
                                @editCard="clientEdit"></client-details>
                <client-edit v-else :client="ticket.client" @editCard="clientEdit"></client-edit>
            </v-col>

            <v-col class="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                <timeline :loading="loading" title="Notatki" :itemsCount="notesLength">
                    <note v-for="note in ticket.notes" :key="note.id" :note="note"></note>
                </timeline>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import DeviceDetails from "../Device/Details";
    import ClientDetails from "../Client/Details";
    import Timeline from "../Timelines/Timeline";
    import Note from "../Timelines/Items/Note";
    import ClientEdit from "../Client/Edit";

    export default {
        name: 'Ticket',
        data: () => ({
            ticket: [],
            editClient: false,
            loading: true,
        }),
        components: {
            ClientDetails,
            DeviceDetails,
            Timeline,
            Note,
            ClientEdit,
        },
        methods: {
            fetchData() {
                this.$http.get(`/api/ticket/${this.$route.params.id}`).then((response) => {
                    this.ticket = response.data.data.ticket;
                    this.loading = false;
                });
            },
            clientEdit(value) {
                this.editClient = value
            },
        },
        created() {
            this.fetchData()
        },
        computed: {
            notesLength() {
                if ('notes' in this.ticket) {
                    return this.ticket.notes.length;
                } else {
                    return 0;
                }
            },
        }
    }
</script>

<style>
</style>
