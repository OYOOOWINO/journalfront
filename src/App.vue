<template>
  <v-app id="app">
    <v-app-bar app color="indigo" dark dense fixed>
      <v-toolbar-title>JOURNAL</v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="d-none d-md-block">
        <div v-if="!loggedIn">
          <router-link to="/signup" class="link">
            <v-btn text>
              SignUp
            </v-btn>
          </router-link>
          <router-link to="/login" class="link">
            <v-btn text>
              Login
            </v-btn>
          </router-link>
        </div>
        <div v-if="loggedIn">
          <router-link to="/journals" class="link">
            <v-btn text>
              Entires
            </v-btn>
          </router-link>
          <router-link to="/new" class="link">
            <v-btn text>
              Create
            </v-btn>
          </router-link>
          <router-link to="/feeds" class="link">
            <v-btn text>
              Feeds
            </v-btn>
          </router-link>
          <v-btn text @click="logout">
            Logout
          </v-btn>
        </div>
      </div>
      <v-menu>
        <template v-slot:activator="{ on, attrs }">
          <v-btn dark icon v-bind="attrs" v-on="on" class="d-md-none d-lg-none">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-list v-if="!loggedIn">
          <v-list-item>
            <v-list-item-title><router-link to="/signup" class="link">
            <v-btn text>
              SignUp
            </v-btn>
          </router-link></v-list-item-title>
          <v-list-item-title><router-link to="/login" class="link">
            <v-btn text>
              Login
            </v-btn>
          </router-link></v-list-item-title>
          </v-list-item>
        </v-list>
        <v-list v-if="loggedIn">
          
          <v-list-item>
            <v-list-item-title>
          <router-link to="/journals" class="link">
            <v-btn text>
              Entires
            </v-btn>
          </router-link></v-list-item-title></v-list-item>
          
          <v-list-item>
            <v-list-item-title>
          <router-link to="/new" class="link">
            <v-btn text>
              Create
            </v-btn>
          </router-link>
          </v-list-item-title></v-list-item>
          
          <v-list-item>
            <v-list-item-title>
          <router-link to="/feeds" class="link">
            <v-btn text>
              Feeds
            </v-btn>
          </router-link></v-list-item-title></v-list-item>
          
          <v-list-item>
            <v-list-item-title>
          <v-btn text @click="logout">
            Logout
          </v-btn>
          </v-list-item-title></v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  mounted() {
    this.$store.commit('fetchToken');
  },

  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn
    }
  },

  methods: {
    logout() {
      this.$store.commit("logout")
    }
  }
}
</script>

<style lang="css">
.link {
  text-decoration: none;
}
</style>