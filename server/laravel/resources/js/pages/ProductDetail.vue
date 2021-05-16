<template>
    <div v-if="product" class="productDetail flexRow margin1-5_top">
        <Product :product="product" :productstyle="productStyle" />
        <div class="productInformation margin1-5_top">
            <div class="flexRowSpaceBetween margin1_top">
                <h2>{{ product.productname }}</h2>
                <p class="date">作成日：{{ product.created_at }}</p>
            </div>
            <ul class="flexRow margin2_top">
                <li
                    v-for="tag in product.producttags"
                    :key="tag.id"
                    class="flexRowAlignCenter"
                >
                    <RouterLink to="/tagsearch?page=1">
                        <ProductTag :message="tag.message"></ProductTag>
                    </RouterLink>
                </li>
            </ul>
            <MaterialAddButton
                v-if="isLogin && otherProduct"
                @click="addMaterialNotification"
                :state="'detail'"
                :product="product"
                class="margin2_top"
            />
            <ul class="flexRow margin2_top">
                <li
                    v-for="material in product.usedmaterial"
                    :key="material.id"
                    class="flexRowAlignCenter"
                >
                    {{ material.user.name }}さんの{{
                        material.productname
                    }}が使用されています。
                </li>
            </ul>
            <div class="evaluations">
                <ThumbnailImage
                    :user="product.user"
                    class="thumbnail margin1-5_right"
                />
                <p class="margin3_right">
                    <i class="fas fa-heart heartIcon"></i
                    >{{ product.likes_count }}
                </p>
                <p><i class="fas fa-eye"></i>{{ product.countview }}</p>
            </div>
        </div>
        <div class="comments margin3_side">
            <h2>Comments</h2>
            <ul v-if="product.comments.length > 0">
                <CommentListItem
                    v-for="comment in product.comments"
                    :key="comment.id"
                    :comment="comment"
                    class="commentItem"
                />
            </ul>
            <p v-else class="margin1-5_bottom">まだコメントはありません。</p>
            <form
                v-if="isLogin"
                @submit.prevent="addComment"
                class="commentForm flexColumnAlignCenter"
            >
                <div v-if="commentErrors">
                    <ul v-if="commentErrors.content">
                        <li v-for="msg in commentErrors.content" :key="msg">
                            {{ msg }}
                        </li>
                    </ul>
                </div>
                <textarea
                    v-model="commentContent"
                    class="margin2_bottom"
                ></textarea>
                <div>
                    <button type="submit" class="capsuleButton">
                        コメントをつける
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import Axios from "axios";
import { OK, CREATED, UNPROCESSABLE_ENTITY } from "../util";
import Product from "../components/Products/Product.vue";
import ProductTag from "../components/ProductTag.vue";
import ThumbnailImage from "../components/ThumbnailImage.vue";
import CommentListItem from "../components/CommentListItem.vue";
import MaterialAddButton from "../components/MaterialAddButton.vue";
import notification from "../mixin/notification";
export default {
    mixins: [notification],
    components: {
        Product,
        ProductTag,
        ThumbnailImage,
        CommentListItem,
        MaterialAddButton
    },
    props: {
        id: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            product: null,
            productStyle: {
                width: "500px",
                height: "500px"
            },
            commentContent: "",
            commentErrors: null
        };
    },
    computed: {
        isLogin() {
            return this.$store.getters["auth/check"];
        },
        otherProduct() {
            return this.product.user.id != this.$store.getters["auth/userid"];
        },
        authName() {
            return this.$store.getters["auth/username"];
        }
    },
    watch: {
        $route: {
            async handler() {
                this.$store.commit("randing/loadingSwitch", true);
                await this.showProduct();
                this.$store.commit("randing/loadingSwitch", false);
            },
            immediate: true
        }
    },
    methods: {
        async showProduct() {
            const response = await axios.get(`/api/product/${this.id}`);
            if (response.status !== OK) {
                this.$store.commit("error/setCode", response.status);
                return false;
            }
            this.product = response.data;
        },
        async addComment() {
            const response = await axios.post(
                `/api/products/${this.id}/comments`,
                {
                    content: this.commentContent
                }
            );

            if (response.status === UNPROCESSABLE_ENTITY) {
                this.commentErrors = response.data.errors;
                return false;
            }
            const message = `${this.authName}さんがコメントしました。「${this.commentContent}」`;
            const id = this.product.user.id;
            this.inputNotification(message, id); //mixin[notification]参照
            this.commentContent = "";
            this.commentErrors = null;

            if (response.status !== CREATED) {
                this.$store.commit("error/setCode", response.status);
                return false;
            }

            this.product.comments = [response.data, ...this.product.comments];
        },
        addMaterialNotification() {
            const message = `${this.authName}さんがあなたの${this.product.productname}をスタンプとしてダウンロードしました。`;
            const id = this.product.user.id;
            this.inputNotification(message, id); //mixin[notification]参照
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../../sass/common.scss";
.productDetail {
    width: 1000px;
    margin: 0 auto;
    padding-top: 15px;
}
.button--liked {
    background-color: hotpink;
}
.thumbnail {
    width: 45px;
    height: 45px;
}
.productInformation {
    width: 420px;
    height: 400px;
}
.comments {
    width: 450px;
}
.commentForm {
    background-color: white;
    padding: 30px;
    border-radius: 10px;
    width: 100%;
    textarea {
        padding: 10px;
        width: 100%;
        height: 85px;
        border: solid 1.5px rgba($color: $maincolor, $alpha: 0.6);
        border-radius: 5px;
    }
}
.commentItem {
    border-bottom: solid 1px rgba($color: $maincolor, $alpha: 0.7);
    padding: 25px 0;
}
.evaluations {
    display: flex;
    align-items: center;
    i {
        margin-right: 5px;
    }
    p {
        font-size: 16px;
    }
}
</style>
