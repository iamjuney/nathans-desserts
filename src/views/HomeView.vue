<script setup>
import { Icon } from "@iconify/vue";
import TheFooter from "../components/TheFooter.vue";
import TheNavigation from "../components/TheNavigation.vue";
import collectionsData from "../assets/collections.json";

// gets all the data from the collectionsData (collections.json)
const collections = collectionsData.data;
</script>

<template>
    <main>
        <div class="bg-white">
            <TheNavigation />

            <main>
                <!-- Hero -->
                <div class="relative">
                    <!-- Decorative background image and gradient -->
                    <div aria-hidden="true" class="absolute inset-0">
                        <div class="absolute inset-0 mx-auto overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1580650571791-ac06a41c3939?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                                alt=""
                                class="h-full w-full object-cover object-center"
                            />
                        </div>
                        <div
                            class="absolute inset-0 bg-gray-500 bg-opacity-25"
                        ></div>
                        <!-- <div
                            class="absolute inset-0 bg-gradient-to-t from-primary"
                        ></div> -->
                    </div>

                    <!-- Sale -->
                    <section
                        aria-labelledby="sale-heading"
                        class="relative mx-auto flex max-w-6xl flex-col items-center px-4 py-32 text-center sm:px-6 lg:px-8"
                    >
                        <div class="mx-auto max-w-2xl lg:max-w-none">
                            <h2
                                id="sale-heading"
                                class="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
                            >
                                The Best Handmade Cakes In VSU
                            </h2>
                            <p class="mx-auto mt-4 max-w-xl text-xl text-white">
                                Our dedicated bakery chefs and cake artists have
                                a passion for what they do. We ensure cakes are
                                baked in small batches daily.
                            </p>
                            <a
                                href="#"
                                class="mt-6 inline-block w-full rounded-md border border-transparent bg-primary py-3 px-16 font-medium text-gray-900 hover:bg-secondary sm:w-auto"
                                >Order Now</a
                            >
                        </div>
                    </section>
                </div>

                <!-- Collections -->
                <section aria-labelledby="collections-heading" class="bg-white">
                    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                        <div
                            class="mx-auto max-w-2xl py-12 sm:py-40 lg:max-w-none lg:py-24"
                        >
                            <h2
                                id="collections-heading"
                                class="text-4xl font-light text-gray-900"
                            >
                                Collections
                            </h2>

                            <div class="mt-8 lg:grid lg:grid-cols-3 lg:gap-2">
                                <div
                                    class="group relative"
                                    v-for="collection in collections"
                                    :key="collection.type"
                                >
                                    <div
                                        class="relative h-80 w-full overflow-hidden bg-white sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1"
                                    >
                                        <img
                                            :src="collection.img_url"
                                            alt="Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug."
                                            class="h-full w-full object-cover object-center transition delay-100 ease-in-out group-hover:scale-105"
                                        />
                                    </div>
                                    <h3
                                        class="bg-primary p-4 text-lg font-medium text-gray-700"
                                    >
                                        <RouterLink
                                            :to="collection.type"
                                            class="flex items-center p-2"
                                            >{{ collection.name }}
                                            <Icon
                                                icon="ph:arrow-right"
                                                class="ml-2 text-gray-600 transition delay-100 ease-in-out group-hover:translate-x-2"
                                                width="22"
                                                height="24"
                                        /></RouterLink>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Sale and testimonials -->
            </main>

            <TheFooter />
        </div>
    </main>
</template>
