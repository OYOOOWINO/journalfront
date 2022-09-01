<template>
    <v-row align="center" justify="center" class="mt-md-12">
        <v-spacer></v-spacer>
        <v-col align="center" class="fill-height" justify="center" cols="12" md="6">
            <v-card flat>
                <v-banner v-show="showError" single-line>
                    <v-icon slot="icon" color="red" size="36">mdi-close-circle</v-icon>
                    <span class="font-weight-bold custom-transform-class red--text darken-3 ml-n12">{{  msg 
                        }}</span>
                </v-banner>
                <v-snackbar v-model="dataSaved" timeout="2000">
                    {{  msg  }}
                    <template v-slot:action="{ attrs }">
                        <v-icon slot="icon" color="success" size="20">mdi-check-circle</v-icon>
                    </template>

                </v-snackbar>
            </v-card>
            <v-card flat dense class="pa-0">
                <v-card-title class="pa-0">
                    <v-toolbar class="pa-0 indigo--text rounded-2" dense flat color="gray" rounded-2>
                        NEW JOURNAL ENTRY
                    </v-toolbar>
                </v-card-title>
                <v-card-text class="pt-3">
                    <v-textarea rows="10" :rules="rules" flat class="rounded-2 pa-0" solo-inverted name="content"
                        placeholder="Journal Entry" v-model="content">
                    </v-textarea>
                </v-card-text>
                <v-card-actions class="pt-0">
                    <v-spacer></v-spacer>
                    <v-btn :disabled="disableSave" depressed dark dense class="mr-3 pt-0"
                        color="indigo darken-3 accent-5" @click="saveJournal">Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
        <v-spacer></v-spacer>

    </v-row>
</template>


<script>
     /* eslint-disable */
export default {
    computed: {
        postSaved() {
            return this.$store.state.postSaved;
        },
        msg() {
            return this.$store.state.msg;
        },
        errorState() {
            return this.$store.state.errorState;
        },
    },
    data: () => ({
        dataSaved:false,
        showError: false,
        tab: null,
        content: "",
        rules: [v => v.length <= 499 || 'Max 500 characters'],
        disableSave: true
    }),

    watch: {
        content(newVal, oldVal) {
            if (newVal.length > 500) {
                this.content = newVal.substring(0, 499)
                return
            }
            if (newVal.length >= 5) {
                this.disableSave = false
                return;
            }
            else if (newVal.length < 5) {
                this.disableSave = true
                return
            }
        },

        postSaved(value){
            this.dataSaved = value
        }
    },
    methods: {
        async saveJournal() {
            let text = this.content
            await this.$store.dispatch('save', { content: text.substring(0,499) })
        }
    }
}
</script>