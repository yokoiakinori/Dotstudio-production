<template>
    <div class="wrapper flexColumnAlignCenter">
        <h3>リクエストの作成</h3>
        <RequestEditForm
            :submitMessage="submitMessage"
            @formEnter="createRequest"
        ></RequestEditForm>
    </div>
</template>

<script>
import { CREATED } from "../util";
import RequestEditForm from "../components/Requests/RequestEditForm.vue";
export default {
    components: {
        RequestEditForm
    },
    data() {
        return {
            submitMessage: "作成する"
        };
    },
    methods: {
        async createRequest(form) {
            const response = await axios.post("/api/requests", form);
            if (response.status !== CREATED) {
                this.$store.commit("error/setCode", response.status);
                return false;
            }
            this.$router.push("/");
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../../sass/common.scss";
.wrapper {
    width: 90%;
    margin: 0 auto;
    padding-top: 30px;
}
</style>
