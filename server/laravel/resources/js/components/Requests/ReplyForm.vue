<template>
    <form class="margin3_top flexColumn" action @submit.prevent="submitReply">
        <button
            class="solidSquareButton"
            @click="modalToggle"
            v-if="currentProductName != null"
            type="button"
        >
            {{ currentProductName }}
        </button>
        <button
            class="solidSquareButton"
            v-else
            @click="modalToggle"
            type="button"
        >
            提供する素材を選択してください。
        </button>
        <transition>
            <ModalWindow
                v-if="modalWindow"
                @closeModal="modalToggle"
                @formEnter="currentProduct"
            >
                <h2>プロダクト一覧</h2>
                <ul class="margin2_vertical flexRow">
                    <li
                        v-for="(product, index) in products"
                        :key="index"
                        @click="selectProduct(index + 1)"
                    >
                        <RequestProduct
                            :product="product"
                            :productstyle="productStyle"
                            :selectCheck="index == selectProductIndex - 1"
                        ></RequestProduct>
                    </li>
                </ul>
            </ModalWindow>
        </transition>
        <label for="reply-comment" class="margin1_bottom">コメント</label>
        <textarea
            class="form__item"
            v-model="replyForm.comment"
            cols="30"
            rows="4"
        ></textarea>
        <div class="form__button">
            <button type="submit" class="button">送信</button>
        </div>
    </form>
</template>

<script>
import ModalWindow from "../ModalWindow.vue";
import RequestProduct from "./RequestProduct.vue";
import { OK } from "../../util";
export default {
    components: {
        ModalWindow,
        RequestProduct
    },
    props: {
        request: Object
    },
    data() {
        return {
            replyForm: {
                product_id: null,
                comment: "",
                request_id: null,
                opponent_id: null
            },
            maxwidth: 400,
            products: Array,
            modalWindow: false,
            currentProductIndex: 1,
            selectProductIndex: 1,
            currentProductName: null
        };
    },
    computed: {
        userid() {
            return this.$store.getters["auth/userid"];
        },
        productStyle() {
            const displayNumberRow = 3;
            const product = `${this.maxwidth / displayNumberRow}px`;
            return {
                width: product,
                height: product
            };
        }
    },
    watch: {
        $route: {
            async handler() {
                await this.showProductList();
                this.setRequestId();
            },
            immediate: true
        }
    },
    methods: {
        modalToggle() {
            this.modalWindow = !this.modalWindow;
        },
        setRequestId() {
            this.replyForm.opponent_id = this.request.user_id;
            this.replyForm.request_id = this.request.id;
        },
        async submitReply() {
            if (this.replyForm.product_id == null) {
                alert("提供する素材が選択されていません");
            } else {
                const response = await axios.post(
                    "/api/requests/reply/",
                    this.replyForm
                );
                this.errorResponse(response);
                this.$router.go({
                    path: `/request/${this.request.id}`,
                    force: true
                });
            }
        },
        errorResponse(val) {
            if (val.status !== OK) {
                this.$store.commit("error/setCode", val.status);
                return false;
            }
        },
        hideForm() {
            this.$emit("hideForm");
        },
        async showProductList() {
            const response = await axios.get(
                `/api/users/products/${this.userid}/?page=1`
            );
            this.errorResponse(response);
            this.products = response.data.data;
        },
        async currentProduct() {
            this.currentProductIndex = this.selectProductIndex;
            this.currentProductName = this.products[
                this.currentProductIndex - 1
            ].productname;
            await this.modalToggle();
            this.replyForm.product_id = this.products[
                this.currentProductIndex - 1
            ].id;
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../../../sass/common.scss";
button {
    cursor: pointer;
    margin-bottom: 20px;
}
.v-enter-active,
.v-leave-active {
    transition: opacity 0.2s;
}
.v-enter,
.v-leave-to {
    opacity: 0;
}
</style>
