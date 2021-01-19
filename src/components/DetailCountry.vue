<template>
    <div class="detail-country">
        <Navbar/>
        <div class="detail-country-wrapper max-w-5xl mx-auto px-1">
            <router-link :to="{ name: 'Home'}">
                <div class="back-button flex content-center shadow-lg rounded border-solid
                            px-6 py-4 mt-8 flex mx-auto md:mx-0 w-24 ">
                    Back
                </div>
            </router-link>
            <div class="detail-wrapper flex items-center flex-col md:flex-row justify-between mt-16 text-center md:text-left ">
                <div class="left-flag flex-1">
                    <img
                            class="mx-auto mb-6 md:m-0 w-2/3"
                            :src=singleCountry.flag :alt=singleCountry.name>
                </div>
                <div class="right-info flex-1">
                    <h3
                            class="font-extrabold text-2xl mb-5"
                    >
                        {{ singleCountry.name }}
                    </h3>
                    <div class="sub-details-wrapper md:flex">
                        <div class="left">
                            <p>
                                <b>
                                    Native name:
                                </b>
                                {{ singleCountry.nativeName }}
                            </p>
                            <p>
                                <b>
                                    Population:
                                </b>
                                {{ singleCountry.population }}
                            </p>
                            <p>
                                <b>
                                    Region:
                                </b>
                                {{ singleCountry.region }}
                            </p>
                            <p>
                                <b>
                                    Sub Region:
                                </b>
                                {{ singleCountry.subregion }}
                            </p>
                            <p>
                                <b>
                                    Capital:
                                </b>
                                {{ singleCountry.capital }}
                            </p>

                        </div>
                        <div class="right">
                            <p>
                                <b>
                                    Top Level Domain:
                                </b>
                                {{ singleCountry.topLevelDomain[0] }}
                            </p>
                            <p>
                                <b>
                                    Currencies:
                                </b>
                                <span v-for="currency in singleCountry.currencies" :key="currency.index">
                                    {{ currency.name }}
                                </span>
                            </p>
                            <p>
                                <b>
                                    Languages:
                                </b>
                                <span v-for="language in singleCountry.languages" :key="language.index">
                                    {{ language.name }}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>


        </div>


    </div>
</template>

<script>
    import axios from 'axios'
    import Navbar from "./NavBar";

    export default {
        name: 'DetailCountry',
        components: {Navbar},
        props: {
            country: String,

        },
        data() {
            return {
                singleCountry: {}
            }
        },
        methods: {
            getSingleCountry() {
                axios.get(`https://restcountries.eu/rest/v2/name/${this.$route.params.name}`)
                    .then(response => {
                        console.log(response)
                        this.singleCountry = response.data[0]
                    }).catch(error => {
                    console.log(error)
                })
            }
        },
        created() {
            this.getSingleCountry()
        }
    }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.left-flag  {
    animation: fly-in .3s ease;
}
.right-info {
    animation: fly-in .5s ease;
}

    @keyframes fly-in {
        0% {
            opacity: 0;
            transform: translateX(600px);
        }
        90% {
            opacity: 1;
            transform: translateX(-20px)
        }
        100% {
            transform: translateX(0)
        }
    }
</style>
