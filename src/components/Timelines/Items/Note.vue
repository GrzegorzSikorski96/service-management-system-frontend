<template>
    <v-timeline-item
            color="green lighten-2"
            icon="assignment"
    >
        <template>
            <span class="font-weight-bold">{{ note.author.name }} {{ note.author.surname }} </span>
        </template>

        <v-card class="elevation-2">
            <v-card-text class="text--primary">
                {{ note.content }}
            </v-card-text>

            <v-card-actions class="text--secondary">
                <v-spacer></v-spacer>
                {{ note.created_at }}
            </v-card-actions>
        </v-card>
    </v-timeline-item>
</template>

<script>
    export default {
        name: 'Notes',
        props: {
            note: {},
        },
    }
</script>

<style>
</style>
