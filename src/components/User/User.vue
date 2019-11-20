<template>
    <span>
        <user-details v-if="!editUser" :user="user" :loading="loading"
                        @editCard="userEdit"></user-details>
        <user-edit v-else :user="user" @editCard="userEdit"></user-edit>
    </span>
</template>

<script>
    import UserDetails from "./Details";
    import UserEdit from "./Edit";

    export default {
        name: 'User',
        data: () => ({
            editUser: false,
        }),
        props: {
            user: {},
            loading: {},
        },
        components: {
            UserDetails,
            UserEdit,
        },
        methods: {
            userEdit(value) {
                this.editUser = value
            },
        },
    }
</script>

<style>
</style>
