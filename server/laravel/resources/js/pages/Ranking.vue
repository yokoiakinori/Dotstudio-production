<template>
    <div class="flexColumnAlignCenter">
        <RankingNavbar class="nav" />
        <RouterView />
    </div>
</template>

<script>
import RankingNavbar from "../components/RankingNavbar.vue";
export default {
    components: {
        RankingNavbar
    }
};
</script>

<style lang="scss" scoped>
.nav {
    width: 800px;
}
</style>
