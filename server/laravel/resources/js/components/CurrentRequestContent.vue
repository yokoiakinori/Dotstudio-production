<template>
    <div>
        <p class="date">{{ request.created_at }}</p>
        <h3>{{ request.title }}</h3>
        <p class="content">{{ request.contents }}</p>
    </div>
</template>

<script>
export default {
    props: {
        request: {}
    }
};
</script>

<style lang="scss" scoped>
@import "../../sass/common.scss";
div {
    padding-bottom: 30px;
    border-bottom: solid 1px rgba($color: $maincolor, $alpha: 0.7);
}
h3 {
    font-size: 26px;
    margin-bottom: 10px;
}
.content {
    font-size: 19px;
}
</style>
