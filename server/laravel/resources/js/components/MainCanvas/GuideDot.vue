<template functional>
    <div
        v-show="stampGuide != -1"
        class="guide"
        :style="$options.styles(props)"
    ></div>
</template>

<script>
export default {
    props: {
        stampGuide: Number,
        colorPalet: Array
    },
    styles(props) {
        return {
            backgroundColor: props.colorPalet[props.stampGuide]
        };
    }
};
</script>

<style></style>
