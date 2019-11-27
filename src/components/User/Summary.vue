<template>
    <v-container fluid>
        <v-row>
            <v-col class="col-12">
                <v-card class="ma-3" :elevation="5">
                    <v-card-title>
                        Informacje o pracowniku: {{ user.name }} {{ user.surname }}

                        <v-spacer></v-spacer>

                        <user-management :user="user"></user-management>

                    </v-card-title>
                </v-card>

                <v-alert
                        v-if="user.blocked_at"
                        class="ma-3"
                        elevation="5"
                        prominent
                        icon="block"
                        type="error"
                >
                       Użytkownik jest zablokowany
                </v-alert>
            </v-col>

            <v-col class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                <user :user="user" :loading="loading"></user>
            </v-col>

            <v-col class="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                <timeline v-if="notesLength" :loading="loading" title="Notatki" :itemsCount="notesLength">
                    <note v-for="note in notes.data" :key="note.id" :note="note"></note>

                    <template v-slot:pagination>
                        <v-pagination
                                v-model="page"
                                :length="notes.last_page"
                                total-visible="7"
                                circle
                        ></v-pagination>
                    </template>
                </timeline>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import Timeline from "../Timelines/Timeline";
    import Note from "../Timelines/Items/Note"
    import User from "./User";
    import UserManagement from "../User/Management/Management"

    export default {
        name: 'UserSummary',
        data: () => ({
            user: [],
            notes: [],
            notesLoading: true,
            page: 1,
            loading: true,
        }),
        components: {
            Timeline,
            Note,
            User,
            UserManagement,
        },
        methods: {
            async fetchUser() {
                this.$http.get(`/api/user/${this.$route.params.id}`).then((response) => {
                    this.user = response.data.data.user;
                    this.loading = false;
                });

                this.getUserNotes(1);
            },
            getUserNotes(page) {
                this.$http.get(`/api/user/${this.$route.params.id}/notes?page=${page}`).then((response) => {
                    this.notes = response.data.data.notes;
                    this.notesLoading = false;
                });
            },
        },
        created() {
            this.fetchUser()
        },
        computed: {
            notesLength() {
                if (this.notes.data) {
                    return this.notes.data.length;
                } else {
                    return 0;
                }
            },
        },
        watch: {
            page: function (value) {
                this.getUserNotes(value);
            },
        },
    }
</script>

<style>
</style>
