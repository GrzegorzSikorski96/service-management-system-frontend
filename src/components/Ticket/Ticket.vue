<template>
    <span>
        <ticket-details v-if="!editTicket" :ticket="ticket" :loading="loading" @editCard="ticketEdit"/>
        <ticket-edit v-else :ticket="ticket" @editCard="ticketEdit"/>
    </span>
</template>

<script>
    import TicketDetails from "./Details"
    import TicketEdit from "./Edit"

    export default {
        name: 'Client',
        props: {
            ticket: {},
            loading: {},
        },
        components: {
            TicketDetails,
            TicketEdit
        },
        data: () => ({
            editTicket: false,
        }),
        methods: {
            ticketEdit(value) {
                this.editTicket = value
            },
        },
    }
</script>

<style>
</style>
