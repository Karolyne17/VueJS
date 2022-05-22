import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        token: ''
    },
    getters: {
        token(state) {
            return state.token;
        },
        isConnected(state) {
            return state.token != '';
        },
        headers(state) {
            return {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${state.token}`
            }
        },
        headersMultipart(state) {
            return {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${state.token}`
            }
        }
    },
    mutations: {

    },
    actions: {
        connect({state}, connectInfo) {
            state.token = connectInfo.token;
            console.log(state.token);
        },
        disconnect({state}) {
            state.token = '';
        }
    },
});

export default store;