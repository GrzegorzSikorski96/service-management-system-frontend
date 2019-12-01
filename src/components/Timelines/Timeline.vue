<template>
    <v-card class="ma-3 pa-1" :elevation="5">
        <span v-if="!loading">
            <v-card-title>
                {{ title }}
            </v-card-title>

            <v-card-text>
                <slot name="createForm"/>

                <v-timeline dense v-if="itemsCount">
                    <slot/>
                </v-timeline>

                <v-alert v-else
                         border="bottom"
                         color="#202338"
                         dark>
                        Brak
                </v-alert>
            </v-card-text>

            <v-card-actions v-if="itemsCount">
                <slot name="pagination"/>
            </v-card-actions>
        </span>

        <loading v-else/>
    </v-card>
</template>

<script>
    import Loading from "../Helpers/Loading"

    export default {
        name: 'Timeline',
        props: {
            loading: {},
            title: {},
            itemsCount: {},
        },
        components: {
            Loading,
        },
    }
</script>

<style>
</style>
