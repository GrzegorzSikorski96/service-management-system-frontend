<template>
    <v-timeline-item
            color="green lighten-2"
            icon="assignment"
    >
        <note v-if="!editNote" :note="note" @editCard="noteEdit"/>
        <note-edit v-else :note="note" @editCard="noteEdit"/>
    </v-timeline-item>
</template>

<script>
    import Note from "../../Notes/Note"
    import NoteEdit from "../../Notes/Edit"

    export default {
        name: 'Notes',
        props: {
            note: {},
        },
        components: {
            Note,
            NoteEdit
        },
        data: () => ({
            editNote: false,
        }),
        methods: {
            noteEdit(value) {
                this.editNote = value
            },
        },
        computed: {
            checkRoute() {
                return this.$router.currentRoute.name === 'UserSummary'
            }
        },
    }
</script>

<style>
</style>
