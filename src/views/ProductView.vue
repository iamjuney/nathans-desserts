<script setup>
import { useRoute } from "vue-router";
import { onMounted, watch, ref } from "vue";
import { Icon } from "@iconify/vue";
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from "@headlessui/vue";
import { useCartStore } from "../stores/store";

import TheNavigation from "../components/TheNavigation.vue";
import TheFooter from "../components/TheFooter.vue";
import cakesData from "../assets/cakes.json";

const store = useCartStore();
const { addToCart } = store;

let cake, shuffled, suggestion_cakes;
const route = useRoute();

onMounted(() => {
    window.scrollTo(0, 0);
    refresh(route.params.id);
});

watch(
    () => route.params.id,
    async (newId) => {
        window.scrollTo(0, 0);
        refresh(newId);
    },
    {
        immediate: true,
    }
);

function refresh(id) {
    cake = cakesData.data.find((cake) => cake.id == parseInt(id)); //find cake from list with id

    shuffled = cakesData.data.sort(() => 0.5 - Math.random()); //shuffle cakes list
    shuffled = shuffled.filter((cake) => cake.id !== parseInt(id)); //remove the current cake
    suggestion_cakes = shuffled.slice(0, 4); //cut the list into only 4 cakes
}

const now = new Date();
let month = now.getMonth() + 1;
let day = now.getDate();
if (month < 10) month = "0" + month;
if (day < 10) day = "0" + day;
const today = now.getFullYear() + "-" + month + "-" + day;

let hours = now.getHours();
hours = hours < 10 ? "0" + hours : hours;
let minutes = now.getMinutes();
minutes = minutes < 10 ? "0" + minutes : minutes;
const time = hours + ":" + minutes;

const options = [
    { id: 0, text: "National Delivery", icon: "ph:truck" },
    { id: 1, text: "Store Pickup", icon: "ph:storefront" },
];

const sizeSelected = ref(0);
const quantity = ref(1);
const pickupDate = ref(today);
const pickupTime = ref(time);
const message = ref("");
const deliveryOption = ref(0);

const add = () => {
    let newItem = {
        id: Math.floor(Math.random() * 10001),
        name: cake.name,
        collection: cake.collection,
        img_url: cake.img_url,
        size: cake.pricing[sizeSelected.value].size,
        price: cake.pricing[sizeSelected.value].price,
        quantity: quantity.value,
        date: pickupDate.value,
        time: pickupTime.value,
        message: message.value,
        delivery: deliveryOption.value,
    };

    addToCart(newItem);
};
</script>

