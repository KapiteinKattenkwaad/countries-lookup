<template>
    <!-- This example requires Tailwind CSS v2.0+ -->
    <nav class=" shadow-lg font-semibold "
         :class="this.$store.state.theme">
        <div class="max-w-5xl mx-auto flex justify-between content-center px-4 py-3 ">
            <p>
                Where in the world?
            </p>
            <div  >
                <p >
                    Dark mode
                </p>
            </div>
        </div>

    </nav>

</template>

<script>
    export default {
        name: 'Navbar',
        props: {},

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
