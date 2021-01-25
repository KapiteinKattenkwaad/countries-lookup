<template>
    <div class="all-countries max-w-5xl px-4 my-12 mx-auto"
    >

        <div class="top-wrapper flex text-center justify-center flex-col content-center">

            <h4 class="title mt-12">
                The capital of <b> {{ rightCountry.name }} </b> is:
            </h4>
            <transition name="fade">
                <div class="countries-wrapper">
                    <button class="randomcountries"
                            :disabled="isDisabled"
                            v-for="country in orderedUsers"
                            :key="country.capital"
                            @click="handleSelectItem(country)">
                        {{ country.capital }}
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

            <p class="points capitalize my-3 ">
                CORRECT: {{ pointsRight }}
            </p>

            <p>
                INCORRECT: {{ wrongPoints }}
            </p>

            <button class="reset"
                    @click="resetPoints">
                reset
            </button>

            <router-link :to="{ name: 'QuizFlags'}">
                <button class="other-game">
                    Flag Game
                </button>
            </router-link>

        </div>
    </div>
</template>

<style lang="scss">

    .title {
        font-size: 1.4rem;
    }

    .other-game {
        text-align: center;
        display: block;
        text-transform: uppercase;
        border: .4px solid white;
        border-radius: 3px;
        padding: 6px;
        width: 10rem;
        margin: 1rem auto;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .5s
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0
    }

    .right {
        color: forestgreen;
    }

    .wrong {
        color: indianred;
    }

    .feedback {
        width: 160px;
        padding: 0 6px;
        height: 60px;
        margin: 0 auto;
        text-align: center;
        font-size: 1.5rem;
    }

    .countries-wrapper {
        height: 220px;
        width: 300px;
        margin: 1rem auto;
        animation: fly-in .3s ease;
    }

    .randomcountries {
        border: 1px solid white;
        border-radius: 60px;
        padding: 8px;
        text-align: center;
        margin: 12px auto;
        min-width: 11rem;
        animation: fly-in .3s ease;
        cursor: pointer;
        box-shadow: 5px 5px 10px rgba(0, 0, 0, .15);
        transition: all .3s ease;

        &:hover {
            box-shadow: none;
            transform: translateY(-2px);
        }
    }

    @keyframes fly-in {
        0% {
            opacity: .4;
            transform: translateX(100px);
        }
        100% {
            opacity: 1;
            transform: translateX(0);
        }
    }

    button {
        display: block;
    }

    .country-card {
        opacity: 0;
        transition: all .3s ease;

        &:hover {
        }
    }

    .points {
        text-transform: uppercase;
    }

    .reset {
        color: indianred;
        border: .4px solid indianred;
        border-radius: 3px;
        padding: 6px;
        text-transform: uppercase;
        width: 10rem;
        transition: all .25s ease-in;
        margin: 1rem auto;

        &:hover {
            background: indianred;
            color: white;
            border-color: white;
        }
    }
</style>

<script>
    import axios from 'axios'
    import _ from 'lodash';


    export default {
        name: 'AllCountries',
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
                localStorage.capitalPoints = newPoints;
            },
            pointsWrong(newWrongPoints) {
                localStorage.capitalPointsWrong = newWrongPoints;
            }
        },

        computed: {
            orderedUsers: function () {
                return _.orderBy(this.randomCountries, 'name')
            },
        },

        mounted() {
            if (localStorage.capitalPoints) {
                this.pointsRight = Number(localStorage.capitalPoints);
            }
            if (localStorage.capitalPointsWrong) {
                this.wrongPoints = Number(localStorage.capitalPointsWrong);
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
                    this.pointsRight++;
                    localStorage.capitalPoints = this.pointsRight;
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
                    localStorage.capitalPointsWrong = this.wrongPoints
                    setTimeout(() => {
                        this.isWrong = false
                    }, 1200)
                }
            },

            resetPoints() {
                this.pointsRight = 0;
                localStorage.capitalPoints = 0
                this.wrongPoints = 0
                localStorage.capitalPointsWrong = 0
            }
        },
    }
</script>
