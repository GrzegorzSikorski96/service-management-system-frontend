<template>
    <span>
        <agency-details v-if="!editAgency" :agency="agency" :loading="loading"
                        @editCard="agencyEdit"></agency-details>
        <agency-edit v-else :agency="agency" @editCard="agencyEdit"></agency-edit>
    </span>
</template>

<script>
    import AgencyDetails from "./Details"
    import AgencyEdit from "./Edit"

    export default {
        name: 'Agency',
        data: () => ({
            editAgency: false,
        }),
        props: {
            agency: {},
            loading: {},
        },
        components: {
            AgencyDetails,
            AgencyEdit
        },
        methods: {
            agencyEdit(value) {
                this.editAgency = value
            },
        },
    }
</script>

<style>
</style>
