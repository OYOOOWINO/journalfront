<template>
    <v-row class="mt-md-2 mt-sm-12">
        <v-spacer></v-spacer>
        <v-col cols="12" sm="12" md="10">
            <v-row>
                <v-spacer></v-spacer>
                <v-col class="fill-height" cols="12">
                    <v-card dense>
                        <v-toolbar flat color="indigo" dark>
                            <v-row class="mt-md-4">
                                <v-col cols="12" md="4">
                                    <v-menu :close-on-content-click="false" ref="menu" v-model="menu" top>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn color="indigo darken-1" depressed v-bind="attrs" v-on="on">
                                                <v-icon>mdi-calendar</v-icon> Select Dates
                                            </v-btn>
                                        </template>
                                        <v-date-picker color="indigo" v-model="dates" range>
                                            <v-spacer></v-spacer>
                                            <v-btn text class="indigo--text" @click="menu = false">
                                                Cancel
                                            </v-btn>
                                            <v-btn class="indigo--text" text @click="getData()">
                                                OK
                                            </v-btn>
                                        </v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col class="d-none d-md-block" cols="12" md="4">
                                    <v-text-field  dense small v-model="dateRangeText"
                                        label="Date range" flat outlined readonly>
                                    </v-text-field>
                                </v-col>
                            </v-row>
                        </v-toolbar>
                        <v-card-text>
                            <v-row>
                                <v-col class="" v-for="item in journals" :key="item._id" cols="12" md="4">
                                    <v-card flat color="indigo lighten-5">
                                        <v-card-text class="pb-1">
                                            <p class="subtitle  lighten-3">
                                                <v-icon color="indigo lighten-4">mdi-clock</v-icon> <span class="indigo--text lighten-2"> {{  (new Date(item.created_at)).toLocaleString() }}</span>
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
        },
        msg() {
            return this.$store.state.msg;
        },
        errorState() {
            return this.$store.state.errorState;
        },
        dateRangeText() {
            return this.dates.join(' ~ ')
        },
    },
    data: () => ({
        dates: [],
        menu: false
    }),

    watch: {
    },
    methods: {
        getJournals() {
            this.$store.dispatch('save', { content: this.content })
        },

        getData() {
            this.menu = false
            if (this.dates.length == 2) {
                let dates = this.dates;
                let startDate = dates[0];
                let endDate = dates[1];
                let dateDiff = new Date(endDate).getTime() - new Date(startDate).getTime()
                if (dateDiff < 0) {
                    let date0 = dates[0];
                    dates[0] = dates[1];
                    dates[1] = date0;
                }
                this.dates = dates;
                this.$store.dispatch('getJournalsTs', { date: dates })
            } else {
                //get the last ten
                this.$store.dispatch('getJournals')
            }


        }
    }
}
</script>