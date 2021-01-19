<template>
  <div class="home">
    <Navbar />
  <AllCountries />
  </div>
</template>

<script>
// @ is an alias to /src
import AllCountries from "../components/AllCountries";
import Navbar from "../components/NavBar";
import { mapGetters } from "vuex";

export default {
  name: 'Home',
  components: {
      Navbar,
    AllCountries,

  },
  beforeMount() {
    this.$store.dispatch("initTheme");
  },
  computed: {
    ...mapGetters({ theme: "getTheme" }),
  },
  watch: {
    theme(newTheme) {
      if (newTheme === "theme-light") {
        document.querySelector("html").classList.remove("theme-light")
        document.querySelector("html").classList.add("theme-dark")
      } else if (newTheme === 'theme-dark') {
        document.querySelector("html").classList.remove("theme-dark")
        document.querySelector("html").classList.add("theme-light")
      }

    },
  },
  methods: {
    toggleTheme() {
      this.$store.dispatch("toggleTheme");
    },
  },
}
</script>
