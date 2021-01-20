<template>
    <v-select
        :value="locations"
        @input="$emit('update:locations', $event)"
        :items="[
            'Auckland',
            'Wellington',
            'Christchurch',
            'Hamilton',
            'Tauranga',
            'Napier',
            'Dunedin',
            'Palmerston North',
            'New Plymouth',
            'Nelson',
            'Rotorua',
            'Queenstown',
        ]"
        chips
        label="Locations"
        multiple
        required
    ></v-select>
</template>

<script>
export default {
    props: ["locations"],
};
</script>