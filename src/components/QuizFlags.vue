<template>
    <div class="all-countries max-w-5xl px-4 my-12 mx-auto"
    >

        <div class="top-wrapper flex text-center justify-center flex-col content-center">

            <h4 class="title mt-12">
               Which country does this flag belong to?
            </h4>
            <img
                    class="h-24 w-32 "
                    width="160px" height="120px"
                    :src=rightCountry.flag :alt=rightCountry.name>
            <transition name="fade">
                <div class="countries-wrapper">
                    <button class="randomcountries"
                            :disabled="isDisabled"
                            v-for="country in orderedUsers"
                            :key="country.name"
                            @click="handleSelectItem(country)">
                        {{ country.name }}
                    </button>
                </div>
            </transition>
            <br>
            <div class="feedback">
                <transition name="fade">
                    <div v-if="isWrong" class="wrong">
                        <h3>
                            TRY AGAIN!
                        </h3>
                    </div>
                    <div v-if="isRight" class="right">
                        <h3>
                            GOOD JOB!
                        </h3>
                    </div>
                </transition>
            </div>

            <p class="points my-3 ">
               CORRECT:  {{ pointsRight }}
            </p>

            <p class="points my-3 ">
               INCORRECT:  {{ wrongPoints }}
            </p>


            <button class="reset"
                    @click="resetPoints">
                reset
            </button>

            <router-link :to="{ name: 'QuizCapitals'}">
                <button class="other-game">
                    Capital Game
                </button>
            </router-link>

        </div>
    </div>
</template>

<style scoped lang="scss">

    img {
        margin: 12px auto;
    }

</style>

<script>
    import axios from 'axios'
    import _ from 'lodash';


    export default {
        name: 'QuizFlags',
        components: {},
        props: {},
        data() {
            return {
                pointsRight: 0,
                wrongPoints: 0,
                theme: 'theme-light',
                randomCountries: [],
                rightCountry: null,
                country: null,
                selectedItem: null,
                isDisabled: false,
                isRight: false,
                isWrong: false
            }
        },
        watch: {
            theme(newTheme) {
                newTheme === "theme-light"
                    ? document.querySelector("html").classList.remove("theme-dark")
                    : document.querySelector("html").classList.add("theme-dark");
            },
            points(newPoints) {
                localStorage.flagPoints = newPoints;
            },
            pointsWrong(newWrongPoints) {
                localStorage.flagPointsWrong = newWrongPoints;
            }
        },

        computed: {
            orderedUsers: function () {
                return _.orderBy(this.randomCountries, 'name')
            },

        },

        mounted() {
            if (localStorage.flagPoints) {
                this.pointsRight = Number(localStorage.flagPoints);
            }
            if (localStorage.flagPointsWrong) {
                this.wrongPoints = Number(localStorage.flagPointsWrong);
            }

            axios
                .get('https://restcountries.eu/rest/v2/all')
                .then(response => {
                    this.countries = response.data
                })
                .then(() => {
                    setTimeout(() => {
                        this.rightCountry = this.countries[Math.floor(Math.random() * this.countries.length)]
                    }, 200)
                })
                .then(() => {
                    setTimeout(() => {
                        this.randomCountries.push(this.rightCountry)
                        for (let i = 0; i < 3; i++) {
                            this.randomCountries.push(this.countries[Math.floor(Math.random() * this.countries.length)])
                        }
                        return this.randomCountries;
                    }, 600)
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(() => {
                    this.loading = false
                })

        },
        methods: {
            getRandomCountry() {
                setTimeout(() => {
                    this.randomCountries.push(this.rightCountry)
                    for (let i = 0; i < 3; i++) {
                        this.randomCountries.push(this.countries[Math.floor(Math.random() * this.countries.length)])
                    }
                    return this.randomCountries;
                }, 600)
            },
            handleSelectItem(country) {
                this.selectedItem = country.capital;
                if (this.selectedItem.trim() === this.rightCountry.capital.trim()) {
                    this.isDisabled = true;
                    this.isRight = true;
                    this.pointsRight++
                    localStorage.flagPoints = this.pointsRight
                    setTimeout(() => {
                        this.randomCountries = []
                        this.isRight = false;
                        this.rightCountry = this.countries[Math.floor(Math.random() * this.countries.length)]
                        this.getRandomCountry()
                        this.isDisabled = false;
                    }, 800)
                } else {
                    this.isWrong = true;
                    this.isRight = false;
                    this.wrongPoints++;
                    localStorage.flagPointsWrong = this.wrongPoints
                    setTimeout(() => {
                        this.isWrong = false
                    }, 1200)
                }
            },

            resetPoints() {
                this.pointsRight = 0
                this.points = 0;
                localStorage.flagPoints = 0
                this.wrongPoints = 0
                localStorage.flagPointsWrong = 0
            }
        },
    }
</script>
