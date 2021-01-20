<template>
    <v-select
        :value="platform"
        @input="$emit('update:platform', $event)"
        :items="['Facebook', 'DV360']"
        label="Platform"
    ></v-select>
</template>

<script>
export default {
    props: ["platform"],
};
</script>