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
            <v-autocomplete
                    :items="agencies"
                    :rules="rules.user.agency_id"
                    v-model="credentials.agency_id"
                    label="Oddział"
                    item-text="agencyString"
                    item-value="id"
            >
                <template v-slot:item="data">
                    <v-list-item-content>
                        <v-list-item-title>{{ data.item.name }}</v-list-item-title>
                        <v-list-item-subtitle>{{ data.item.address }}</v-list-item-subtitle>
                    </v-list-item-content>
                </template>
            </v-autocomplete>

            <v-select
                    :items="agencyRoles"
                    :rules="rules.user.agency_role_id"
                    label="Rola użytkownika"
                    v-model="credentials.agency_role_id"
                    item-text="name"
                    item-value="id"
            ></v-select>
        </span>
    </v-form>
</template>

<script>
    export default {
        name: 'UserForm',
        props: {
            user: {},
        },
        data: () => ({
            credentials: {},
            valid: false,
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
            createAgenciesString() {
                this.agencies.forEach(function (value) {
                    value['agencyString'] = value.name + ' ' + value.address;
                })
            },
            async fetchAgencies() {
                if (this.isAdmin()) {
                    this.$http.get(`/api/agencies`,).then((response) => {
                        this.agencies = response.data.data.agencies;
                        this.createAgenciesString()
                    });
                }
            },
            async fetchAgencyRoles() {
                if (this.isAdmin()) {
                    this.$http.get(`/api/agency/roles`,).then((response) => {
                        this.agencyRoles = response.data.data.roles;
                        this.createAgenciesString()
                    });
                }
            },
            setDefault() {
                if (!this.isAdmin()) {
                    this.credentials.agency_role_id = 3;
                    this.credentials.agency_id = this.$store.state.currentUser.agency_id;
                }
            },
            isAdmin() {
                return this.$store.state.currentUser.role.name === 'administrator';
            },
        },
        created() {
            this.parseFormData();
            this.fetchAgencies();
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
