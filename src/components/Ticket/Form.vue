<template>
    <v-form v-model="valid">
        <v-text-field
                v-model="credentials.description"
                :rules="rules.ticket.description"
                label="Opis zgłoszenia"
                required
        ></v-text-field>

        <v-text-field
                v-model="credentials.additional_information"
                label="Dodatkowe informacje"
                required
        ></v-text-field>

        <template v-if="!edit">
            <agencies-autocomplete v-if="isAdmin()" v-model="agency_id"/>

            <clients-autocomplete v-model="credentials.client_id" :agency_id="agency_id"/>

            <devices-autocomplete v-model="credentials.device_id" :agency_id="agency_id"/>
        </template>

        <template v-if="edit">
            <v-text-field
                    v-model="credentials.message"
                    label="Wiadomość zwrotna."
            ></v-text-field>
        </template>

        <ticket-statuses-select v-model="credentials.ticket_status_id"
                                :ticket_status_id="credentials.ticket_status_id"/>

    </v-form>
</template>

<script>
    import AgenciesAutocomplete from "../Forms/Autocomplete/Agencies";
    import DevicesAutocomplete from "../Forms/Autocomplete/Devices";
    import ClientsAutocomplete from "../Forms/Autocomplete/Clients";
    import TicketStatusesSelect from "../Forms/Select/TicketStatuses";

    export default {
        name: 'TicketForm',
        props: {
            ticket: {},
            edit: {},
        },
        components: {
            AgenciesAutocomplete,
            DevicesAutocomplete,
            ClientsAutocomplete,
            TicketStatusesSelect,
        },
        data: () => ({
            agency_id: null,
            valid: false,
            credentials: {
                description: '',
            },
            rules: {
                ticket: {
                    description: [
                        v => !!v || 'Opis jest wymagany.',
                    ],
                    client_id: [
                        v => !!v || 'Klient jest wymagany.',
                    ],
                    agency_id: [
                        v => !!v || 'Oddział jest wymagany.',
                    ],
                    device_id: [
                        v => !!v || 'Urządzenie jest wymagane.',
                    ],
                    ticket_status_id: [
                        v => !!v || 'Status zgłoszenia jest wymagany.',
                    ],
                }
            },
        }),
        methods: {
            parseFormData() {
                if (this.ticket) {
                    this.credentials = JSON.parse(JSON.stringify(this.ticket))
                }
            }
        },
        created() {
            this.parseFormData();
        },
        watch: {
            valid: function (value) {
                this.$emit('valid', value)
            },
        },
    }
</script>

<style>

</style>
