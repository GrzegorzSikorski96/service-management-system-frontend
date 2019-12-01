<template>
    <v-container fluid>
        <v-row class="col-12">
            <v-col class="col-12">
                <v-card class="ma-3" :elevation="5">
                    <v-card-title>
                        Informacje o zgłoszeniu: {{ ticket.token }}

                        <v-spacer/>

                        <ticket-management :ticket="ticket"/>
                    </v-card-title>
                </v-card>
            </v-col>

            <v-col class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                <ticket :ticket="ticket" :loading="loading"/>
                <device :device="ticket.device" :loading="loading"/>
                <client :client="ticket.client" :loading="loading"/>
            </v-col>

            <v-col class="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                <timeline :loading="notesLoading" title="Notatki" :itemsCount="notesLength">

                    <template v-slot:createForm>
                        <notes-create :ticket_id="ticket.id"/>
                    </template>

                    <note v-for="note in notes.data" :key="note.id" :note="note"/>

                    <template v-slot:pagination>
                        <v-pagination
                                v-model="page"
                                :length="notes.last_page"
                                total-visible="7"
                                circle/>
                    </template>
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
    import TicketManagement from "./Management/Management"

    export default {
        name: 'TicketSummary',
        data: () => ({
            ticket: [],
            notes: [],
            notesLoading: true,
            page: 1,
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
            TicketManagement
        },
        methods: {
            init() {
                this.fetchTicket().then(() => {
                    this.getTicketNotes(1);
                    this.initPusher();
                });
            },
            async fetchTicket() {
                await this.$http.get(`/api/ticket/${this.$route.params.id}`).then((response) => {
                    this.ticket = response.data.data.ticket;
                    this.loading = false;
                    this.note.credentials.ticket_id = this.ticket.id;
                });
            },
            getTicketNotes(page) {
                this.$http.get(`/api/ticket/${this.$route.params.id}/notes?page=${page}`).then((response) => {
                    this.notes = response.data.data.notes;
                    this.notesLoading = false;
                });
            },
            addNote() {
                this.$http.post('/api/note', this.note.credentials)
                    .then(() => {
                        this.$toasted.show('Utworzono notatkę', {
                            type: 'success'
                        });
                    })
            },
            initPusher() {
                let ticket = this.$pusher.subscribe(`ticket-${this.ticket.id}`);
                let device = this.$pusher.subscribe(`device-${this.ticket.device.id}`);
                let client = this.$pusher.subscribe(`client-${this.ticket.client.id}`);

                device.bind('update', (data) => {
                    this.ticket.device = data.device;
                });

                client.bind('update', (data) => {
                    this.ticket.client = data.client;
                });

                ticket.bind('remove', () => {
                    this.$router.push('/tickets');
                });
                ticket.bind('update', this.fetchTicket);
                ticket.bind('notes', () => {
                    this.getTicketNotes(this.page);
                });
            },
        },
        created() {
            this.init();
        },
        computed: {
            notesLength() {
                if (this.notes.data) {
                    return this.notes.data.length;
                } else {
                    return 0;
                }
            },
        },
        watch: {
            page: function (value) {
                this.getTicketNotes(value);
            },
        },
    }
</script>

<style>
</style>
