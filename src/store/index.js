/*no-unused-vars*/
import Vue from "vue";
import Vuex from "vuex";
import router from "../router/index";
import { api } from "../plugins/axios";

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    loggedIn: false,
    user: {},
    errorState: false,
    msg: "no msg",
    loginOK: false,
    postSaved: false,
    journals: []
  },

  getters: {
    loggedIn: state => { return state.loggedIn },
    user: state => { return state.user },
    msg: state => { return state.msg },
    error: state => { return state.errorState },
    login: state => { return state.loginOK },
    journals: state => { return state.journals }
  },

  mutations: {
    updateUser(state) {
      let user = JSON.parse(sessionStorage.getItem("user"));
      let data = {
        _id: user._id
      }

      let bearer = "Bearer " + user.authToken;
      try {
        const response = api.patch("auth/update", data, {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": bearer
          }
        });
        if (response.status == 200) {
        }
      } catch (error) {
        console.log(error);
      }
    },
    setErrorState(state, payload) {
      state.errorState = payload;
    },

    setMsg(state, payload) {
      state.msg = payload;
    },

    setJournals(state, payload) {
      state.journals = payload
    },

    setPosted(state, payload) {
      state.postSaved = payload;
    },

    setAuth(state, payload) {
      sessionStorage.setItem("login", true);
      sessionStorage.setItem("user", JSON.stringify(payload));
      state.loggedIn = true;
      state.loginOK = true;
      state.user = payload;
    },

    fetchToken(state) {
      let login = sessionStorage.getItem("login");
      let user = sessionStorage.getItem("user");

      if (login === null || user === null) {
        state.loggedIn = false;
        return;
      }

      login = JSON.parse(login);
      user = JSON.parse(user);

      state.loggedIn = login;
      state.user.authToken = user.authToken;
      state.user.email = user.email;
      state.user._id = user._id;

    },

    logout(state) {
      sessionStorage.removeItem("login");
      sessionStorage.removeItem("user");
      state.loggedIn = false;
      state.loginOK = false;
      state.user = {};
      router.push("/");
    },

  },

  actions: {
      async save(context, payload) {
      let user = JSON.parse(sessionStorage.getItem("user"));
      let data = {
        creator_id: user._id,
        ...payload
      }
      let bearer = "Bearer " + user.authToken;

      try {
        console.log(data);
        const response = await api.post("/journal/save", data, {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": bearer
          }
        });
        if (response.status == 200) {
          context.commit("setJournals", true);
          context.commit('updateUser')
          context.commit("setMsg", response.data.message);
          router.push("/journals");
        }
      } catch (error) {
        if (error.response) {
          context.commit("setErrorState", true);
          context.commit("setMsg", error.response.data.message);
        }
      }
    },

    async getJournalsTs(context, payload) {
      let user = JSON.parse(sessionStorage.getItem("user"));

      let data = {
        _id: user._id,
        ...payload,
      };
      let bearer = "Bearer " + user.authToken
      console.log(bearer);
      try {
        const response = await api.post("/journal/get_ts", data, {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": bearer
          }
        });
        if (response.status == 200) {
          context.commit("setJournals", response.data.journals);
        }
      } catch (error) {
        if (error.response) {
          console.log(error.response);
        }
      }
    },

    async getJournals(context) {
      let user = JSON.parse(sessionStorage.getItem("user"));
      // console.log(user);
      let data = {
        _id: user._id
      };

      let bearer = "Bearer " + user.authToken
      try {
        const response = await api.post("/journal/get", data, {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": bearer
          }
        });
        if (response.status == 200) {
          context.commit("setJournals", response.data.journals);
        }
      } catch (error) {
        if (error.response) {
          console.log(error.response);
        }
      }
    },
    async login(context, credentials) {
      try {
        const response = await api.post("auth/login", credentials);
        if (response.status == 200) {
          context.commit("setAuth", response.data.userData);
          context.commit("setErrorState", false);
          context.commit("setMsg", response.data.message);
        }
      } catch (error) {
        if (error.response) {
          context.commit("setErrorState", true);
          context.commit("setMsg", error.response.data.message);
          console.log(error);
        }
      }
    },

    async registerUser(context, details) {
      try {
        const data = {
          email: details.email,
          password: details.password,
        };

        const response = await api.post("auth/register", data, {
          "Content-Type": "application/json",
          Accept: "application/json",
        });

        if (response.status == 200) {
          router.push("/login")
        }
      } catch (error) {
        if (error.response) {
          context.commit("setErrorState", true);
          context.commit("setMsg", error.response.data.message);
        }
      }
    },
  },

  modules: {},
});
