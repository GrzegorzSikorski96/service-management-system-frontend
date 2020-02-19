<template>
    <span>
        <service-details v-if="!editService" :service="service" :loading="loading" @editCard="serviceEdit"/>
        <service-edit v-else :service="service" @editCard="serviceEdit"/>
    </span>
</template>

<script>
    import ServiceDetails from "./Details"
    import ServiceEdit from "./Edit"

    export default {
        name: 'Service',
        data: () => ({
            editService: false,
        }),
        props: {
            service: {},
            loading: {},
        },
        components: {
            ServiceDetails,
            ServiceEdit
        },
        methods: {
            serviceEdit(value) {
                this.editService = value
            },
        },
    }
</script>

<style>
</style>
