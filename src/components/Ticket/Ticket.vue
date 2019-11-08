<template>
    <v-container fluid>

        <v-row class="col-12">
            <v-col class="col-12">
                <v-card class="ma-3">
                    <v-card-title>
                        Informacje o zgłoszeniu: {{ ticket.token }}
                    </v-card-title>
                </v-card>
            </v-col>

            <v-col class="col-4">
                <device-details :device="ticket.device" :loading="loading"></device-details>
                <client-details :client="ticket.client" :loading="loading"></client-details>
            </v-col>

            <v-col class="col-8">
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

    export default {
        name: 'Ticket',
        data: () => ({
            ticket: [],
            loading: true,
        }),
        components: {
            ClientDetails,
            DeviceDetails,
            Timeline,
            Note,
        },
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
        computed: {
            notesLength() {
                if('notes' in this.ticket){
                    return this.ticket.notes.length;
                } else {
                    return 0;
                }
            }
        }
    }
</script>

<style>
</style>
