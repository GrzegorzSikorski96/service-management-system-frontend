<template>
    <v-container fluid class="pa-0">
        <section>
            <v-parallax src="../assets/hero.png" height="600">
                <v-layout
                        column
                        align-center
                        justify-center
                        class="white--text"
                >
                    <img src="../assets/logo.png" alt="Vuetify.js" height="200">
                    <h1 class="white--text mb-2 display-4 text-center font-weight-bold">{{ service.name }}</h1>
                    <div class="subheading mb-4 text-center">Oparty na systemie zarządzania serwisem</div>
                </v-layout>
                <v-row align="end">
                    <div class="col-2 pa-0">
                        <a style="background-color:rgba(255, 255, 255, 0.2);color:white;text-decoration:none;padding:4px 6px;font-family:-apple-system, BlinkMacSystemFont, &quot;San Francisco&quot;, &quot;Helvetica Neue&quot;, Helvetica, Ubuntu, Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif;font-size:12px;font-weight:bold;line-height:1.2;display:inline-block;border-radius:3px"
                           href="https://unsplash.com/@helloquence?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge"
                           target="_blank" rel="noopener noreferrer"
                           title="Download free do whatever you want high-resolution photos from Helloquence"><span
                                style="padding:2px 3px"><svg xmlns="http://www.w3.org/2000/svg"
                                                             style="height:12px;width:auto;position:relative;vertical-align:middle;top:-2px;fill:white"
                                                             viewBox="0 0 32 32"><title>unsplash-logo</title><path
                                d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path></svg></span><span
                                style="display:inline-block;padding:2px 3px">Helloquence</span></a>
                    </div>
                </v-row>
            </v-parallax>

        </section>

        <section id="about">
            <v-layout
                    column
                    wrap
                    class="my-12"
                    align-center
            >
                <v-flex xs12>
                    <v-container grid-list-xl>
                        <v-layout row wrap align-center>
                            <v-flex xs12 md4>
                                <v-card flat class="transparent">
                                    <v-card-text class="text-center">
                                        <v-icon x-large class="blue--text text--lighten-2">mdi-palette</v-icon>
                                    </v-card-text>
                                    <v-card-title primary-title class="layout justify-center">
                                        <div class="headline text-center">Material Design</div>
                                    </v-card-title>
                                    <v-card-text>
                                        Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                                        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac
                                        turpis egestas.
                                        Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt.
                                        Suspendisse potenti.
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                            <v-flex xs12 md4>
                                <v-card flat class="transparent">
                                    <v-card-text class="text-center">
                                        <v-icon x-large class="blue--text text--lighten-2">mdi-flash</v-icon>
                                    </v-card-text>
                                    <v-card-title primary-title class="layout justify-center">
                                        <div class="headline">Fast development</div>
                                    </v-card-title>
                                    <v-card-text>
                                        Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                                        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac
                                        turpis egestas.
                                        Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt.
                                        Suspendisse potenti.
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                            <v-flex xs12 md4>
                                <v-card flat class="transparent">
                                    <v-card-text class="text-center">
                                        <v-icon x-large class="blue--text text--lighten-2">mdi-wrench</v-icon>
                                    </v-card-text>
                                    <v-card-title primary-title class="layout justify-center">
                                        <div class="headline text-center">Completely Open Sourced</div>
                                    </v-card-title>
                                    <v-card-text>
                                        Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                                        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac
                                        turpis egestas.
                                        Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt.
                                        Suspendisse potenti.
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-flex>
            </v-layout>
        </section>

        <section>
            <v-parallax src="../assets/spacer.png" height="200"/>
        </section>

        <section>
            <v-container grid-list-xl>
                <v-layout row wrap justify-center class="my-12">
                    <v-flex xs12 sm4>
                        <v-card flat class="transparent">
                            <v-card-title primary-title class="layout justify-center">
                                <div class="headline">O nas</div>
                            </v-card-title>
                            <v-card-text>
                                {{ service.description }}
                            </v-card-text>
                        </v-card>
                    </v-flex>
                    <v-flex xs12 sm4 offset-sm1>
                        <v-card flat class="transparent">
                            <v-card-title primary-title class="layout justify-center">
                                <div class="headline">Kontakt</div>
                            </v-card-title>
                            <v-card-text>
                                Masz jakieś pytania, bądź chcesz się umówić? Skontaktuj się z nami!
                            </v-card-text>
                            <v-list class="transparent">
                                <v-list-item>
                                    <v-list-item-action>
                                        <v-icon class="blue--text text--lighten-2">mdi-phone</v-icon>
                                    </v-list-item-action>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            <a :href="'tel:'+service.phone_number">
                                                {{ service.phone_number }}
                                            </a>
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-action>
                                        <v-icon class="blue--text text--lighten-2">mdi-map-marker</v-icon>
                                    </v-list-item-action>
                                    <v-list-item-content>
                                        <v-list-item-title>{{ service.address }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-action>
                                        <v-icon class="blue--text text--lighten-2">mdi-email</v-icon>
                                    </v-list-item-action>
                                    <v-list-item-content>
                                        <v-list-item-title>{{ service.email }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </section>
    </v-container>
</template>


<script>
    export default {
        data: () => ({
            service: {},
        }),
        methods: {
            fetchService() {
                this.$http.get('/api/service').then((response) => {
                    this.service = response.data.data.service;
                });
            },
        },
        created() {
            this.fetchService();
        }
    }
</script>

<style>

</style>
