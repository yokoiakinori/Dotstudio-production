<template>
    <div :style="productstyle" class="flexRowCenter">
        <div
            class="card roundSquareShadow flexRowCenter"
            @mouseleave="currentToggle"
            @mouseenter="currentToggle"
        >
            <transition>
                <div v-show="selectCheck" class="select"></div>
            </transition>
            <Picture
                :colors="colors"
                :product="product"
                :mountedStatus="mountedStatus"
                :alldot="alldot"
                class="flexRow"
            >
            </Picture>
        </div>
    </div>
</template>

<script>
import Picture from "../Products/Pictue.vue";
export default {
    components: {
        Picture
    },
    props: {
        appearIcon: false,
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
        },
        myid() {
            return this.$store.getters["auth/userid"];
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
@import "../../../sass/common.scss";
.card {
    padding: 0;
    margin: 0;
    width: 90%;
    height: 90%;
    position: relative;
    a {
        position: absolute;
        border-radius: 15px;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
        background-color: rgba($maincolor, 0.2);
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-end;
        div {
            margin: 18px 18px 0 0;
            flex-flow: column;
        }
        button {
            transition-duration: 0.3s;
            z-index: 20;
            margin-bottom: 10px;
            width: 60px;
            height: 35px;
            border-radius: 5px;
            background-color: white;
        }
    }
    ul {
        padding: 0;
        margin: 0;
        width: 85%;
        height: 85%;
        list-style-type: none;
    }
}
.product_action_liked {
    background-color: $heartcolor !important;
    transition-duration: 0.3s;
    color: white;
    i {
        color: white;
    }
}
</style>
