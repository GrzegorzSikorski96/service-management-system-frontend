<template>
    <v-dialog v-model="modal" max-width="500px" @click:outside="closeDialog()">
        <v-card>
            <v-card-title>
                Generowanie dokumentów
            </v-card-title>

            <v-card-text>
                <v-btn text block @click="generateCreationDocument('creation')">
                    Dokument utworzenia zgłoszenia
                </v-btn>

                <v-btn text block @click="generateCreationDocument('resignation')">
                    Dokument rezygnacji ze zgłoszenia
                </v-btn>

                <v-btn text block @click="generateCreationDocument('returning')">Dokument zakończenia zgłoszenia
                    (odbioru)
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
        data: () => ({
            url: {},
        }),
        methods: {
            generateCreationDocument(type) {
                let filename;

                switch (type) {
                    case 'creation':
                        filename = 'utworzenia';
                        break;
                    case 'resignation':
                        filename = 'rezygnacji';
                        break;
                    case 'returning':
                        filename = 'zakonczenia'
                        break;
                    default:
                        filename = 'zgloszenie'
                }

                this.$http.get(`/api/document/${this.ticket.id}/${type}`, {responseType: 'blob'}).then((response) => {
                    this.downloadDocument(response, `potwierdzenie_${filename}-${this.ticket.token}`)
                });
            },
            downloadDocument(response, filename) {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${filename}.pdf`); //or any other extension
                document.body.appendChild(link);
                link.click();
            },
            closeDialog() {
                this.$emit('modal', false)
            },
        },
    }
</script>

<style>
</style>
