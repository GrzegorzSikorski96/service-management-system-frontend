<template>
    <v-select
            :items="ticketStatuses"
            :rules="rules.ticket_status_id.required"
            label="Status zgłoszenia"
            v-model="ticketStatusId"
            item-text="name"
            item-value="id"
            :disabled="disabled()"
    />
</template>

<script>
    export default {
        name: 'TicketStatusesSelect',
        props: {
            ticket: {},
        },
        data: () => ({
            ticketStatuses: [],
            ticketStatusId: {},
            rules: {
                ticket_status_id: {
                    required: [
                        v => !!v || 'Status zgłoszenia jest wymagany.',
                    ],
                }
            },
        }),
        methods: {
            fetchTicketStatuses() {
                this.$http.get(`/api/ticket/${this.ticket.id}/statuses`).then((response) => {
                    this.ticketStatuses = response.data.data.ticket_statuses;
                });
            },
            changeTicketStatus() {
                this.$http.put(`/api/ticket/${this.ticket.id}/status/${this.ticketStatusId}`).then((response) => {
                    this.ticketStatuses = response.data.data.ticket_statuses;
                });
            },
            disabled() {
                let disabledFor = ['zakończone', 'anulowane'];

                return disabledFor.includes(this.ticket.ticket_status.name);
            }
        },
        created() {
            this.ticketStatusId = this.ticket.ticket_status_id;
            this.fetchTicketStatuses();

            this.$watch('ticketStatusId', (value) => {
                this.changeTicketStatus();
                this.$emit('input', value)
            })
        },
        watch: {
            ticket: function (newValue, oldValue) {
                if (newValue.ticket_status_id !== oldValue.ticket_status_id) {
                    this.fetchTicketStatuses();
                }
            },
        },
    }
</script>

<style>

</style>