<template>
    <main>
        <div class="bg-white">
            <TheNavigation />

            <div
                class="mx-auto mt-12 max-w-2xl px-4 pb-16 sm:px-6 sm:pb-24 lg:mt-24 lg:max-w-6xl lg:px-8"
            >
                <div
                    class="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8"
                >
                    <div class="lg:col-span-5 lg:col-start-8">
                        <p class="text-sm">Nathan's Cakeshop</p>
                        <div class="flex justify-between">
                            <h1 class="text-5xl font-normal text-gray-900">
                                {{ cake.name }} Cake
                            </h1>
                            <p class="text-xl font-normal text-gray-900">
                                ₱{{
                                    cake.pricing[sizeSelected].price * quantity
                                }}
                            </p>
                        </div>
                    </div>

                    <!-- Image gallery -->
                    <div
                        class="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0"
                    >
                        <h2 class="sr-only">Images</h2>

                        <div
                            class="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8"
                        >
                            <img
                                :src="cake.img_url"
                                alt="Back of womens Basic Tee in black."
                                class="rounded-lg lg:col-span-2 lg:row-span-2"
                            />
                        </div>
                    </div>

                    <div class="mt-8 lg:col-span-5">
                        <!-- Product details -->
                        <div class="mt-10">
                            <h2 class="text-sm font-medium text-gray-900">
                                Description
                            </h2>

                            <div class="prose prose-sm mt-4 text-gray-500">
                                <p>
                                    {{ cake.description }}
                                </p>
                            </div>
                        </div>

                        <!-- Size -->
                        <div class="mt-8 border-t border-gray-200 pt-8">
                            <div class="flex items-center justify-between">
                                <h2 class="text-sm font-medium text-gray-900">
                                    Size
                                </h2>
                            </div>

                            <fieldset class="mt-2">
                                <RadioGroup v-model="sizeSelected">
                                    <RadioGroupLabel class="sr-only"
                                        >Choose a size</RadioGroupLabel
                                    >
                                    <div
                                        class="grid grid-cols-3 gap-3 sm:grid-cols-6"
                                    >
                                        <RadioGroupOption
                                            v-for="pricing in cake.pricing"
                                            v-slot="{ checked }"
                                            :value="pricing.id"
                                        >
                                            <label
                                                :class="
                                                    checked
                                                        ? 'border-primary bg-secondary'
                                                        : 'border-gray-300 bg-white'
                                                "
                                                class="flex cursor-pointer items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase hover:bg-secondary/50 sm:flex-1"
                                                >{{ pricing.size }}</label
                                            >
                                        </RadioGroupOption>
                                    </div>
                                </RadioGroup>
                            </fieldset>
                        </div>

                        <!-- Quantity -->
                        <div class="mt-8">
                            <h2 class="text-sm font-medium text-gray-900">
                                Quantity
                            </h2>

                            <div class="mt-4 text-gray-500">
                                <div
                                    class="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
                                    aria-label="Pagination"
                                >
                                    <button
                                        type="button"
                                        @click="if (quantity > 1) quantity--;"
                                        class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-gray-50 px-2 py-3 text-sm font-medium text-gray-900 hover:border-secondary hover:bg-secondary"
                                    >
                                        <span class="sr-only">Subtract</span>
                                        <Icon
                                            icon="ph:minus"
                                            class="text-gray-900"
                                            width="16"
                                            height="16"
                                        />
                                    </button>
                                    <div
                                        class="relative border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50"
                                    >
                                        {{ quantity }}
                                    </div>
                                    <button
                                        @click="quantity++"
                                        class="relative inline-flex items-center rounded-r-md border border-gray-300 bg-gray-50 px-2 py-3 text-sm font-medium text-gray-900 hover:border-secondary hover:bg-secondary"
                                    >
                                        <span class="sr-only">Add</span>
                                        <Icon
                                            icon="ph:plus"
                                            class="text-gray-900"
                                            width="16"
                                            height="16"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Pickup date -->
                        <div class="mt-8">
                            <h2 class="text-sm font-medium text-gray-900">
                                Pickup Date
                            </h2>

                            <div class="prose prose-sm mt-4 text-gray-900">
                                <input
                                    type="date"
                                    :value="pickupDate"
                                    class="inline-block w-full rounded-lg border border-gray-300 bg-gray-50 py-3 px-10 font-medium text-gray-900 focus:border-secondary focus:bg-primary focus:ring-primary sm:w-auto"
                                />
                            </div>
                        </div>

                        <!-- Pickup Time -->
                        <div class="mt-8">
                            <h2 class="text-sm font-medium text-gray-900">
                                Pickup Time
                            </h2>

                            <div class="prose prose-sm mt-4 text-gray-500">
                                <input
                                    :value="pickupTime"
                                    type="time"
                                    class="inline-block w-full rounded-lg border border-gray-200 bg-gray-50 py-3 px-10 font-medium text-gray-900 focus:border-secondary focus:bg-primary focus:ring-primary sm:w-auto"
                                />
                            </div>
                        </div>

                        <!-- Message -->
                        <div class="mt-8">
                            <h2 class="text-sm font-medium text-gray-900">
                                Message On The Cake
                            </h2>

                            <div class="prose prose-sm mt-4 text-gray-900">
                                <textarea
                                    rows="3"
                                    name="message"
                                    v-model="message"
                                    class="sm:text-md block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary"
                                />
                            </div>
                        </div>

                        <!-- Delivery -->
                        <section
                            aria-labelledby="policies-heading"
                            class="mt-8"
                        >
                            <h2 id="policies-heading" class="sr-only">
                                Delivery Method
                            </h2>

                            <fieldset>
                                <RadioGroup v-model="deliveryOption">
                                    <RadioGroupLabel class="sr-only"
                                        >Choose delivery method</RadioGroupLabel
                                    >
                                    <div
                                        class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
                                    >
                                        <RadioGroupOption
                                            v-for="option in options"
                                            v-slot="{ checked }"
                                            :value="option.id"
                                        >
                                            <label
                                                :class="
                                                    checked
                                                        ? 'border-primary bg-secondary'
                                                        : 'border-gray-300 bg-white'
                                                "
                                                class="flex cursor-pointer flex-col rounded-lg border p-6 text-center hover:bg-secondary/50"
                                            >
                                                <Icon
                                                    :icon="option.icon"
                                                    class="mx-auto flex-shrink-0 text-gray-600"
                                                    width="30"
                                                    height="30"
                                                />
                                                <span
                                                    class="text-md mt-4 font-medium text-gray-900"
                                                >
                                                    {{ option.text }}
                                                </span>
                                            </label>
                                        </RadioGroupOption>
                                    </div>
                                </RadioGroup>
                            </fieldset>
                        </section>

                        <button
                            @click="add"
                            class="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-secondary py-3 px-8 text-base font-medium text-gray-900 hover:bg-primary"
                        >
                            Add to cart
                        </button>
                    </div>
                </div>

                <!-- Reviews -->
                <section
                    aria-labelledby="reviews-heading"
                    class="mt-16 sm:mt-24"
                >
                    <h2
                        id="reviews-heading"
                        class="text-lg font-medium text-gray-900"
                    >
                        Recent reviews
                    </h2>

                    <div
                        class="mt-6 space-y-10 divide-y divide-gray-200 border-t border-b border-gray-200 pb-10"
                    >
                        <div class="pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8">
                            <div
                                class="lg:col-span-8 lg:col-start-5 xl:col-span-9 xl:col-start-4 xl:grid xl:grid-cols-3 xl:items-start xl:gap-x-8"
                            >
                                <div class="flex items-center xl:col-span-1">
                                    <div class="flex items-center">
                                        <!--
                  Heroicon name: solid/star

                  Active: "text-yellow-400", Inactive: "text-gray-200"
                -->
                                        <svg
                                            class="h-5 w-5 flex-shrink-0 text-yellow-400"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                            />
                                        </svg>

                                        <!-- Heroicon name: solid/star -->
                                        <svg
                                            class="h-5 w-5 flex-shrink-0 text-yellow-400"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                            />
                                        </svg>

                                        <!-- Heroicon name: solid/star -->
                                        <svg
                                            class="h-5 w-5 flex-shrink-0 text-yellow-400"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                            />
                                        </svg>

                                        <!-- Heroicon name: solid/star -->
                                        <svg
                                            class="h-5 w-5 flex-shrink-0 text-yellow-400"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                            />
                                        </svg>

                                        <!-- Heroicon name: solid/star -->
                                        <svg
                                            class="h-5 w-5 flex-shrink-0 text-yellow-400"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                            />
                                        </svg>
                                    </div>
                                    <p class="ml-3 text-sm text-gray-700">
                                        5<span class="sr-only">
                                            out of 5 stars</span
                                        >
                                    </p>
                                </div>

                                <div class="mt-4 lg:mt-6 xl:col-span-2 xl:mt-0">
                                    <h3
                                        class="text-sm font-medium text-gray-900"
                                    >
                                        Can&#039;t say enough good things
                                    </h3>

                                    <div
                                        class="mt-3 space-y-6 text-sm text-gray-500"
                                    >
                                        <p>
                                            I was really pleased with the
                                            overall shopping experience. My
                                            order even included a little
                                            personal, handwritten note, which
                                            delighted me!
                                        </p>
                                        <p>
                                            The product quality is amazing, it
                                            looks and feel even better than I
                                            had anticipated. Brilliant stuff! I
                                            would gladly recommend this store to
                                            my friends. And, now that I think of
                                            it... I actually have, many times!
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div
                                class="mt-6 flex items-center text-sm lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:flex-col lg:items-start xl:col-span-3"
                            >
                                <p class="font-medium text-gray-900">
                                    Risako M
                                </p>
                                <time
                                    datetime="2021-01-06"
                                    class="ml-4 border-l border-gray-200 pl-4 text-gray-500 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0"
                                    >May 16, 2021</time
                                >
                            </div>
                        </div>

                        <!-- More reviews... -->
                    </div>
                </section>

                <!-- Related products -->
                <section
                    aria-labelledby="related-heading"
                    class="mt-16 sm:mt-24"
                >
                    <h2
                        id="related-heading"
                        class="text-lg font-medium text-gray-900"
                    >
                        Cakes you may like
                    </h2>

                    <div
                        class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
                    >
                        <div
                            class="group relative"
                            v-for="cake in suggestion_cakes"
                            :key="cake.id"
                        >
                            <div
                                class="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md group-hover:opacity-75 lg:aspect-none lg:h-80"
                            >
                                <img
                                    :src="cake.img_url"
                                    :alt="cake.name"
                                    class="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>
                            <div class="mt-4 flex justify-between">
                                <div>
                                    <h3 class="text-sm text-gray-700">
                                        <RouterLink
                                            :to="{
                                                name: 'product',
                                                params: {
                                                    type: cake.collection,
                                                    id: cake.id,
                                                },
                                            }"
                                        >
                                            <span
                                                aria-hidden="true"
                                                class="absolute inset-0"
                                            ></span>
                                            {{ cake.name }} Cake
                                        </RouterLink>
                                    </h3>
                                </div>
                                <p class="text-sm font-medium text-gray-900">
                                    Starts at ₱{{ cake.pricing[0].price }}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <TheFooter />
        </div>
    </main>
</template>
