<template>
    <span>
        <client-details v-if="!editClient" :client="client" :loading="loading"
                        @editCard="clientEdit"></client-details>
        <client-edit v-else :client="client" @editCard="clientEdit"></client-edit>
    </span>
</template>

<script>
    import ClientDetails from "./Details";
    import ClientEdit from "./Edit";

    export default {
        name: 'Client',
        data: () => ({
            editClient: false,
        }),
        props: {
            client: {},
            loading: {},
        },
        components: {
            ClientDetails,
            ClientEdit,
        },
        methods: {
            clientEdit(value) {
                this.editClient = value
            },
        },
    }
</script>

<style>
</style>
