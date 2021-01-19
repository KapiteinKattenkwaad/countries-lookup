import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
      state: {
        theme: 'theme-dark'
      },
      mutations: {
        SET_THEME(state, theme) {
          state.theme = theme;

        }
      },
      actions: {

        toggleTheme({ state,commit }) {
          if (state.theme === 'theme-light') {
            commit('SET_THEME', 'theme-dark')
          } else if (state.theme === 'theme-dark') {
            commit('SET_THEME', 'theme-light')
          } else {
            commit('SET_THEME', 'theme-light')
          }

        }

      },

      getters: {
        getTheme: (state) => {
          return state.theme;
        }

  },
  modules: {
  }
})
