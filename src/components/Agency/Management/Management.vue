<template>
    <span>
        <v-menu bottom left v-if="isAdmin()">
            <template v-slot:activator="{ on }">
                <v-btn
                        icon
                        v-on="on"
                >
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </template>

            <v-list>
                <v-list-item @click="removeAgency = true">
                    <v-list-item-title class="red--text">Usuń</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>

        <remove-agency-dialog :modal="removeAgency" :agency="agency" @modal="removeDialog"/>
    </span>
</template>

<script>
    import RemoveAgencyDialog from "./Remove"

    export default {
        name: 'AgencyManagement',
        props: {
            agency: {},
        },
        components: {
            RemoveAgencyDialog
        },
        data: () => ({
            removeAgency: false,
        }),
        methods: {
            closeDialog() {
                this.$emit('modal', false)
            },
            removeDialog(value) {
                this.removeAgency = value
            },
        }
    }
</script>

<style>
</style>
