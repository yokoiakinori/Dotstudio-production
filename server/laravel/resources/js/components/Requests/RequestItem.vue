<template>
    <div class="wrapper flexRowCenter" :style="requeststyle">
        <div class="roundSquareShadow card flexColumnStart">
            <RouterLink :to="`/request/${request.id}`"></RouterLink>
            <h4>{{ abridgementRequestTitle }}</h4>
            <p>{{ abridgementRequestContent }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        request: {},
        requeststyle: { width: 0 }
    },
    computed: {
        abridgementRequestTitle() {
            if (this.request.title.length >= 14) {
                const abridgementRequestTitle = this.request.title.substr(
                    0,
                    13
                );
                return `${abridgementRequestTitle}…`;
            } else {
                return this.request.title;
            }
        },
        abridgementRequestContent() {
            if (this.request.contents.length >= 14) {
                const abridgementRequestContent = this.request.contents.substr(
                    0,
                    13
                );
                return `${abridgementRequestContent}…`;
            } else {
                return this.request.contents;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../../../sass/common.scss";
.wrapper {
    height: 150px;
}
.card {
    position: relative;
    padding: 20px;
    width: 90%;
    height: 90%;
    a {
        position: absolute;
        border-radius: 15px;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
    }
}
</style>
