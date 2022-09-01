<template>
  <v-row align="center" justify="center" class="mt-12">
    <v-spacer></v-spacer>
    <v-col align="center" class="fill-height" justify="center" cols="12" md="4" sm="12">
      <v-card flat>
        <p>
          <v-avatar size="150">
            <v-img src="../assets/logo.png" class="grey darken-4"></v-img>
          </v-avatar>
        </p>
        <h4 class="mb-12 mt-8">Share Your Day</h4>
        <p>
          <router-link to="/login" class="link mt-12">
            <v-btn color="indigo" dark>
              GET STARTED
            </v-btn>
          </router-link>
        </p>
      </v-card>
    </v-col>
    <v-spacer></v-spacer>

  </v-row>
</template>

<script>
// import { mapActions } from "vuex";
export default {
  computed: {
    loggedin() {
      return this.$store.state.user.loggedin;
    },
    msg() {
      return "msg"
      // return this.$store.state.user.msg;
    },
    errorState() {
      return true
      // return this.$store.state.user.errorState;
    },
  },
  watch: {
    errorState(newVal, oldVal) {
      oldVal;
      if (newVal == true) {
        this.showError = true;
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
    password: "password",
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
    tab: null,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  }),
  methods: {
    togglePwd() {
      if (this.password === "text") {
        this.password === "password"
      } else {
        this.password === "text"
      }
    },
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
      console.log("HELLO LOGGIN ");
      this.$store.dispatch("login", this.user);
    },
  },
}
</script>