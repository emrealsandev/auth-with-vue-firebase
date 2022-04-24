import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: "",
    fbAPIKey: "AIzaSyBCbmHZupV1GvH_EUrJgDpjVJ2Da4Z0i9M",

  },
  getters: {
      isAuthenticated(state){
        return state.token !== ""
      }
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    clearToken(state) {
      state.token = ""
    },
  },
  actions: {
    initAuth({dispatch,commit}){
      let token = localStorage.getItem("token")
      if (token) {


        let expirationDate = localStorage.getItem("expirationDate")
        let time = new Date().getTime()

        if (time >= +expirationDate) {
          console.log("token süresi geçmiş")
          dispatch("logout")
        }else{
          commit("setToken", token);
          router.push("/")
        }  
      }else{
        router.push("/auth");
        return false
      }
    },
    login({ commit, dispatch, state }, authData) {
      let authLink = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="
      if (authData.isUser) {
        authLink = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="
      }


      return axios.post(authLink + "AIzaSyBCbmHZupV1GvH_EUrJgDpjVJ2Da4Z0i9M",
        { email: authData.email, password: authData.password, returnSecureToken: true }
      ).then(response => {
        commit("setToken", response.data.idToken);
        localStorage.setItem("token",response.data.idToken)
        localStorage.setItem("expirationDate", new Date().getTime() + 5000)

        dispatch("setTimeoutTimer", + 5000)




      })
    },
    logout({ commit, dispatch, state }) {
      commit("clearToken")
      localStorage.removeItem("token");
      localStorage.removeItem("expirationDate");
      this.$router.replace("/auth")
    },
    setTimeoutTimer({dispatch},expiresIn){
      setTimeout(()=>{
        dispatch("logout")
      },expiresIn)
    }
  },
  modules: {
  }
})
