<template>
    <v-card class="ma-3 pa-1" :elevation="5">
        <span v-if="!loading">
            <v-card-title>
                Dane pracownika

                <v-spacer/>

                <v-btn icon @click="changeEditState" color="info">
                    <font-awesome-icon icon="user-edit" size="lg"/>
                </v-btn>

                <v-btn v-if="!checkRoute" icon :to="{name: 'UserSummary', params: { id: user.id,}}">
                    <font-awesome-icon icon="external-link-alt" size="lg"/>
                </v-btn>
            </v-card-title>

            <v-card-text>
                <span class="font-weight-bold">
                    Imię i nazwisko:
                </span>
                {{ user.name }} {{ user.surname}}

                <br>

                <span class="font-weight-bold">
                    Email:
                </span>
                <a :href="'mailto:'+user.email">
                    {{ user.email }}
                </a>

                <br>

                <span class="font-weight-bold">
                    Numer telefonu:
                </span>
                <a :href="'tel:'+user.phone_number">
                    {{ user.phone_number }}
                </a>

                <span v-if="isAdmin()">
                    <br>

                    <span class="font-weight-bold">
                        Rola użytkownika:
                    </span>
                    {{ user.role.name}}
                </span>
            </v-card-text>
        </span>

        <loading v-else/>
    </v-card>
</template>

<script>
    import Loading from '../Helpers/Loading'

    export default {
        name: 'UserDetails',
        props: {
            user: {},
            loading: {},
        },
        components: {
            Loading,
        },
        methods: {
            changeEditState() {
                this.$emit('editCard', true)
            }
        },
        computed: {
            checkRoute() {
                return this.$router.currentRoute.name === 'UserSummary'
            }
        },
    }
</script>

<style>
    a {
        text-decoration: none;
    }
</style>
