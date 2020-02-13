<template>
    <v-dialog v-model="modal" max-width="600px" @click:outside="closeDialog()">
        <v-card>
            <v-card-title>
                Informacje o aplikacji
            </v-card-title>

            <v-card-text>
                Aplikacja wykonana w ramach pracy dyplomowej inżynierskiej.

                <br>
                <br>
                <strong>Uczelnia: </strong> Państwowa Wyższa Szkoła Zawodowa im. Witelona w Legnicy <br>
                <strong>Temat pracy: </strong> Aplikacja webowa do zarządzania siecią serwisów <br>
                <strong>Autor: </strong> Grzegorz Sikorski

            </v-card-text>

            <v-card-actions>
                <v-spacer/>
                <v-btn color="darken-1" text @click="closeDialog()">Anuluj</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: 'Author',
        props: {
            modal: {},
        },
        methods: {
            closeDialog() {
                this.confirmation = '';
                this.$emit('modal', false)
            },
        },
    }
</script>

<style>
</style>
