<template>
    <v-form v-model="valid">
        <v-text-field
                v-model="credentials.name"
                :rules="rules.user.name"
                label="Imię"
                required
        ></v-text-field>

        <v-text-field
                v-model="credentials.surname"
                :rules="rules.user.surname"
                label="Nazwisko"
                required
        ></v-text-field>

        <v-text-field
                v-model="credentials.password"
                :rules="rules.user.password"
                label="Hasło"
                type="password"
                required
        ></v-text-field>

        <v-text-field
                v-model="credentials.phone_number"
                :rules="rules.user.phone_number"
                label="Numer telefonu"
                required
        ></v-text-field>

        <v-text-field
                v-model="credentials.email"
                :rules="rules.user.email"
                label="Email"
                required
        ></v-text-field>

        <span v-if="isAdmin()">
            <agencies-autocomplete v-if="!edit" v-model="credentials.agency_id"></agencies-autocomplete>

            <agency-role-select v-if="user" v-model="credentials.agency_role_id" :agencyRoleId="user.agency_role_id"></agency-role-select>
            <agency-role-select v-else v-model="credentials.agency_role_id"></agency-role-select>
        </span>
    </v-form>
</template>

<script>
    import AgenciesAutocomplete from "../Forms/Autocomplete/Agencies"
    import AgencyRoleSelect from "../Forms/Select/Roles"

    export default {
        name: 'UserForm',
        props: {
            user: {},
            edit: {},
        },
        components: {
            AgenciesAutocomplete,
            AgencyRoleSelect
        },
        data: () => ({
            credentials: {},
            valid: false,
            agencyValid: {},
            agencies: [],
            agencyRoles: [],
            rules: {
                user: {
                    name: [
                        v => !!v || 'Imię jest wymagana.',
                    ],
                    surname: [
                        v => !!v || 'Nazwawisko jest wymagane.',
                    ],
                    phone_number: [
                        v => !!v || 'Numer telefonu jest wymagany.',
                    ],
                    email: [
                        v => /.+@.+/.test(v) || 'Wprowawdź prawidłowy adres E-mail',
                    ],
                    agency_id: [
                        v => !!v || 'Oddział jest wymagany.',
                    ],
                    agency_role_id: [
                        v => !!v || 'Rola użytkownika jest wymagany.',
                    ],
                },
            },
        }),
        methods: {
            parseFormData() {
                if (this.user) {
                    this.credentials = JSON.parse(JSON.stringify(this.user))
                }
            },
            async fetchAgencyRoles() {
                if (this.isAdmin()) {
                    this.$http.get(`/api/agency/roles`,).then((response) => {
                        this.agencyRoles = response.data.data.roles;
                    });
                }
            },
            setDefault() {
                if (!this.isAdmin()) {
                    this.credentials.agency_role_id = 3;
                    this.credentials.agency_id = this.$store.state.currentUser.agency_id;
                }
            },
        },
        created() {
            this.parseFormData();
            this.fetchAgencyRoles();
            this.setDefault();
        },
        watch: {
            valid: function (value) {
                this.$emit('valid', value)
            },
        },
    }
</script>

<style>

</style>
