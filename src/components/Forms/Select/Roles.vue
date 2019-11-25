<template>
    <v-select
            :items="agencyRoles"
            :rules="rules.agency_role_id.required"
            label="Rola użytkownika"
            v-model="agency_role_id"
            item-text="name"
            item-value="id"
    ></v-select>
</template>

<script>
    export default {
        name: 'RolesSelect',
        props: {
            agency_role_id: {
                default: null,
            },
        },
        data: () => ({
            agencyRoles: [],
            agencyRoleId: {},
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
                    if (this.agency_role_id) {
                        this.setAgencyRoleId(this.agency_role_id);
                    }
                });
            },
            setAgencyRoleId(value) {
                this.agencyRoleId = value;
            }
        },
        created() {
            this.fetchAgencyRoles();
        },
        watch: {
            agencyRoleId: function (value) {
                this.setAgencyRoleId(value);
                this.$emit('input', this.agencyRoleId)
            },
        },
    }
</script>

<style>

</style>