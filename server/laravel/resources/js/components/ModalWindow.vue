<template>
    <div id="overlay" class="flexRowCenter" @click.stop="closeModal">
        <form id="window" @click.stop @submit.prevent="formEnter">
            <slot></slot>
            <div class="flexRowSpaceBetween">
                <button @click="closeModal">キャンセル</button>
                <button type="submit" class="decision">OK</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    methods: {
        closeModal() {
            this.$emit("closeModal");
        },
        formEnter() {
            this.$emit("formEnter");
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../../sass/common.scss";
#overlay {
    z-index: 30;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
}
#window {
    z-index: 40;
    width: 40%;
    height: 70%;
    padding: 40px;
    background: white;
    border-radius: 20px;
    input {
        width: 100%;
        height: 20px;
    }
}
button {
    width: 47%;
    height: 40px;
    background-color: rgba($maincolor, 0.3);
    color: $maincolor;
    font-size: 18px;
    border-radius: 5px;
    cursor: pointer;
}
.decision {
    background-color: $maincolor;
    color: white;
}
.previewImage {
}
img {
    width: 424px;
    height: 424px;
    object-fit: cover;
    margin-bottom: 5px;
}
</style>
