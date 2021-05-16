<template>
    <div class="latestRequestList flexColumnAlignCenter">
        <ul class="flexRowAlignStart">
            <RequestItem
                v-for="request in requestList"
                :key="request.id"
                :request="request"
                :requeststyle="requestStyle"
            />
        </ul>
        <div>
            <RouterLink class="capsuleButton leftItem" to="/requests"
                >リクエスト一覧</RouterLink
            >
            <RouterLink class="capsuleButton" to="/request/new"
                >リクエストしてみる</RouterLink
            >
        </div>
    </div>
</template>

<script>
import RequestItem from "./Requests/RequestItem.vue";
export default {
    components: {
        RequestItem
    },
    props: {
        requests: null
    },
    data() {
        return {
            maxwidth: 900,
            style: {
                width: "900px"
            },
            requestList: Array
        };
    },
    computed: {
        requestStyle() {
            const columnCount = 5;
            const request = `${this.maxwidth / columnCount}px`;
            return {
                width: request
            };
        }
    },
    watch: {
        requests(val) {
            this.requestList = val;
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../../sass/common.scss";
.latestRequestList {
    width: 100%;
    margin-bottom: 60px;
}
ul {
    padding: 0;
    margin-bottom: 30px;
    width: 900px;
    justify-content: start;
    a {
        display: block;
    }
}
.leftItem {
    margin-right: 20px;
}
</style>
