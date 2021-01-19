<template>
    <div class="all-countries max-w-5xl px-4 my-12 mx-auto"
    >
        <button @click="toggleTheme">
            toggle theme

        </button>

        <div class="top-wrapper flex flex-col text-center md:text-left md:justify-between md:flex-row content-center">
            <div class="search">
                <input
                        class="px-6 py-3 text-sm rounded border border-solid"
                        :class="this.$store.state.theme"
                        v-on:keyup="getNameCountry"
                        v-model="nameCountry"
                        placeholder="Search country">
            </div>
            <div class="region mt-4  md:mt-0">

                <select class="border border-solid "
                        :class="this.$store.state.theme"
                        @change="getRegion"
                        v-model="region"
                        name="region" id="region">
                    <option value="" key="0">Select your region</option>
                    <option v-for="region in regions" :key="region.index"
                            :value="region">
                        {{ region }}
                    </option>
                </select>
            </div>
        </div>
        <div v-if="loading">

            <div class="globe-wrapper flex justify-center flex-col text-center">
                <img class="globe"
                     src="./../assets/icons/worldwide.svg" alt="globe">
                <p>
                    Loading
                </p>
            </div>
        </div>
        <div v-else class="countries-list flex flex-wrap justify-center md:justify-between">
            <div v-for="country in countries" :key="country.name">

                <router-link :to="{ name: 'DetailCountry', params: { name: country.name }}">

                    <CountryCard
                            class="country-card flex flex-col flex-wrap rounded shadow-lg my-8"
                            :class="this.$store.state.theme"
                            :country=country
                    >
                    </CountryCard>
                </router-link>
            </div>
        </div>

    </div>
</template>

<style scoped lang="scss">
    .globe {
        width: 40vw;
        max-height: 60vh;
        margin: 4rem auto;
        animation: spin-around 3s linear infinite alternate-reverse;
    }

    @keyframes spin-around {
        0% {
            transform: rotateZ(0deg);
        }
        40% {
            transform: scale(.75);
        }
        100% {
            transform: scale(.45);
            opacity: .6;
        }
    }

    .dropdown {
        position: relative;
        display: inline-block;
    }

    .dropdown-content {
        display: none;
        position: absolute;
        min-width: 160px;
        padding: 12px 16px;
        z-index: 1;
    }

    .dropdown:hover .dropdown-content {
        display: block;
    }

    .search {
        input {
            &:before {
                background-image: url("./../assets/icons/loupe.svg");
                width: 6px;
                height: 6px;
                content: '';
            }

            ::placeholder {
                color: white;
            }
        }
    }

    @media screen and (max-width: 495px) {
        .countries-list {
            justify-content: center;
        }
    }

    .country-card {
        opacity: 0;
        transition: all .3s ease;

        &:hover {
        }
    }
</style>

<script>
    import axios from 'axios'
    import CountryCard from "./CountryCard";
    import gsap from 'gsap'
    import {mapGetters} from "vuex";

    export default {
        name: 'AllCountries',
        components: {CountryCard},
        props: {},
        data() {
            return {
                countries: null,
                region: null,
                nameCountry: null,
                theme: 'theme-light',
                regions: [
                    'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'
                ],
                loading: true,
            }
        },
        computed: {
            ...mapGetters({theme: "getTheme"}),
        },
        watch: {
            theme(newTheme) {
                newTheme === "theme-light"
                    ? document.querySelector("html").classList.remove("theme-dark")
                    : document.querySelector("html").classList.add("theme-dark");
            },
        },

        mounted() {
            axios
                .get('https://restcountries.eu/rest/v2/all')
                .then(response => {
                    console.log(response.data[0])
                    this.countries = response.data

                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(() => {
                    this.loading = false

                    setTimeout(() => {
                        gsap.to(".country-card", {
                            duration: .3,
                            scale: 1,
                            opacity: 1,
                            stagger: 0.18
                        });
                    })
                })
        },
        methods: {
            toggleTheme() {
                this.$store.dispatch("toggleTheme");
            },
            getRegion() {
                axios
                    .get(`https://restcountries.eu/rest/v2/region/${this.region}`)
                    .then(response => {
                        this.countries = response.data
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
                    .finally(() => this.loading = false)
            },
            getNameCountry() {
                axios
                    .get(`https://restcountries.eu/rest/v2/name/${this.nameCountry}`)
                    .then(response => {
                        console.log('response', response.data)
                        this.countries = response.data
                    })
                    .catch(function (error) {
                        console.log(error)
                    })

            },
        },
    }
</script>
