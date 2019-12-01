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
                <v-list-item @click="removeClient = true">
                    <v-list-item-title class="red--text">Usuń</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>

        <remove-client-dialog :modal="removeClient" :client="client" @modal="removeDialog"/>
    </span>
</template>

<script>
    import RemoveClientDialog from "./Remove"

    export default {
        name: 'ClientManagement',
        props: {
            client: {},
        },
        components: {
            RemoveClientDialog,
        },
        data: () => ({
            removeClient: false,
        }),
        methods: {
            closeDialog() {
                this.$emit('modal', false)
            },
            removeDialog(value) {
                this.removeClient = value
            },
        }
    }
</script>

<style>
</style>
