<template>
    <v-dialog v-model="modal" max-width="500px" @click:outside="closeDialog()">
        <v-card>
            <v-card-title>
                Generowanie dokumentów dla zgłoszenia {{ ticket.token }}
            </v-card-title>

            <v-card-text>
                <v-btn text block @click="generateCreationDocument">Dokument utworzenia zgłoszenia</v-btn>
                <v-btn text block>Dokument rezygnacji ze zgłoszenia</v-btn>
                <v-btn text block>Dokument zakończenia zgłoszenia (odbioru)
                </v-btn>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="darken-1" text @click="closeDialog()">Anuluj</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: 'GenerateDocumentDialog',
        props: {
            modal: {},
            ticket: {},
        },
        methods: {
            generateCreationDocument() {
                this.$http.get(`/api/document/${this.ticket.id}/creation`).then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'file.pdf'); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                });
            },
            closeDialog() {
                this.$emit('modal', false)
            },
        },
    }
</script>

<style>
</style>
