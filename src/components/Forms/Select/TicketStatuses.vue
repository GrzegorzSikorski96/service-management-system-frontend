<template>
    <v-select
            :items="ticketStatuses"
            :rules="rules.ticket_status_id.required"
            label="Status zgłoszenia"
            v-model="ticketStatusId"
            item-text="name"
            item-value="id"
    ></v-select>
</template>

<script>
    export default {
        name: 'TicketStatusesSelect',
        props: {
            ticket_status_id: {
                default: null,
            },
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
            async fetchTicketStatuses() {
                this.$http.get(`/api/ticketStatuses`).then((response) => {
                    this.ticketStatuses = response.data.data.ticket_statuses;
                    this.setTicketStatusId(this.ticket_status_id);
                });
            },
            setTicketStatusId(value) {
                this.ticketStatusId = value;
            }
        },
        created() {
            this.fetchTicketStatuses();
        },
        watch: {
            ticketStatusId: function (value) {
                this.setTicketStatusId(value);
                this.$emit('input', this.ticketStatusId)
            },
        },
    }
</script>

<style>

</style>