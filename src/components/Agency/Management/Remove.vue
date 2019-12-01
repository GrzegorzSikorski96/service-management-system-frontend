<template>
    <v-dialog v-model="modal" max-width="500px" @click:outside="closeDialog()">
        <v-card>
            <v-card-title>
                Usuń oddział {{ agency.name }}
            </v-card-title>

            <v-card-text>
                Czy napewno chcesz usunąć oddział <strong>{{ agency.name }}</strong> jego elementy:
                <ul>
                    <li>
                        Zgłoszenia
                    </li>
                    <li>
                        Notatki
                    </li>
                    <li>
                        Klienci
                    </li>
                    <li>
                        Urządzenia
                    </li>
                    <li>
                        Użytkownicy
                    </li>
                </ul>

                <br>

                <span class="mt-2">Abu usunąć oddział wpisz: </span>

                <br>

                <span class="font-weight-bold">{{agency.name}}, {{agency.address}}</span>

                <br>

                <v-text-field
                        v-model="confirmation"
                        label="Przepisz tekst"
                        required onCopy="return false" onDrag="return false" onDrop="return false"
                        onPaste="return false" autocomplete=off
                />

                <span class="error--text font-weight-bold text-uppercase mx-auto">Usuniętych elementów nie można przywrócić</span>

            </v-card-text>

            <v-card-actions>
                <v-spacer/>
                <v-btn v-if="valid" color="red darken-1" text @click="removeAgency()">Usuń</v-btn>
                <v-btn color="darken-1" text @click="closeDialog()">Anuluj</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: 'RemoveAgencyDialog',
        props: {
            modal: {},
            agency: {},
        },
        data: () => ({
            confirmation: '',
        }),
        methods: {
            removeAgency() {
                this.$http.delete(`/api/agency/${this.agency.id}`)
                    .then(() => {
                        this.$toasted.show('Usunięto oddział', {
                            type: 'success'
                        });

                        this.$router.push('/agencies');
                    })
            },
            closeDialog() {
                this.confirmation = '';
                this.$emit('modal', false)
            },
        },
        computed: {
            valid() {
                return (this.agency.name + ', ' + this.agency.address).replace(/\n/g, ' ') === this.confirmation;
            }
        },
    }
</script>

<style>
</style>
