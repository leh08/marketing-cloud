import Vue from "vue";
import Vuex from "vuex";

import campaigns from "./store-campaigns";
import auth from "./store-auth";

Vue.use(Vuex);

export default function() {
    const Store = new Vuex.Store({
        modules: { campaigns, auth },
    });
    return Store;
}
