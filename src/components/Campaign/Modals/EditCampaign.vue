<template>
    <v-dialog
        v-model="show"
        @keydown.esc="show = false"
        persistent
        max-width="600px"
    >
        <v-card v-if="this.campaignToSubmit">
            <modal-header>Edit Task</modal-header>
            <form @submit.prevent="submitCampaign">
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <modal-campaign-name
                                    :name.sync="campaignToSubmit.name"
                                />
                            </v-col>
                            <v-col cols="12">
                                <modal-campaign-locations
                                    :locations.sync="campaignToSubmit.locations"
                                />
                            </v-col>
                            <v-col cols="12">
                                <v-combobox
                                    multiple
                                    v-model="campaignToSubmit.platforms_ad_sets"
                                    :item-text="
                                        (item) =>
                                            item.Platform +
                                            ' - ' +
                                            item['Ad Set']
                                    "
                                    label="Platform - Ad Set"
                                    append-icon
                                    chips
                                    deletable-chips
                                >
                                </v-combobox>
                            </v-col>
                            <v-col cols="12">
                                <modal-campaign-platforms-ad-sets
                                    @platformsAdSets="setPlatformsAdSets"
                                />
                            </v-col>

                            <v-col cols="12">
                                <modal-campaign-platform
                                    :platform.sync="platform"
                                />
                            </v-col>
                            <v-col cols="12">
                                <modal-campaign-ad-set :ad_set.sync="ad_set" />
                            </v-col>
                            <v-col cols="12">
                                <v-btn
                                    rounded
                                    outlined
                                    large
                                    @click="addPlatformAdSet"
                                >
                                    Add
                                </v-btn>
                            </v-col>
                            <v-col cols="12">
                                <small>*indicates required field</small>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click.stop="show = false"> Close </v-btn>
                    <v-btn text type="submit"> Submit </v-btn>
                </v-card-actions>
            </form>
        </v-card>
    </v-dialog>
</template>

<script>
import _ from "lodash";
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
    props: ["value", "selected"],
    components: {
        "modal-header": require("@/components/Campaign/Modals/Shared/ModalHeader.vue")
            .default,
        "modal-campaign-name": require("@/components/Campaign/Modals/Shared/ModalCampaignName.vue")
            .default,
        "modal-campaign-platforms-ad-sets": require("@/components/Campaign/Modals/Shared/ModalCampaignPlatformsAdSets.vue")
            .default,
        "modal-campaign-platform": require("@/components/Campaign/Modals/Shared/ModalCampaignPlatform.vue")
            .default,
        "modal-campaign-ad-set": require("@/components/Campaign/Modals/Shared/ModalCampaignAdSet.vue")
            .default,
        "modal-campaign-locations": require("@/components/Campaign/Modals/Shared/ModalCampaignLocations.vue")
            .default,
    },
    data() {
        return {
            platform: null,
            ad_set: null,
        };
    },
    methods: {
        ...mapActions("campaigns", ["updateCampaign"]),
        submitCampaign() {
            this.updateCampaign(this.campaignToSubmit);
            this.show = false;
            this.$emit("update:selected", []);
        },
        setPlatformsAdSets(df) {
            this.campaignToSubmit.platforms_ad_sets = _.uniqWith(
                [...this.campaignToSubmit.platforms_ad_sets, ...df.toArray()],
                _.isEqual
            );
        },
        addPlatformAdSet() {
            if (this.platform && this.ad_set) {
                this.campaignToSubmit.platforms_ad_sets.push({
                    Platform: this.platform,
                    "Ad Set": this.ad_set,
                });
                this.ad_set = null;
            }
        },
    },
    computed: {
        ...mapGetters("campaigns", ["getCampaignById"]),
        show: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit("input", value);
            },
        },
        campaignToSubmit() {
            if (this.selected.length) {
                const campaign = this.getCampaignById(this.selected[0].id);
                return campaign;
            }
        },
    },
};
</script>