<template>
    <v-file-input
        v-model="files"
        @change="onChange"
        label="Platform - Ad Set"
    ></v-file-input>
</template>

<script>
import * as dataForge from "data-forge";

export default {
    data() {
        return {
            files: [],
        };
    },
    methods: {
        onChange() {
            this.files.text().then((data) => {
                const df = dataForge.fromCSV(data);
                this.$emit("platformsAdSets", df);
            });
        },
    },
};
</script>