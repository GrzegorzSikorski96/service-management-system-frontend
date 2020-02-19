<template>
    <span>
        <v-menu bottom left v-if="isManager() && currentUser.id !== user.id">
            <template v-slot:activator="{ on }">
                <v-btn
                        icon
                        v-on="on"
                >
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </template>

            <v-list>
                <v-list-item v-if="!user.blocked_at" @click="blockUser = true">
                    <v-list-item-title>Zablokuj</v-list-item-title>
                </v-list-item>

                <v-list-item v-else @click="unblockUser = true">
                    <v-list-item-title>Odblokuj</v-list-item-title>
                </v-list-item>

                <v-list-item @click="removeUser = true">
                    <v-list-item-title class="red--text">Usuń</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>

        <remove-user-dialog :modal="removeUser" :user="user" @modal="removeDialog"/>
        <block-user-dialog :modal="blockUser" :user="user" @modal="blockDialog"/>
        <unblock-user-dialog :modal="unblockUser" :user="user" @modal="unblockDialog"/>
    </span>
</template>

<script>
    import RemoveUserDialog from "./Remove"
    import BlockUserDialog from "./Block"
    import UnblockUserDialog from "./Unblock"

    export default {
        name: 'UserManagement',
        props: {
            user: {},
        },
        components: {
            RemoveUserDialog,
            BlockUserDialog,
            UnblockUserDialog
        },
        data: () => ({
            removeUser: false,
            blockUser: false,
            unblockUser: false,
        }),
        methods: {
            closeDialog() {
                this.$emit('modal', false)
            },
            removeDialog(value) {
                this.removeUser = value
            },
            blockDialog(value) {
                this.blockUser = value
            },
            unblockDialog(value) {
                this.unblockUser = value
            },
        }
    }
</script>

<style>
</style>
