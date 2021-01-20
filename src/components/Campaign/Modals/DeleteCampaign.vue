<template>
    <v-dialog v-model="show" persistent max-width="600px">
        <v-card>
            <modal-header>Delete Campaign</modal-header>
            <form @submit.prevent="submitCampaign">
                <v-card-text>
                    <v-container>
                        Are you sure to delete campaign?
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click.stop="show = false"> Close </v-btn>
                    <v-btn text type="submit" color="red"> Delete </v-btn>
                </v-card-actions>
            </form>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
    props: ["value", "selected"],
    components: {
        "modal-header": require("@/components/Campaign/Modals/Shared/ModalHeader.vue")
            .default,
    },
    methods: {
        ...mapActions("campaigns", ["deleteCampaigns"]),
        submitCampaign() {
            const payload = {
                campaign_ids: this.selected.map((campaign) => campaign.id),
            };
            this.deleteCampaigns(payload);
            this.show = false;
            this.$emit("update:selected", []);
        },
    },
    computed: {
        show: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit("input", value);
            },
        },
    },
};
</script>