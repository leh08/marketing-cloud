<template>
    <v-text-field
        :value="ad_set"
        @input="$emit('update:ad_set', $event)"
        label="Ad Set"
        autofocus
        clearable
    ></v-text-field>
</template>

<script>
export default {
    props: ["ad_set"],
};
</script>