import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// when to thinking of vuex, first thought would be - what states do I have?
// bank balance
// result of every game - (so that we can show stats (scores for both, money lost, final result, % of winning based on number of rounds played))
// pop up the result (new component) -  when click on button `end game` or button `show stats`
// maybe - compute result (of the game)
// next app idea - stock portfolio tracker

export default new Vuex.Store({
  state: {
    loadingStatus: "notLoading",
    todos: [],
    count: 0,
    user: null
  },
  // mutations are synchronous
  // Always put mutations within actions - to future proof an app, to incresse scalability
  mutations: {
    SET_LOADING_STATUS(state, status) {
      state.loadingStatus = status;
    },
    SET_TODOS(state, todos) {
      state.todos = todos;
    },
    INCREMENT_COUNT(state, value) {
      state.count += value;
    }
  },
  //   we will have to dispatch action like this.$store.dispatch('fetchTodos')
  // actions are asynchronous
  // actions can wrap business logic around mutations
  // context object is an object that contains all the properties on
  // the vuex store such as state, commit and getters
  actions: {
    fetchTodos(context) {
      context.commit("SET_LOADING_STATUS", "loading");
      context.commit("SET_TODOS", [
        { id: 1, done: false },
        { id: 2, done: true }
      ]);
    },
    updateCount({ state, commit }, value) {
      if (state.user) {
        commit("INCREMENT_COUNT", value);
      }
    }
  },
  getters: {
    doneTodos(state) {
      return state.todos.filter(todo => todo.done);
    },
    // nested getters (getter as an argument)
    activeTodosCount: (state, getters) => {
      return state.todos.length - getters.doneTodos.length;
    },
    // dynamic getter
    getTodosById: state => id => {
      return state.todos.find(todo => todo.id === id);
    }
  }
});
