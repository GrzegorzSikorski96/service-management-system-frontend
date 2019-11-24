<template>
    <span>
        <v-form v-model="valid">
            <v-textarea
                    v-model="credentials.content"
                    hide-details
                    label="Dodaj notatkę.."
                    solo
                    :rules="rules.note.content"
                    rows="1"
                    class="mb-2"
            />
        </v-form>

        <v-btn block class="mb-3" :disabled="!valid" @click="addNote()">
            Dodaj notatkę
        </v-btn>
    </span>
</template>

<script>
    export default {
        name: 'NoteCreate',
        props: {
            ticket_id: {},
        },
        data: () => ({
            valid: false,
            credentials: {
                ticket_id: null,
                content: '',
            },
            rules: {
                note: {
                    content: [
                        v => !!v || 'Treść jest wymagana.',
                    ],
                }
            },
        }),
        methods: {
            async addNote() {
                this.$http.post('/api/note', this.credentials)
                    .then(() => {
                        this.$toasted.show('Dodano notatkę.', {
                            type: 'success'
                        });
                    })
            },
            setTicketId() {
                this.credentials.ticket_id = this.ticket_id
            }
        },
        created() {
            this.setTicketId();
        },
        watch: {
            ticket_id: function (value) {
                this.credentials.ticket_id = value
            },
        },
    }
</script>

<style>

</style>
