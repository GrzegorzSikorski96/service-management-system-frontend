<template>
    <span>
        <v-menu bottom left>
            <template v-slot:activator="{ on }">
                <v-btn
                        icon
                        v-on="on"
                >
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </template>

            <v-list>
                <v-list-item @click="generateDocuments = true">
                    <v-list-item-title>Wygeneruj dokumenty</v-list-item-title>
                </v-list-item>

                <v-list-item @click="removeTicket = true">
                    <v-list-item-title class="red--text">Usuń</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>

        <remove-ticket-dialog :modal="removeTicket" :ticket="ticket" @modal="removeDialog"/>
        <generate-documents-dialog :modal="generateDocuments" :ticket="ticket" @modal="generateDocumentsDialog"/>
    </span>
</template>

<script>
    import RemoveTicketDialog from "./Remove"
    import GenerateDocumentsDialog from "./GenerateDocuments"

    export default {
        name: 'ClientManagement',
        props: {
            ticket: {},
        },
        components: {
            RemoveTicketDialog,
            GenerateDocumentsDialog
        },
        data: () => ({
            removeTicket: false,
            generateDocuments: false,
        }),
        methods: {
            closeDialog() {
                this.$emit('modal', false)
            },
            removeDialog(value) {
                this.removeTicket = value
            },
            generateDocumentsDialog(value) {
                this.generateDocuments = value
            },
        }
    }
</script>

<style>
</style>
