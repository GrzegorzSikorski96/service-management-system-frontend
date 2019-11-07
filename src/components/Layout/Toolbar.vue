<template>
    <v-app-bar
            app
            clipped-left
            color="#f2cdba"
    >
        <slot></slot>
        <v-toolbar-title class="toolbar">{{ applicationName }}</v-toolbar-title>
    </v-app-bar>
</template>

<script>
    export default {
        data: () => ({
            drawer: null,
            applicationName: 'Service Management System',
        }),
    }
</script>

<style scoped>
    .toolbar {
        color: #202338;
    }
</style>