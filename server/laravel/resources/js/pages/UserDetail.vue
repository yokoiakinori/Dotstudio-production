<template>
    <div class="userDetail flexColumnAlignCenter">
        <div class="userInformation flexRowAlignCenter" v-if="appear">
            <ThumbnailImage :user="user" class="thumbnail infomationItem" />
            <div class="informationItem flexColumn">
                <h2 class="username margin1_bottom">{{ user.name }}</h2>
                <p class="userintroduction">{{ user.introduction }}</p>
            </div>
            <div class="informationItem flexRow">
                <p>
                    <router-link :to="`/follow/${id}`">
                        <span>{{ user.follows.length }}</span
                        ><br />
                        フォロー
                    </router-link>
                </p>
                <p>
                    <router-link :to="`/follower/${id}`">
                        <span>{{ user.followers.length }}</span>
                        <br />
                        フォロワー
                    </router-link>
                </p>
            </div>
            <router-link
                :to="`/settings/${id}`"
                class="settings margin2_left"
                v-if="id == userid"
            >
                <i class="fas fa-cog"></i>
            </router-link>
        </div>

        <ul class="tab flexRowSpaceBetween">
            <UsersContent
                :contentname="content.name"
                :isactive="content.name == currentContentName"
                @currentContent="currentContent(content.name)"
                v-for="content in contentList"
                :key="content.name"
                class="flexRowCenter"
            />
        </ul>
        <div
            class="flexRowAlignStart"
            :style="style"
            v-if="products.length >= 1"
        >
            <Product
                v-for="product in products"
                :key="product.id"
                :product="product"
                :appearLike="true"
                @like="onLikeClick"
                :productstyle="productStyle"
            />
        </div>
        <div class="flexRowAlignStart" v-else-if="requests.length >= 1">
            <RequestItem
                v-for="request in requests"
                :key="request.id"
                :request="request"
                :requeststyle="requestStyle"
            />
        </div>

        <Pagination :current-page="currentPage" :last-page="lastPage" />
    </div>
</template>

<script>
import Pagination from "../components/Pagination.vue";
import Product from "../components/Products/Product.vue";
import ThumbnailImage from "../components/ThumbnailImage.vue";
import UsersContent from "../components/User/UsersContent.vue";
import RequestItem from "../components/Requests/RequestItem.vue";
import Axios from "axios";
import { OK, CREATED, UNPROCESSABLE_ENTITY } from "../util";
export default {
    components: {
        Pagination,
        Product,
        ThumbnailImage,
        UsersContent,
        RequestItem
    },
    props: {
        id: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            currentPage: 0,
            lastPage: 0,
            maxwidth: 900,
            products: [],
            requests: [],
            appear: false,
            style: {
                width: "900px"
            },
            contentList: [
                {
                    name: "投稿作品"
                },
                {
                    name: "お気に入り"
                },
                {
                    name: "リクエスト"
                }
            ],
            currentContentName: "投稿作品",
            user: {}
        };
    },
    computed: {
        productStyle() {
            const columnCount = 3;
            const product = `${this.maxwidth / columnCount}px`;
            return {
                width: product,
                height: product
            };
        },
        requestStyle() {
            const columnCount = 5;
            const request = `${this.maxwidth / columnCount}px`;
            return {
                width: request
            };
        },
        userid() {
            return this.$store.getters["auth/userid"];
        }
    },
    watch: {
        $route: {
            async handler() {
                this.$store.commit("randing/loadingSwitch", true);
                await this.showUser();
                this.showProducts();
                this.$store.commit("randing/loadingSwitch", false);
                this.appear = true;
            },
            immediate: true
        },
        currentContentName: function(val) {
            if (val == "投稿作品") {
                this.showProducts();
            } else if (val == "お気に入り") {
                this.showLikeProducts();
            } else if (val == "リクエスト") {
                this.showRequests();
            }
        }
    },
    methods: {
        onLikeClick({ id, liked }) {
            if (!this.$store.getters["auth/check"]) {
                alert("いいね機能を使うにはログインしてください。");
                return false;
            }

            if (liked) {
                this.unlike(id);
            } else {
                this.like(id);
            }
        },

        reset() {
            this.products.length = 0;
            this.requests.length = 0;
        },
        errorResponse(val) {
            if (val.status !== OK) {
                this.$store.commit("error/setCode", val.status);
                return false;
            }
        },
        setPageInformation(val) {
            this.currentPage = val.data.current_page;
            this.lastPage = val.data.last_page;
        },

        async showProducts() {
            this.reset();
            const response = await axios.get(
                `/api/users/products/${this.id}/?page=${this.page}`
            );
            this.errorResponse(response);
            this.products = response.data.data;
            this.setPageInformation(response);
        },

        async showLikeProducts() {
            this.reset();
            const response = await axios.get(
                `/api/users/likeproducts/${this.id}/?page=${this.page}`
            );
            this.errorResponse(response);
            this.products = response.data.data;
            this.setPageInformation(response);
        },

        async showRequests() {
            this.reset();
            const response = await axios.get(
                `/api/user/${this.id}/requests/?page=${this.page}`
            );
            this.errorResponse(response);
            this.requests = response.data.data;
            this.setPageInformation(response);
        },

        async showUser() {
            const response = await axios.get(`/api/users/${this.id}`);
            this.errorResponse(response);
            this.user = response.data[0];
        },

        async like(id) {
            const response = await axios.put(`/api/products/${id}/like`);
            this.errorResponse(response);
            this.products = this.products.map(product => {
                if (product.id == response.data.product_id) {
                    product.likes_count += 1;
                    product.liked_by_user = true;
                }
                return product;
            });
        },

        async unlike(id) {
            const response = await axios.delete(`/api/products/${id}/like`);
            this.errorResponse(response);
            this.products = this.products.map(product => {
                if (product.id == response.data.product_id) {
                    product.likes_count -= 1;
                    product.liked_by_user = false;
                }
                return product;
            });
        },

        currentContent(val) {
            this.currentContentName = val;
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../../sass/common.scss";
.userDetail {
    padding-top: 30px;
    margin: 0 auto;
    margin-top: 0;
    width: 100%;
}
.userInformation {
    width: 850px;
}
.informationItem {
    border-right: solid 1px $maincolor;
    padding: 0 15px;
    p {
        text-align: center;
        @extend .margin1_side;
    }
    span {
        font-weight: bold;
        font-size: 27px;
        color: $maincolor;
    }
    a {
        font-size: 13px;
        color: rgba($color: $maincolor, $alpha: 0.6);
    }
}
.settings {
    font-size: 20px;
}
.thumbnail {
    width: 130px;
    height: 130px;
}
.tab {
    width: 40%;
    height: 85px;
    margin: 0;
    padding: 0;
    text-align: center;
    li {
        font-size: 18px;
        width: 30%;
        height: 65%;
        p {
            display: inline-block;
            margin: 0;
        }
    }
}
</style>
