import campaigns from "@/services/campaigns.js";
import Localbase from "localbase";

import router from "@/router";

let db = new Localbase("db");

const state = {
    loggedIn: false,
};

const mutations = {
    setLoggedIn(state, value) {
        state.loggedIn = value;
    },
};

const actions = {
    async register({ commit }, payload) {
        try {
            const response = await flows.post("users/register", payload);
            router.push("/auth");
        } catch (error) {
            console.log(error);
        }
    },
    async login({ commit }, payload) {
        try {
            const response = await flows.post("users/login", payload);
            db.collection("auth").add(response.data);
            commit("setLoggedIn", true);
        } catch (error) {
            console.log(error);
        }
    },
    async logout({ commit }) {
        try {
            const data = await db
                .collection("auth")
                .limit(1)
                .get();

            const response = await flows.post("users/logout", null, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + data[0].access_token,
                },
            });

            if (response.status === 200) {
                db.collection("auth").delete();
                commit("setLoggedIn", false);
            }
        } catch (error) {
            console.log(error);
        }
    },
    async handleAuthStateChange({ commit }) {
        try {
            const response = await db.collection("auth").get();
            if (response.length) {
                commit("setLoggedIn", true);
            } else {
                commit("setLoggedIn", false);
            }
        } catch (error) {
            console.log(error);
        }
    },
};

const getters = {};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
