<template>
    <div class="all-countries max-w-5xl px-4 my-12 mx-auto"
    >
        <div class="top-wrapper flex flex-col text-center md:text-left md:justify-between md:flex-row content-center">
            <div class="search">
                <input
                        class="px-6 py-3 text-sm rounded border border-solid"
                        :class="this.$store.state.theme"
                        v-on:keyup="getNameCountry"
                        v-model="nameCountry"
                        placeholder="Search country">
            </div>
            <div class="region mt-4  md:mt-0 relative">
                <label for="region"
                       class="absolute select-region"
                       v-if="isHidden === false ">
                    Select your region</label>
                <select class="border select border-solid cursor-pointer relative"
                        :class="this.$store.state.theme"
                        v-on:click="isHidden = true "
                        @change="getRegion"
                        v-model="region"
                        name="region" id="region">
                    <option disabled value="">Select your region</option>
                    <option class="z-10" v-for="region in regions" :key="region.index"
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
                <h5>
                    Loading
                </h5>
            </div>
        </div>
        <div v-else class="countries-list flex flex-wrap justify-center md:justify-between">
            <div v-for="country in countries" :key="country.name">

                <router-link :to="{ name: 'DetailCountry', params: { name: country.name.toLowerCase() }}">

                    <CountryCard
                            class="country-card flex flex-col flex-wrap rounded shadow-lg my-8"

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

    .select-region {
        position: absolute;
        top: 8px;
        left: 12px;
        z-index: 8;
        @media screen and (max-width: 600px) {
            left: 92px;
        }
    }

    .select {
        width: 13rem;
        border-radius: 3px;
        padding: .5rem 0;
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


    export default {
        name: 'Quiz',
        components: {
            CountryCard
        },
        props: {},
        data() {
            return {
                countries: null,
                region: null,
                nameCountry: null,
                isHidden: false,
                theme: 'theme-light',
                regions: [
                    'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'
                ],
                loading: true,
            }
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
                    console.log(response.data)
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
            getRegion() {
                axios
                    .get(`https://restcountries.eu/rest/v2/region/${this.region}`)
                    .then(response => {
                        this.countries = response.data
                        console.log(this.countries)
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
            hideSelectLabel() {

            }
        },
    }
</script>
