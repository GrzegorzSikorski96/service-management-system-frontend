<template>
    <v-container fluid>
        <v-row>
            <v-col class="col-12">
                <v-card class="ma-3" :elevation="5">
                    <v-card-title>
                        Informacje o pracowniku: {{ user.name }} {{ user.surname }}

                        <v-spacer/>

                        <user-management :user="user"/>
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
                <user :user="user" :loading="loading"/>
            </v-col>

            <v-col class="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
                <timeline :loading="loading" title="Notatki" :itemsCount="notesLength">
                    <note v-for="note in notes.data" :key="note.id" :note="note"/>

                    <template v-slot:pagination>
                        <v-pagination
                                v-model="page"
                                :length="notes.last_page"
                                total-visible="7"
                                circle/>
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
        components: {
            Timeline,
            Note,
            User,
            UserManagement,
        },
        data: () => ({
            user: [],
            notes: [],
            notesLoading: true,
            page: 1,
            loading: true,
        }),
        methods: {
            async fetchUser() {
                await this.$http.get(`/api/user/${this.$route.params.id}`).then((response) => {
                    this.user = response.data.data.user;
                    this.loading = false;
                });
            },
            getUserNotes() {
                this.$http.get(`/api/user/${this.user.id}/notes?page=${this.page}`).then((response) => {
                    this.notes = response.data.data.notes;
                    this.notesLoading = false;
                });
            },
            initPusher() {
                let user = this.$pusher.subscribe(`user-${this.user.id}`);

                user.bind('update', this.fetchUser);
                user.bind('notes', this.getUserNotes);
            },
            init() {
                this.fetchUser().then(() => {
                    this.initPusher();
                    this.getUserNotes();
                });
            },
        },
        created() {
            this.init()
        },
        watch: {
            page: function (value) {
                this.getUserNotes(value);
            },
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
        destroyed() {
            this.$pusher.unsubscribe(`user-${this.user.id}`)
        }
    }
</script>

<style>
</style>
