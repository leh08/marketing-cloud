<template>
    <div class="home">
        <v-data-table
            v-model="selected"
            :headers="headers"
            :items="weathers"
            show-select
        >
        </v-data-table>
        <div v-for="weather in weathers" :key="weather.name">
            <p>
                {{ `city: ${weather.name}` }}
            </p>
            <p>
                {{ `weather: ${weather.weather[0].description}` }}
            </p>
            <p>
                {{ `temp: ${weather.main.temp}` }}
            </p>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "Home",
    data() {
        return {
            weathers: [],
            selected: [],
            headers: [
                {
                    text: "City",
                    value: "city",
                },
                { text: "Weather", value: "weather" },
                { text: "Temperature", value: "temp" },
            ],
        };
    },
    mounted() {
        axios
            .get("http://127.0.0.1:5000/weathers")
            .then((response) => {
                response.data.weathers.forEach((data) => {
                    const city = data.name;
                    const weather = data.weather[0].description;
                    const temp = data.main.temp;
                    this.weathers.push({ city, weather, temp });
                });
            })
            .catch((error) => console.log(error));
    },
};
</script>
