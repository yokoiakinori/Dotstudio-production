<template>
    <div class="flexRowCenter" :style="productstyle">
        <div class="card flexRowCenter">
            <transition>
                <div v-show="selectCheck" class="select"></div>
            </transition>
            <Picture
                :colors="colors"
                :product="product"
                :mountedStatus="mountedStatus"
                :alldot="alldot"
            ></Picture>
        </div>
    </div>
</template>

<script>
import Picture from "../components/Products/Pictue.vue";
export default {
    components: {
        Picture
    },
    props: {
        product: {},
        productstyle: {
            width: 0,
            height: 0
        },
        selectCheck: Boolean
    },
    data() {
        return {
            mountedStatus: false,
            current: false
        };
    },
    computed: {
        colors() {
            return this.product.colors.split("_");
        },
        alldot() {
            return Number(this.product.alldot);
        }
    },
    methods: {
        currentToggle() {
            this.current = !this.current;
        }
    },
    created() {
        this.$nextTick(function() {
            this.mountedStatus = true;
        });
    }
};
</script>

<style lang="scss" scoped>
@import "../../sass/common.scss";
.card {
    background-color: white;
    padding: 0;
    margin: 0;
    width: 90%;
    height: 90%;
    border-radius: 15px;
    border: solid 1px rgba($maincolor, 0.5);
    ul {
        padding: 0;
        margin: 0;
        width: 85%;
        height: 85%;
        list-style-type: none;
    }
}
</style>
