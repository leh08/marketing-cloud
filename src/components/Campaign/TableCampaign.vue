<template>
    <v-card>
        <v-card-title>
            <v-btn @click="showAddCampaign = true" class="mr-1" outlined>
                <v-icon> mdi-plus </v-icon>
                Add
            </v-btn>
            <v-btn
                @click="showEditCampaign = true"
                :disabled="selected.length !== 1"
                class="mr-1"
                outlined
            >
                <v-icon> mdi-pencil-outline </v-icon>
                Edit
            </v-btn>
            <v-btn
                class="mr-1"
                @click="showDeleteCampaign = true"
                :disabled="!selected.length"
                outlined
            >
                <v-icon> mdi-delete-outline </v-icon>
                Delete
            </v-btn>
            <v-spacer></v-spacer>
            <v-text-field
                @focus="searchClosed = false"
                @blur="searchClosed = true"
                class="expanding-search"
                :class="{ closed: searchClosed && !search }"
                v-model="search"
                prepend-inner-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
                solo
                rounded
                clearable
            ></v-text-field>
        </v-card-title>
        <v-data-table
            v-model="selected"
            :headers="[
                { text: 'Name', value: 'name' },
                { text: 'Locations', value: 'locations' },
                {
                    text: 'Platform - Ad Set',
                    value: 'platforms_ad_sets',
                    width: '600',
                },
            ]"
            :items="campaignData"
            item-key="id"
            :search="search"
            show-select
        ></v-data-table>
        <add-campaign v-model="showAddCampaign" />
        <edit-campaign :selected.sync="selected" v-model="showEditCampaign" />
        <delete-campaign
            :selected.sync="selected"
            v-model="showDeleteCampaign"
        />
    </v-card>
</template>

<script>
import * as dataForge from "data-forge";
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
    components: {
        "add-campaign": require("@/components/Campaign/Modals/AddCampaign.vue")
            .default,
        "edit-campaign": require("@/components/Campaign/Modals/EditCampaign.vue")
            .default,
        "delete-campaign": require("@/components/Campaign/Modals/DeleteCampaign.vue")
            .default,
    },
    computed: {
        ...mapGetters("campaigns", ["campaigns"]),
        campaignData() {
            if (this.campaigns.length) {
                return this.campaigns.map((campaign) => {
                    return {
                        ...campaign,
                        platforms_ad_sets: campaign.platforms_ad_sets.map(
                            (platform_ad_set) => {
                                return (
                                    platform_ad_set.Platform +
                                    " - " +
                                    platform_ad_set["Ad Set"]
                                );
                            }
                        ),
                    };
                });
            } else {
                return [];
            }
        },
    },
    methods: {
        ...mapActions("campaigns", ["fetchCampaigns"]),
        ...mapMutations("campaigns", ["selectSource"]),
    },
    data() {
        return {
            showAddCampaign: false,
            showEditCampaign: false,
            showDeleteCampaign: false,
            searchClosed: true,
            search: null,
            selected: [],
        };
    },
    mounted() {
        this.fetchCampaigns();
    },
};
</script>

<style lang="sass">
.expanding-search
    transition: max-width 0.3s
    &.closed
        max-width: 67px
</style>
