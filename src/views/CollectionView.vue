<script setup>
import TheNavigation from "../components/TheNavigation.vue";
import TheFooter from "../components/TheFooter.vue";

import { useRoute } from "vue-router";
import { onMounted } from "vue";

import cakesData from "../assets/cakes.json";
import collectionsData from "../assets/collections.json";

onMounted(() => {
    window.scrollTo(0, 0);
});

const route = useRoute();
const collection = collectionsData.data.find(
    (collection) => collection.type === route.params.type
);

const cakes = cakesData.data.filter(
    (cake) => cake.collection === route.params.type
);
</script>

<template>
    <main>
        <div class="bg-white">
            <TheNavigation />

            <main>
                <!-- Hero -->
                <div
                    class="relative mx-auto mt-12 max-w-6xl bg-white px-4 sm:px-6 lg:px-8"
                >
                    <h2 class="text-4xl font-light text-gray-900">
                        {{ collection.name }}
                    </h2>
                    <p class="mt-8 max-w-2xl text-xl text-gray-900">
                        {{ collection.description }}
                    </p>
                </div>

                <!-- Collections -->
                <section aria-labelledby="collections-heading" class="bg-white">
                    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                        <div
                            class="mx-auto max-w-2xl py-12 sm:py-40 lg:max-w-none lg:py-24"
                        >
                            <div class="lg:grid lg:grid-cols-3 lg:gap-2">
                                <div
                                    class="group relative"
                                    v-for="cake in cakes"
                                    :key="cake.id"
                                >
                                    <div
                                        class="relative h-80 w-full overflow-hidden bg-white sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1"
                                    >
                                        <img
                                            :src="cake.img_url"
                                            alt="Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug."
                                            class="h-full w-full object-cover object-center transition delay-100 ease-in-out group-hover:scale-105"
                                        />
                                    </div>
                                    <h3
                                        class="flex justify-between bg-primary p-6 text-sm font-medium text-gray-700"
                                    >
                                        <RouterLink
                                            :to="{
                                                name: 'product',
                                                params: {
                                                    type: cake.collection,
                                                    id: cake.id,
                                                },
                                            }"
                                            class="flex items-center group-hover:underline"
                                            >{{ cake.name }} Cake</RouterLink
                                        >
                                        <p
                                            class="text-sm font-medium text-gray-900"
                                        >
                                            Starts at ₱{{
                                                cake.pricing[0].price
                                            }}
                                        </p>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <TheFooter />
        </div>
    </main>
</template>
