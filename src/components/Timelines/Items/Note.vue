<template>
    <v-timeline-item
            color="green lighten-2"
            icon="assignment"
    >
        <note v-if="!editNote" :note="note" @editCard="noteEdit"/>
        <note-edit v-else :note="note" @editCard="noteEdit"></note-edit>
    </v-timeline-item>
</template>

<script>
    import Note from "../../Notes/Note"
    import NoteEdit from "../../Notes/Edit"

    export default {
        name: 'Notes',
        data: () => ({
            editNote: false,
        }),
        props: {
            note: {},
        },
        components: {
            Note,
            NoteEdit
        },
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
