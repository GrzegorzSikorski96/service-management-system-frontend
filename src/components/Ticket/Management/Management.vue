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
                <v-list-item @click="removeTicket = true">
                    <v-list-item-title class="red--text">Usuń</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>

        <remove-ticket-dialog :modal="removeTicket" :ticket="ticket"
                              @modal="removeDialog"></remove-ticket-dialog>
    </span>
</template>

<script>
    import RemoveTicketDialog from "./Remove"

    export default {
        name: 'ClientManagement',
        components: {
            RemoveTicketDialog,
        },
        data: () => ({
            removeTicket: false,
        }),
        props: {
            ticket: {},
        },
        methods: {
            closeDialog() {
                this.$emit('modal', false)
            },
            removeDialog(value) {
                this.removeTicket = value
            },
        }
    }
</script>

<style>
</style>
