import Vue from "vue";
import VueRouter from "vue-router";

import store from "./store";

Vue.use(VueRouter);

// パスとコンポーネントのマッピング
const routes = [
    {
        path: "/",
        component: resolve => {
            require.ensure(
                ["./pages/TopPage.vue"],
                () => {
                    resolve(require("./pages/TopPage.vue"));
                },
                "top"
            );
        }
    },
    {
        path: "/search",
        component: resolve => {
            require.ensure(
                ["./pages/Search.vue"],
                () => {
                    resolve(require("./pages/Search.vue"));
                },
                "search"
            );
        },
        props: route => {
            const page = route.query.page;
            return {
                page: /^[1-9][0-9]*$/.test(page) ? page * 1 : 1
            };
        }
    },
    {
        path: "/tagsearch",
        component: resolve => {
            require.ensure(
                ["./pages/TagSearch.vue"],
                () => {
                    resolve(require("./pages/TagSearch.vue"));
                },
                "tagsearch"
            );
        },
        props: route => {
            const page = route.query.page;
            return {
                page: /^[1-9][0-9]*$/.test(page) ? page * 1 : 1
            };
        }
    },
    {
        path: "/login",
        component: resolve => {
            require.ensure(
                ["./pages/Login.vue"],
                () => {
                    resolve(require("./pages/Login.vue"));
                },
                "login"
            );
        },
        beforeEnter(to, from, next) {
            if (store.getters["auth/check"]) {
                next("/");
            } else {
                next();
            }
        }
    },
    {
        path: "/notification",
        component: resolve => {
            require.ensure(
                ["./pages/Notification.vue"],
                () => {
                    resolve(require("./pages/Notification.vue"));
                },
                "notification"
            );
        },
        beforeEnter(to, from, next) {
            if (store.getters["auth/check"]) {
                next();
            } else {
                next("/login");
            }
        },
        props: true
    },
    {
        path: "/ranking",
        component: resolve => {
            require.ensure(
                ["./pages/Ranking.vue"],
                () => {
                    resolve(require("./pages/Ranking.vue"));
                },
                "ranking"
            );
        },
        children: [
            {
                path: "users",
                name: "rank-users",
                component: resolve => {
                    require.ensure(
                        ["./pages/RankUserFollower.vue"],
                        () => {
                            resolve(require("./pages/RankUserFollower.vue"));
                        },
                        "rank-users"
                    );
                },
                props: route => {
                    const page = route.query.page;
                    return {
                        page: /^[1-9][0-9]*$/.test(page) ? page * 1 : 1
                    };
                }
            },
            {
                path: "product/like",
                name: "rank-product-like",
                component: resolve => {
                    require.ensure(
                        ["./pages/RankProductLike.vue"],
                        () => {
                            resolve(require("./pages/RankProductLike.vue"));
                        },
                        "rank-product-like"
                    );
                },
                props: route => {
                    const page = route.query.page;
                    return {
                        page: /^[1-9][0-9]*$/.test(page) ? page * 1 : 1
                    };
                }
            },
            {
                path: "product/watch",
                name: "rank-product-watch",
                component: resolve => {
                    require.ensure(
                        ["./pages/RankProductWatch.vue"],
                        () => {
                            resolve(require("./pages/RankProductWatch.vue"));
                        },
                        "rank-product-watch"
                    );
                },
                props: route => {
                    const page = route.query.page;
                    return {
                        page: /^[1-9][0-9]*$/.test(page) ? page * 1 : 1
                    };
                }
            }
        ]
    },
    {
        path: "/users/:id",
        component: resolve => {
            require.ensure(
                ["./pages/UserDetail.vue"],
                () => {
                    resolve(require("./pages/UserDetail.vue"));
                },
                "userdetail"
            );
        },
        props: true
    },
    {
        path: "/settings/:id",
        component: resolve => {
            require.ensure(
                ["./pages/UserSettings.vue"],
                () => {
                    resolve(require("./pages/UserSettings.vue"));
                },
                "usersettings"
            );
        },
        beforeEnter(to, from, next) {
            if (store.getters["auth/check"]) {
                next();
            } else {
                next("/login");
            }
        },
        props: true
    },
    {
        path: "/follow/:id",
        component: resolve => {
            require.ensure(
                ["./pages/FollowList.vue"],
                () => {
                    resolve(require("./pages/FollowList.vue"));
                },
                "follow-list"
            );
        },
        props: true,
        name: "follow"
    },
    {
        path: "/follower/:id",
        component: resolve => {
            require.ensure(
                ["./pages/FollowList.vue"],
                () => {
                    resolve(require("./pages/FollowList.vue"));
                },
                "follow-list"
            );
        },
        props: true,
        name: "follower"
    },
    {
        path: "/drawing",
        component: resolve => {
            require.ensure(
                ["./pages/MyDrawing.vue"],
                () => {
                    resolve(require("./pages/MyDrawing.vue"));
                },
                "mydrawing"
            );
        },
        beforeEnter(to, from, next) {
            if (!store.getters["auth/check"]) {
                next("/");
            } else {
                next();
            }
        },
        props: route => {
            const page = route.query.page;
            return {
                page: /^[1-9][0-9]*$/.test(page) ? page * 1 : 1
            };
        },
        props: true
    },
    {
        path: "/products/:id",
        component: resolve => {
            require.ensure(
                ["./pages/ProductDetail.vue"],
                () => {
                    resolve(require("./pages/ProductDetail.vue"));
                },
                "product-detail"
            );
        },
        props: true
    },
    {
        path: "/500",
        component: resolve => {
            require.ensure(
                ["./pages/errors/System.vue"],
                () => {
                    resolve(require("./pages/errors/System.vue"));
                },
                "error/system"
            );
        }
    },
    {
        path: "*",
        component: resolve => {
            require.ensure(
                ["./pages/errors/NotFound.vue"],
                () => {
                    resolve(require("./pages/errors/NotFound.vue"));
                },
                "error/notfound"
            );
        }
    }
];

const router = new VueRouter({
    mode: "history",
    routes
});

export default router;
