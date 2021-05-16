<template>
    <RequestsList
        :requests="requests"
        :currentPage="currentPage"
        :lastPage="lastPage"
        :routerPath="routerPath"
    />
</template>

<script>
import RequestsList from "../components/RequestsList.vue";
import { OK } from "../util";
export default {
    components: {
        RequestsList
    },
    props: {
        page: {
            type: Number,
            required: false,
            default: 1
        }
    },
    data() {
        return {
            currentPage: 0,
            lastPage: 0,
            requests: [],
            routerPath: "/requests"
        };
    },
    watch: {
        $route: {
            async handler() {
                this.$store.commit("randing/loadingSwitch", true);
                await this.showRequests();
                this.$store.commit("randing/loadingSwitch", false);
            },
            immediate: true
        }
    },
    methods: {
        async showRequests() {
            const response = await axios.get(
                `/api/requests/?page=${this.page}`
            );
            if (response.status !== OK) {
                this.$store.commit("error/setCode", response.status);
                return false;
            }
            this.requests = response.data.data;
            this.currentPage = response.data.current_page;
            this.lastPage = response.data.last_page;
        }
    }
};
</script>

<style></style>
