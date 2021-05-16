<template>
    <form class="form flexColumn" action @submit.prevent="formEnter">
        <label for="request-name">リクエスト名</label>
        <input class="form__item" type="text" v-model="updateForm.title" />
        <label for="request-contents">リクエストしたい内容の詳細</label>
        <textarea
            class="form__item"
            v-model="updateForm.contents"
            cols="30"
            rows="8"
        ></textarea>
        <div class="form__button">
            <button type="submit" class="button">{{ submitMessage }}</button>
        </div>
    </form>
</template>

<script>
export default {
    props: {
        submitMessage: String,
        request: Object
    },
    data() {
        return {
            updateForm: {
                title: "",
                contents: ""
            }
        };
    },
    methods: {
        formEnter() {
            this.$emit("formEnter", this.updateForm);
        }
    },
    watch: {
        request(val) {
            this.updateForm = val;
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../../../sass/common.scss";
form {
    width: 500px;
}
h3 {
    margin-bottom: 40px;
}
button {
    cursor: pointer;
}
</style>
