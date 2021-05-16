<template>
    <div class="flexRow padding2 wrapper">
        <Product
            :product="reply.product"
            :productstyle="productStyle"
            class="margin2_right"
        />
        <p>{{ reply.comment }}</p>
    </div>
</template>

<script>
import Product from "../../Products/Product.vue";
export default {
    components: {
        Product
    },
    props: {
        reply: {}
    },
    computed: {
        productStyle() {
            const productSize = "100px";
            return {
                width: productSize,
                height: productSize
            };
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../../../../sass/common.scss";
.wrapper {
    background-color: rgba($maincolor, $alpha: 0.05);
}
</style>
