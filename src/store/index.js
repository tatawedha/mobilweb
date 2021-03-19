import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dataSales: [],
    displaySales: [],
    rows: 0,
    showSpinner: false
  },
  mutations: {
    SET_SALES(state, dataSales) {
      state.dataSales = dataSales;
    },
    SET_ROWS(state, rows) {
      state.rows = rows;
    },
    SET_DISPLAY_SALES(state, displaySales) {
      state.displaySales = displaySales;
    },
    SET_SPINNER(state, spinner){
      state.showSpinner = spinner
    }
  },
  actions: {
    fetchData({commit}) {
      commit("SET_SPINNER", true)
      return new Promise((resolve) => {
        setTimeout(async () => {
          const res = await fetch("data.json");
          const val = await res.json();
          resolve(val);
          commit("SET_SPINNER", false)
        }, 1000);
      });
    },
    async fetchSales({ dispatch, commit }) {
      const myJson = await dispatch("fetchData");
      commit("SET_SALES", myJson);
      commit("SET_ROWS", myJson.length);
      const displaySales = myJson.slice(0, 6);
      commit("SET_DISPLAY_SALES", displaySales);
      commit("SET_ROWS", myJson.length);
    },
    async paginate({ commit, state }, { currentPage, perPage }) {
      const start = (currentPage - 1) * perPage;
      const dataSales = state.dataSales.slice(start, start + 6);
      commit("SET_DISPLAY_SALES", dataSales);
    },
    updatePagination({ commit, dispatch }, { myJson, currentPage, perPage }) {
      commit("SET_SALES", myJson);
      commit("SET_ROWS", myJson.length);
      dispatch("paginate", { currentPage, perPage });
    },
    async search({ dispatch }, { text }) {
      const myJson = await this.dispatch("fetchData");
      const values = myJson.filter((val) =>
        val.name.toLowerCase().includes(text.toLowerCase())
      );
      dispatch("updatePagination", {
        myJson: values,
        currentPage: 1,
        perPage: 6,
      });
    },
  },
  getters: {
    dataSales(state) {
      return state.dataSales;
    },
    rows(state) {
      return state.rows;
    },
    displaySales(state) {
      return state.displaySales;
    },
    showSpinner(state){
      return state.showSpinner
    }
  },
  modules: {},
});
