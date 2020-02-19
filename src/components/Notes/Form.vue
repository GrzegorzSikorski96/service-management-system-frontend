<template>
    <v-form v-model="valid">
        <v-text-field
                v-model="credentials.content"
                hide-details
                label="Treść notatki"
                :rules="rules.note.content"
                rows="1"
                class="mb-2"/>
    </v-form>
</template>

<script>
    export default {
        name: 'NoteForm',
        props: {
            note: {},
            edit: {},
            ticket_id: {},
            author_id: {},
        },
        data: () => ({
            valid: false,
            credentials: {
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
            parseFormData() {
                this.credentials = JSON.parse(JSON.stringify(this.note))
            },
            init() {
                if (this.note) {
                    this.parseFormData();
                } else {
                    this.credentials.ticket_id = this.ticket_id;
                    this.credentials.author_id = this.currentUser.id;
                }
            }
        },
        created() {
            this.init();
        },
        watch: {
            valid: function (value) {
                this.$emit('valid', value)
            },
        },
    }
</script>

<style>

</style>
