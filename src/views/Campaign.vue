<template>
    <div class="flow">
        <table-campaign />
    </div>
</template>

<script>
export default {
    name: "Campaign",
    components: {
        "table-campaign": require("@/components/Campaign/TableCampaign.vue")
            .default,
    },
    data() {
        return {
            searchClosed: true,
            search: null,
        };
    },
};
</script>