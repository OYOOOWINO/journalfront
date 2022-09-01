<template>
    <v-row class="mt-md-2 mt-sm-12">
        <v-spacer></v-spacer>
        <v-col cols="12" sm="12" md="10">
            <v-row>
                <v-spacer></v-spacer>
                <v-col class="fill-height" cols="12">
                    <v-card dense>
                        <v-toolbar flat color="indigo" dark>
                            <v-toolbar-title>Random Feeds</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn text @click="getData()">
                                <v-icon>mdi-autorenew</v-icon> Refresh
                            </v-btn>

                        </v-toolbar>
                        <v-card-text>
                            <v-row>
                                <v-col class="" v-for="item in journals" :key="item._id" cols="12"
                                    md="4">
                                    <v-card flat color="indigo lighten-5">
                                        <v-card-text class="pb-1">
                                            <p class="subtitle  lighten-3">
                                                <v-icon color="indigo lighten-4">mdi-clock</v-icon> <span
                                                    class="indigo--text lighten-2"> {{  (new Date(item.created_at)).toLocaleString()   }}</span>
                                                <br>
                                                <span class="ml-2">{{  item.content  }}</span>
                                            </p>
                                        </v-card-text>

                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>

                </v-col>
                <v-spacer></v-spacer>

            </v-row>
        </v-col>
        <v-spacer></v-spacer>
    </v-row>
</template>


<script>
/* eslint-disable */
export default {
    mounted() {
        this.getData();
    },
    computed: {
        journals() {
            return this.$store.getters.journals;
        }
    },
    data: () => ({

    }),

    methods: {

        getData() {

            this.$store.dispatch('getJournals')
        }


    }
}

</script>