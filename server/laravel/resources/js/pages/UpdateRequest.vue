<template>
    <div class="wrapper flexColumnAlignCenter">
        <h3>リクエストの編集</h3>
        <RequestEditForm
            :submitMessage="submitMessage"
            @formEnter="updateRequest"
            :request="request"
        ></RequestEditForm>
    </div>
</template>

<script>
import { OK } from "../util";
import RequestEditForm from "../components/Requests/RequestEditForm.vue";
export default {
    components: {
        RequestEditForm
    },
    props: {
        id: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            submitMessage: "変更する",
            request: {}
        };
    },
    methods: {
        async updateRequest(form) {
            const response = await axios.post("/api/requests/update", form);
            if (response.status !== OK) {
                this.$store.commit("error/setCode", response.status);
                return false;
            }
            this.$router.push("/");
        },
        async showRequest() {
            const response = await axios.get(`/api/requests/${this.id}`);
            if (response.status !== OK) {
                this.$store.commit("error/setCode", response.status);
                return false;
            }
            this.request = response.data;
        }
    },
    watch: {
        $route: {
            async handler() {
                this.$store.commit("randing/loadingSwitch", true);
                await this.showRequest();
                this.$store.commit("randing/loadingSwitch", false);
            },
            immediate: true
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
