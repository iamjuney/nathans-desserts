import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/:type", //url parameters that can be retrieve using useRoute() function (ex. params.type)
            name: "collection",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("../views/CollectionView.vue"),
        },
        {
            path: "/:type/:id", //url parameters that can be retrieve using useRoute() function (ex. params.type, params.id)
            name: "product",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("../views/ProductView.vue"),
        },
        {
            path: "/cart",
            name: "cart",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("../views/ShoppingCartView.vue"),
        },
    ],
});

export default router;
