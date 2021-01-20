import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import campaigns from "@/services/campaigns.js";

const state = {
    campaigns: [],
    sources: [],
    selectedSource: null,
};

const mutations = {
    updateCampaign(state, payload) {
        const foundIndex = state.campaigns.findIndex(
            (campaign) => campaign.id === payload.id
        );
        state.campaigns[foundIndex] = payload;
    },
    deleteCampaigns(state, ids) {
        const newCampaigns = state.campaigns.filter(
            (campaign) => !ids.includes(campaign.id)
        );
        state.campaigns = newCampaigns;
    },
    addCampaign(state, payload) {
        state.campaigns.push(payload.campaign);
    },
    addCampaigns(state, campaigns) {
        state.campaigns = campaigns;
    },
};

const actions = {
    async updateCampaign({ commit }, campaign) {
        try {
            const response = await campaigns.patch(
                `campaigns/${campaign.id}`,
                campaign
            );
            commit("updateCampaign", response.data);
        } catch (error) {
            console.log(error);
        }
    },
    deleteCampaign({ commit }, ids) {
        commit("deleteCampaign", ids);
    },
    async addCampaign({ commit }, campaign) {
        try {
            const response = await campaigns.post("campaigns/", campaign);
            commit("addCampaign", response.data);
        } catch (error) {
            console.log(error);
        }
    },
    async fetchCampaigns({ commit }) {
        try {
            const response = await campaigns.get("campaigns/");
            const data = response.data.campaigns;
            commit("addCampaigns", data);
        } catch (error) {
            console.log(error);
        }
    },

    async deleteCampaigns({ commit }, payload) {
        try {
            await campaigns.post("campaigns/delete", payload);
            commit("deleteCampaigns", payload.campaign_ids);
        } catch (error) {
            console.log(error);
        }
    },
};

const getters = {
    campaigns: (state) => {
        if (state.campaigns.length) {
            const campaigns = state.campaigns.map((campaign) => {
                return {
                    ...campaign,
                    platforms_ad_sets: _.sortBy(campaign.platforms_ad_sets, [
                        "Platform",
                        "Ad Set",
                    ]),
                };
            });
            return campaigns;
        } else {
            return [];
        }
    },
    getCampaignById: (state) => (id) => {
        return state.campaigns.find((campaign) => campaign.id === id);
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
