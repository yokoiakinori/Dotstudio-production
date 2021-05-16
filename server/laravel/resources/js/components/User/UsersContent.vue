<template>
    <li @click="currentContent">
        <p
            :class="{
                'tab_item-active': isactive,
                'tab_item-nonactive': !isactive
            }"
        >
            {{ contentname }}
        </p>
    </li>
</template>

<script>
export default {
    props: {
        contentname: String,
        isactive: Boolean
    },
    methods: {
        currentContent() {
            this.$emit("currentContent");
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../../../sass/common.scss";
.tab_item-nonactive {
    transition-duration: 0.4s;
    border-bottom: solid 1.2px rgba($maincolor, 0);
}
.tab_item-active {
    transition-duration: 0.4s;
    border-bottom: solid 1.2px $maincolor;
}
</style>
