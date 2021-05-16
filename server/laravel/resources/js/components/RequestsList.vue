<template>
    <div class="wrapper flexColumnAlignCenter">
        <RouterLink class="capsuleButton" to="/request/new"
            >リクエストしてみる</RouterLink
        >
        <div class="requestsList flexRowAlignStart">
            <RequestItem
                v-for="request in requestList"
                :key="request.id"
                :request="request"
                :requeststyle="requestStyle"
            />
        </div>
        <Pagination
            :currentPage="currentPage"
            :lastPage="lastPage"
            :routerPath="routerPath"
        />
    </div>
</template>

<script>
import Pagination from "./Pagination.vue";
import RequestItem from "./Requests/RequestItem.vue";
export default {
    components: {
        RequestItem,
        Pagination
    },
    props: {
        page: {
            type: Number,
            required: false,
            default: 1
        },
        requests: null,
        routerPath: String,
        currentPage: 0,
        lastPage: 0
    },
    data() {
        return {
            maxwidth: 900,
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
.wrapper {
    width: 100%;
    a {
        margin-bottom: 15px;
    }
}
.requestsList {
    width: 900px;
    margin-bottom: 30px;
}
</style>
