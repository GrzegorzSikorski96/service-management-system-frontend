<template>
    <v-app-bar
            app
            dense
            clipped-left
            dark
            color="#60687b"
    >
        <slot></slot>

        <v-toolbar-title>{{ applicationName }}</v-toolbar-title>
    </v-app-bar>
</template>

<script>
    export default {
        data: () => ({
            applicationName: process.env.VUE_APP_NAME,
        }),
    }
</script>

<style scoped>
</style>