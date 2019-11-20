<template>
    <v-container fluid>
        <v-row>
            <v-col class="col-12">
                <v-card class="ma-3" :elevation="5">
                    <v-card-title>
                        Informacje o pracowniku: {{ user.name }} {{ user.surname }}
                    </v-card-title>
                </v-card>
            </v-col>

            <v-col class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                <user :user="user" :loading="loading"></user>
            </v-col>

            <v-col class="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                <timeline :loading="loading" title="Notatki" :itemsCount="notesLength">
                    <note v-for="note in user.notes" :key="note.id" :note="note"></note>
                </timeline>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import Timeline from "../Timelines/Timeline";
    import Note from "../Timelines/Items/Note"
    import User from "./User";

    export default {
        name: 'UserSummary',
        data: () => ({
            user: [],
            loading: true,
        }),
        components: {
            Timeline,
            Note,
            User
        },
        methods: {
            async fetchUser() {
                this.$http.get(`/api/user/${this.$route.params.id}`).then((response) => {
                    this.user = response.data.data.user;
                    this.loading = false;
                });
            },
        },
        created() {
            this.fetchUser()
        },
        computed: {
            notesLength() {
                if ('notes' in this.user) {
                    return this.user.notes.length;
                } else {
                    return 0;
                }
            },
        }
    }
</script>

<style>
</style>
