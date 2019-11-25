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
                <v-list-item @click="removeDevice = true">
                    <v-list-item-title class="red--text">Usuń</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>

        <remove-device-dialog :modal="removeDevice" :device="device"
                              @modal="removeDialog"></remove-device-dialog>
    </span>
</template>

<script>
    import RemoveDeviceDialog from "./Remove"

    export default {
        name: 'DeviceManagement',
        components: {
            RemoveDeviceDialog,
        },
        data: () => ({
            removeDevice: false,
        }),
        props: {
            device: {},
        },
        methods: {
            closeDialog() {
                this.$emit('modal', false)
            },
            removeDialog(value) {
                this.removeDevice = value
            },
        }
    }
</script>

<style>
</style>
