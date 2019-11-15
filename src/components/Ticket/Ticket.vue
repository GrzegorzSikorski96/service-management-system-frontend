<template>
    <span>
        <ticket-details v-if="!editTicket" :ticket="ticket" :loading="loading"
                        @editCard="ticketEdit"></ticket-details>
        <ticket-edit v-else :ticket="ticket" @editCard="ticketEdit"></ticket-edit>
    </span>
</template>

<script>
    import TicketDetails from "./Details"
    import TicketEdit from "./Edit"

    export default {
        name: 'Client',
        data: () => ({
            editTicket: false,
        }),
        props: {
            ticket: {},
            loading: {},
        },
        components: {
            TicketDetails,
            TicketEdit
        },
        methods: {
            ticketEdit(value) {
                this.editTicket = value
            },
        },
    }
</script>

<style>
</style>
