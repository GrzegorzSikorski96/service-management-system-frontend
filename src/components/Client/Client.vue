<template>
    <span>
        <client-details v-if="!editClient" :client="client" :loading="loading" @editCard="clientEdit"/>
        <client-edit v-else :client="client" @editCard="clientEdit"/>
    </span>
</template>

<script>
    import ClientDetails from "./Details";
    import ClientEdit from "./Edit";

    export default {
        name: 'Client',
        props: {
            client: {},
            loading: {},
        },
        components: {
            ClientDetails,
            ClientEdit,
        },
        data: () => ({
            editClient: false,
        }),
        methods: {
            clientEdit(value) {
                this.editClient = value
            },
        },
    }
</script>

<style>
</style>
