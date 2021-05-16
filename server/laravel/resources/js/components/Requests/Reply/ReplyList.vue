<template>
    <ul class="flexColumn">
        <ReplyListItem
            v-for="reply in replies"
            :key="reply.id"
            :reply="reply"
            class="replyItem"
        />
    </ul>
</template>

<script>
import ReplyListItem from "./ReplyListItem.vue";
export default {
    components: {
        ReplyListItem
    },
    props: {
        replies: {}
    }
};
</script>

<style lang="scss" scoped>
@import "../../../../sass/common.scss";
.replyItem {
    border-bottom: solid 1px $maincolor;
}
</style>
