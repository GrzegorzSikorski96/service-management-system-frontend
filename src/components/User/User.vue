<template>
    <span>
        <user-details v-if="!editUser" :user="user" :loading="loading" @editCard="userEdit"/>
        <user-edit v-else :user="user" @editCard="userEdit"/>
    </span>
</template>

<script>
    import UserDetails from "./Details";
    import UserEdit from "./Edit";

    export default {
        name: 'User',
        props: {
            user: {},
            loading: {},
        },
        components: {
            UserDetails,
            UserEdit,
        },
        data: () => ({
            editUser: false,
        }),
        methods: {
            userEdit(value) {
                this.editUser = value
            },
        },
    }
</script>

<style>
</style>
