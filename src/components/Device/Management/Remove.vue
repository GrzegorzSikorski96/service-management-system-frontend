<template>
    <v-dialog v-model="modal" max-width="500px" @click:outside="closeDialog()">
        <v-card>
            <v-card-title>
                Usuń urządzenie {{ device.name }}
            </v-card-title>

            <v-card-text>
                Czy napewno chcesz usunąć urządzenie <strong>{{ device.name }}</strong>oraz jego
                elementy:

                <ul>
                    <li>
                        Zgłoszenia
                    </li>
                </ul>

                <br>

                <span class="error--text font-weight-bold text-uppercase mx-auto">Usuniętych elementów nie można przywrócić</span>
            </v-card-text>

            <v-card-actions>
                <v-spacer/>
                <v-btn color="red darken-1" text @click="removeDevice()">Usuń</v-btn>
                <v-btn color="darken-1" text @click="closeDialog()">Anuluj</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: 'RemoveDeviceDialog',
        props: {
            modal: {},
            device: {},
        },
        methods: {
            async removeDevice() {
                this.$http.delete(`/api/device/${this.device.id}`)
                    .then(() => {
                        this.$toasted.show('Usunięto urządzenie.', {
                            type: 'success'
                        });

                        this.$router.push('/devices');
                    })
            },
            closeDialog() {
                this.$emit('modal', false)
            },
        },
    }
</script>

<style>
</style>
