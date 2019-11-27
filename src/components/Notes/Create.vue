<template>
    <span>
        <note-form ref="createForm" :ticket_id="ticket_id" @valid="checkValid"></note-form>

        <v-btn block class="mb-3" :disabled="!valid" @click="addNote()">
            Dodaj notatkę
        </v-btn>
    </span>
</template>

<script>
    import NoteForm from "./Form"

    export default {
        name: 'NoteCreate',
        props:{
          ticket_id: {}
        },
        data: () => ({
            valid: false,
        }),
        components: {
            NoteForm
        },
        methods: {
            async addNote() {
                this.$http.post('/api/note', this.$refs.createForm.credentials)
                    .then(() => {
                        this.$toasted.show('Dodano notatkę.', {
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
