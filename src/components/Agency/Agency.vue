<template>
    <span>
        <agency-details v-if="!editAgency" :agency="agency" :loading="loading" @editCard="agencyEdit"/>
        <agency-edit v-else :agency="agency" @editCard="agencyEdit"/>
    </span>
</template>

<script>
    import AgencyDetails from "./Details"
    import AgencyEdit from "./Edit"

    export default {
        name: 'Agency',
        props: {
            agency: {},
            loading: {},
        },
        components: {
            AgencyDetails,
            AgencyEdit
        },
        data: () => ({
            editAgency: false,
        }),
        methods: {
            agencyEdit(value) {
                this.editAgency = value
            },
        },
    }
</script>

<style>
</style>
