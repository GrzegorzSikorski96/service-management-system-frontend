<template>
    <v-card class="ma-3 pa-1" :elevation="5">
        <span v-if="!loading">
            <v-card-title>
            {{ title }}
        </v-card-title>

        <v-card-text>

            <slot name="createForm"></slot>

            <v-timeline dense v-if="itemsCount">
                <slot></slot>
            </v-timeline>

            <v-alert v-else
                     border="bottom"
                     color="#202338"
                     dark>
                    Brak
            </v-alert>
        </v-card-text>
        </span>

        <v-card-actions v-if="itemsCount">
            <slot name="pagination"></slot>
        </v-card-actions>

        <v-progress-circular v-else
                             class="mx-auto"
                             :size="80"
                             indeterminate
                             color="primary"
        ></v-progress-circular>
    </v-card>
</template>

<script>
    export default {
        name: 'Timeline',
        props: {
            loading: {},
            title: {},
            itemsCount: {},
        },
    }
</script>

<style>
</style>
