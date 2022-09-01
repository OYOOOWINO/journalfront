<template>
    <v-row align="center" justify="center" class="mt-12">
        <v-spacer></v-spacer>
        <v-col align="center" class="fill-height" justify="center" cols="12" md="4" sm="12">
            <v-card>
                <v-card flat>
                    <v-banner v-show="showError" single-line>
                        <v-icon slot="icon" color="red" size="36">mdi-close-circle</v-icon>
                        <span class="font-weight-bold custom-transform-class red--text darken-3 ml-n12">{{  msg 
                            }}</span>
                    </v-banner>
                    <v-banner single-line v-show="loggedIn">
                        <v-icon slot="icon" color="success" size="20">mdi-check-circle</v-icon>
                        <span class="green--text darken-3" large>LOGIN SUCCESSFUL.</span>
                    </v-banner>
                </v-card>
                <v-card flat v-show="!loggedIn">
                    <v-card-title class="rounded-0">
                        <v-spacer></v-spacer>
                        <span class="font-weight-bold indigo--text darken">LOGIN</span>
                        <v-spacer></v-spacer>
                    </v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-text-field flat class="rounded-1" solo-inverted label="Email"
                                :rules="[rules.required, rules.email]" v-model="user.email"></v-text-field>
                            <v-text-field :rules="[rules.required]" solo-inverted label="Password" type="password"
                                class="rounded-1" v-model="user.password" flat></v-text-field>
                            <v-btn :disabled="disableLogin" depressed dark medium block color="indigo darken-3 accent-5"
                                @click="login">Login</v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-card>
        </v-col>
        <v-spacer></v-spacer>

    </v-row>
</template>

<script>
export default {
    mounted() {
        this.isLoggedIn()
    },
    computed: {
        loggedIn() {
            return this.$store.state.loggedIn;
        },
        msg() {
            return this.$store.state.msg;
        },
        errorState() {
            return this.$store.state.errorState;
        },
    },
    watch: {
        errorState(value) {
            if (value == true) {
                this.showError = true;
            }
        },
        loggedIn(value) {
            if (value == true) {
                this.$router.push("/journals");
            }
        },
        user: {
            deep: true,
            handler() {
                if (
                    this.isValidEmail(this.user.email) == true &&
                    this.minLength(this.user.email) == true &&
                    this.isEmpty(this.user.email) == true &&
                    this.isEmpty(this.user.password) == true
                ) {
                    this.disableLogin = false;
                } else {
                    this.disableLogin = true;
                }
            },
        }
    },

    data: () => ({
        user: { email: "", password: "" },
        showError: false,
        disableLogin: true,
        rules: {
            required: value => !!value || 'Required.',
            counter: value => value.length >= 4 || 'Min 5 characters',
            email: value => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return pattern.test(value) || 'Invalid e-mail.'
            },
        },
    }),
    methods: {
        isEmpty(val) {
            return val.length > 0 || "Input Requared";
        },
        isValidEmail(val) {
            const emailPattern =
                /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
            return emailPattern.test(val) || "Invalid email";
        },
        minLength(val) {
            return (val && val.length > 5) || "Minimum Length is 5";
        },

        login() {
            this.$store.dispatch("login", this.user);
        },
        async isLoggedIn() {
            await this.$store.commit('fetchToken')
            if (this.loggedIn === true) {
                this.$router.push("/journals")
            }
        }
    },
}
</script>