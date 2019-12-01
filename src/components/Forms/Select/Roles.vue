<template>
    <v-select
            :items="agencyRoles"
            :rules="rules.agency_role_id.required"
            label="Rola użytkownika"
            v-model="agency_role_id"
            item-text="name"
            item-value="id"/>
</template>

<script>
    export default {
        name: 'RolesSelect',
        props: {
            agencyRoleId: {
                default: null,
            },
        },
        data: () => ({
            agencyRoles: [],
            agency_role_id: null,
            rules: {
                agency_role_id: {
                    required: [
                        v => !!v || 'Rola użytkownika jest wymagany.',
                    ],
                }
            },
        }),
        methods: {
            async fetchAgencyRoles() {
                this.$http.get(`/api/agency/roles`).then((response) => {
                    this.agencyRoles = response.data.data.roles;
                });
            },
        },
        created() {
            this.fetchAgencyRoles();
            if (this.agencyRoleId) {
                this.agency_role_id = this.agencyRoleId
            }
        },
        watch: {
            agency_role_id: function () {
                this.$emit('input', this.agency_role_id)
            },
        },
    }
</script>

<style>

</style>