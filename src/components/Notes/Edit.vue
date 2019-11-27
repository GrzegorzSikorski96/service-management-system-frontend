<template>
    <v-card>
        <v-card-title class="subtitle-2" dense>
            Edytuj notatkę

            <v-spacer></v-spacer>

            <v-btn color="green" :disabled="!valid" icon @click="editNote">
                <font-awesome-icon icon="save" size="lg"/>
            </v-btn>

            <v-btn color="red" icon @click="changeEditState">
                <font-awesome-icon icon="times" size="lg"/>
            </v-btn>
        </v-card-title>

        <v-card-text class="white text--primary">
            <edit-form :ticket_id="currentUser.id" :note="note" ref="editForm" @valid="checkValid"/>
        </v-card-text>
    </v-card>
</template>

<script>
    import EditForm from "./Form"

    export default {
        name: 'Notes',
        components:{
          EditForm
        },
        data: () => ({
            valid: false,
        }),
        props: {
            note: {},
        },
        methods: {
            async editNote() {
                this.$http.put('/api/note', this.$refs.editForm.credentials)
                    .then(() => {
                        this.$toasted.show('Zedytowano zgłoszenie', {
                            type: 'success'
                        });
                    })
            },
            changeEditState() {
                this.$emit('editCard', false)
            },
            checkValid(value) {
                this.valid = value
            }
        },
    }
</script>

<style>
</style>
