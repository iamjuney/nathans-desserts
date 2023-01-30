import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useCartStore = defineStore("cart", () => {
    const count = useStorage("count", ref(0));
    const cart = useStorage("cart", ref([]));

    function addToCart(newData) {
        cart.value.push(newData);
        count.value++;
    }

    function remove(id) {
        cart.value = cart.value.filter((cake) => cake.id !== id);
        count.value--;
        // window.location.reload();
    }

    return { count, cart, addToCart, remove };
});
