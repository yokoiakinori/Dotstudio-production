<template>
    <div class="flexRowCenter">
        <button v-if="haveMaterial" @click="modalToggle">
            <i class="fas fa-stamp"></i>
            スタンプ：{{ currentMaterialName }}
        </button>
        <button v-else>
            <i class="fas fa-stamp"></i>
            スタンプがありません。
        </button>
        <transition>
            <modalWindow
                v-if="modalWindow"
                @closeModal="modalToggle"
                @formEnter="currentMaterial"
            >
                <h2>スタンプ一覧</h2>
                <ul class="flexRowLeft">
                    <li
                        v-for="(material, index) in materials"
                        :key="index"
                        @click="selectMaterial(index + 1)"
                    >
                        <MaterialProduct
                            :product="material"
                            :productstyle="productStyle"
                            :selectCheck="index == selectMaterialIndex - 1"
                        ></MaterialProduct>
                    </li>
                </ul>
            </modalWindow>
        </transition>
    </div>
</template>

<script>
import ModalWindow from "../../ModalWindow.vue";
import MaterialProduct from "../../MaterialProduct.vue";
import Axios from "axios";
import { OK, CREATED } from "../../../util";
export default {
    components: {
        ModalWindow,
        MaterialProduct
    },
    data() {
        return {
            maxwidth: 400,
            modalWindow: false,
            haveMaterial: false,
            currentMaterialIndex: 1,
            selectMaterialIndex: 1,
            materials: []
        };
    },
    computed: {
        currentMaterialName() {
            return this.materials[this.currentMaterialIndex - 1].productname;
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
                await this.showMaterialList();
                this.setCurrentMaterial();
            },
            immediate: true
        }
    },
    methods: {
        async showMaterialList() {
            const response = await axios.get(`/api/materials`);
            if (response.data.length >= 1) {
                this.haveMaterial = true;
            }
            this.materials = response.data;
        },
        modalToggle() {
            this.modalWindow = !this.modalWindow;
        },
        selectMaterial(index) {
            this.selectMaterialIndex = index;
        },
        async currentMaterial() {
            this.currentMaterialIndex = this.selectMaterialIndex;
            await this.modalToggle();
            this.setCurrentMaterial();
        },
        setCurrentMaterial() {
            this.$store.commit(
                "maincanvas/setCurrentMaterial",
                this.materials[this.currentMaterialIndex - 1]
            );
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../../../../sass/common.scss";
div {
    width: 100%;
}
button {
    width: 85%;
    height: 40px;
    border: solid 1px $maincolor;
    i {
        margin-right: 5px;
    }
}
.v-enter-active,
.v-leave-active {
    transition: opacity 0.2s;
}
.v-enter,
.v-leave-to {
    opacity: 0;
}
.active {
    transition-duration: 0.3s;
    background-color: $maincolor;
    color: white;
    i {
        color: white !important;
        margin-left: 10px;
    }
}
ul {
    padding: 0;
}
</style>
