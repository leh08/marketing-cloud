<template>
    <v-text-field
        :value="name"
        @input="$emit('update:name', $event)"
        label="Name*"
        required
        autofocus
        clearable
    ></v-text-field>
</template>

<script>
export default {
    props: ["name"],
};
</script>
