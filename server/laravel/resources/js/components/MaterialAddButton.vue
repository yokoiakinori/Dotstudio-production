<template>
    <button
        v-if="state == 'detail'"
        @click="onMaterialClick"
        class="formButton"
    >
        素材としてダウンロード
    </button>
    <button
        v-else
        @click.prevent="onMaterialClick"
        :class="{
            material_haved: materials.includes(product.id)
        }"
    >
        <i class="fas fa-stamp"></i>
    </button>
</template>

<script>
import Axios from "axios";
import { OK } from "../util";
export default {
    props: {
        state: String,
        product: Object
    },
    computed: {
        materials() {
            const materials = this.$store.getters["auth/materials"];
            const materialsId = [];
            for (let i = 0; i < materials.length; i++) {
                materialsId.push(materials[i].product_id);
            }
            return materialsId;
        }
    },
    methods: {
        onMaterialClick() {
            if (!this.$store.getters["auth/check"]) {
                alert("スタンプ機能を使うにはログインしてください。");
                return false;
            } else if (this.materials.includes(this.product.id)) {
                alert("すでにダウンロードしています。");
                return false;
            }
            this.materialAdd();
        },
        async materialAdd() {
            const response = await axios.put(
                `/api/material/${this.product.id}`
            );

            if (response.status !== OK) {
                this.$store.commit("error/setCode", response.status);
                return false;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../../sass/common.scss";
.material_haved {
    background-color: $maincolor !important;
    i {
        color: white;
    }
}
</style>
