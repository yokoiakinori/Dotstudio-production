<template>
    <div>
        <LatestRequestsList :requests="requests"></LatestRequestsList>
        <AllProducts
            :products="products"
            :currentPage="currentPage"
            :lastPage="lastPage"
            :routerPath="routerPath"
        ></AllProducts>
    </div>
</template>

<script>
import LatestRequestsList from "../components/LatestRequestsList.vue";
import AllProducts from "../components/AllProducts.vue";
import Axios from "axios";
import { OK } from "../util";
export default {
    components: {
        AllProducts,
        LatestRequestsList
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
            products: [],
            requests: [],
            routerPath: "/"
        };
    },
    watch: {
        $route: {
            async handler() {
                this.$store.commit("randing/loadingSwitch", true);
                await this.showRequests();
                await this.showProducts();
                this.$store.commit("randing/loadingSwitch", false);
            },
            immediate: true
        }
    },
    methods: {
        async showRequests() {
            const response = await axios.get("/api/requests/latest");
            if (response.status !== OK) {
                this.$store.commit("error/setCode", response.status);
                return false;
            }
            this.requests = response.data;
        },
        async showProducts() {
            const response = await axios.get(
                `/api/products/index/?page=${this.page}`
            );
            if (response.status !== OK) {
                this.$store.commit("error/setCode", response.status);
                return false;
            }
            this.products = response.data.data;
            this.currentPage = response.data.current_page;
            this.lastPage = response.data.last_page;
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../../sass/common.scss";
</style>
