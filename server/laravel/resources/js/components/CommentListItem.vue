<template>
    <div class="flexRow">
        <ThumbnailImage :user="comment.user" class="thumbnail" />
        <div class="content flexColumn">
            <p class="name">{{ comment.user.name }}</p>
            <p>{{ comment.content }}</p>
        </div>
        <p class="date">{{ comment.created_at }}</p>
    </div>
</template>

<script>
import ThumbnailImage from "../components/ThumbnailImage.vue";
export default {
    components: {
        ThumbnailImage
    },
    props: {
        comment: {}
    }
};
</script>

<style lang="scss" scoped>
@import "../../sass/common.scss";
.thumbnail {
    width: 70px;
    height: 70px;
    margin-right: 20px;
}
.content {
    width: 240px;
}
.name {
    font-size: 13px;
}
</style>
