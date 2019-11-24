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
                <ticket :ticket="ticket" :loading="loading"></ticket>
                <device :device="ticket.device" :loading="loading"></device>
                <client :client="ticket.client" :loading="loading"></client>
            </v-col>

            <v-col class="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                <timeline :loading="loading" title="Notatki" :itemsCount="notesLength">

                    <template v-slot:createForm>
                        <notes-create :ticket_id="ticket.id"></notes-create>
                    </template>

                    <note v-for="note in ticket.notes" :key="note.id"
                          :note="note"></note>
                </timeline>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import Device from "../Device/Device";
    import Timeline from "../Timelines/Timeline";
    import Note from "../Timelines/Items/Note";
    import Client from "../Client/Client";
    import Ticket from "../Ticket/Ticket"
    import NotesCreate from "../Notes/Create"

    export default {
        name: 'TicketSummary',
        data: () => ({
            ticket: [],
            editTicket: false,
            loading: true,
            note: {
                credentials: {},
            }
        }),
        components: {
            Device,
            Client,
            Timeline,
            Note,
            Ticket,
            NotesCreate,
        },
        methods: {
            fetchData() {
                this.$http.get(`/api/ticket/${this.$route.params.id}`).then((response) => {
                    this.ticket = response.data.data.ticket;
                    this.loading = false;
                    this.loadDefault();
                });
            },
            ticketEdit(value) {
                this.editTicket = value
            },
            async addNote() {
                this.$http.post('/api/note', this.note.credentials)
                    .then(() => {
                        this.$toasted.show('Utworzono notatkę', {
                            type: 'success'
                        });
                    })
            },
            loadDefault() {
                this.note.credentials.ticket_id = this.ticket.id
            },
        },
        created() {
            this.fetchData();
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
