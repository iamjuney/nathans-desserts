<script setup>
import { Icon } from "@iconify/vue";
import { storeToRefs } from "pinia";
import { useCartStore } from "../stores/store";
import { ref } from "vue";

const store = useCartStore();
const { count } = storeToRefs(store);

const isMobile = ref(false);
</script>

<template>
    <!--
    Mobile menu

    Off-canvas menu for mobile, show/hide based on off-canvas menu state.
  -->
    <div
        v-show="isMobile"
        class="fixed inset-0 z-40 flex lg:hidden"
        role="dialog"
        aria-modal="true"
    >
        <!--
      Off-canvas menu overlay, show/hide based on off-canvas menu state.

      Entering: "transition-opacity ease-linear duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "transition-opacity ease-linear duration-300"
        From: "opacity-100"
        To: "opacity-0"
    -->
        <div
            class="fixed inset-0 bg-black bg-opacity-25"
            aria-hidden="true"
        ></div>

        <!--
      Off-canvas menu, show/hide based on off-canvas menu state.

      Entering: "transition ease-in-out duration-300 transform"
        From: "-translate-x-full"
        To: "translate-x-0"
      Leaving: "transition ease-in-out duration-300 transform"
        From: "translate-x-0"
        To: "-translate-x-full"
    -->
        <div
            class="relative flex w-full max-w-xs flex-col overflow-y-auto bg-primary pb-12 shadow-xl"
        >
            <div class="flex px-4 pt-5 pb-2">
                <button
                    @click="isMobile = false"
                    type="button"
                    class="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                >
                    <span class="sr-only">Close menu</span>
                    <!-- Heroicon name: outline/x -->
                    <Icon
                        icon="ph:x"
                        class="flex-shrink-0 text-gray-600 hover:text-gray-900"
                        width="28"
                        height="30"
                    />
                </button>
            </div>

            <!-- Links -->
            <div class="mt-2">
                <!-- to be added -->
            </div>

            <div class="space-y-6 border-t border-gray-200 py-6 px-4">
                <div class="flow-root">
                    <a href="#" class="-m-2 block p-2 font-medium text-gray-900"
                        >Create an account</a
                    >
                </div>
                <div class="flow-root">
                    <a href="#" class="-m-2 block p-2 font-medium text-gray-900"
                        >Sign in</a
                    >
                </div>
            </div>
        </div>
    </div>

    <!-- Top navigation -->
    <header class="relative z-10">
        <nav aria-label="Top">
            <div class="bg-primary/50 text-gray-600">
                <div
                    class="px- mx-auto flex h-10 max-w-6xl items-center justify-between sm:px-6 lg:px-8"
                >
                    <p
                        class="flex-1 text-center text-sm font-medium lg:flex-none"
                    >
                        Get free delivery on orders over ₱2500
                    </p>

                    <div
                        class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6"
                    >
                        <a
                            href="#"
                            class="text-sm font-medium hover:text-gray-900"
                            >Create an account</a
                        >
                        <span
                            class="h-6 w-px bg-gray-600"
                            aria-hidden="true"
                        ></span>
                        <a
                            href="#"
                            class="text-sm font-medium hover:text-gray-900"
                            >Sign in</a
                        >
                    </div>
                </div>
            </div>
        </nav>
    </header>

    <!-- Secondary navigation -->
    <nav class="sticky top-0 z-10 bg-primary">
        <div class="border-b border-gray-200">
            <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div class="flex h-16 items-center justify-between lg:h-36">
                    <!-- Logo (lg+) -->
                    <div class="hidden lg:flex lg:items-start lg:justify-start">
                        <RouterLink to="/">
                            <span class="sr-only">Nathan's Desserts</span>
                            <!-- logo here -->
                            <img class="h-24 w-auto" src="/logo.png" alt="" />
                        </RouterLink>
                    </div>

                    <!-- Mobile menu and search (lg-) -->
                    <div class="flex flex-1 items-center lg:hidden">
                        <!-- Mobile menu toggle, controls the 'mobileMenuOpen' state. -->
                        <button
                            @click="isMobile = true"
                            type="button"
                            class="-ml-2 rounded-md bg-primary p-2 text-gray-600"
                        >
                            <span class="sr-only">Open menu</span>
                            <!-- Heroicon name: outline/menu -->
                            <Icon
                                icon="ph:list"
                                class="flex-shrink-0 text-gray-600 hover:text-gray-900"
                                width="28"
                                height="30"
                            />
                        </button>

                        <!-- Search -->
                        <a
                            href="#"
                            class="ml-2 p-2 text-gray-600 hover:text-gray-500"
                        >
                            <span class="sr-only">Search</span>
                            <!-- Heroicon name: outline/search -->
                            <Icon
                                icon="ph:magnifying-glass"
                                class="flex-shrink-0 text-gray-600 hover:text-gray-900"
                                width="28"
                                height="30"
                            />
                        </a>
                    </div>
                    <RouterLink to="/" class="lg:hidden">
                        <span class="sr-only">Nathan's Desserts</span>
                        <!-- logo here -->
                        <img class="h-12 w-auto" src="/logo.png" alt="" />
                    </RouterLink>

                    <div class="flex flex-1 items-center justify-end">
                        <div class="flex items-center lg:ml-8">
                            <div class="flex space-x-8">
                                <div class="hidden lg:flex">
                                    <a href="#" class="-m-2 p-2">
                                        <span class="sr-only">Search</span>
                                        <Icon
                                            icon="ph:magnifying-glass"
                                            class="flex-shrink-0 text-gray-600 hover:text-gray-900"
                                            width="28"
                                            height="30"
                                        />
                                    </a>
                                </div>

                                <div class="flex">
                                    <a href="#" class="-m-2 p-2">
                                        <span class="sr-only">Account</span>
                                        <Icon
                                            icon="ph:user"
                                            class="flex-shrink-0 text-gray-600 hover:text-gray-900"
                                            width="28"
                                            height="30"
                                        />
                                    </a>
                                </div>
                            </div>

                            <span
                                class="mx-4 h-6 w-px bg-gray-200 lg:mx-6"
                                aria-hidden="true"
                            ></span>

                            <div class="flow-root">
                                <RouterLink
                                    to="/cart"
                                    class="group -m-2 flex items-center p-2"
                                >
                                    <Icon
                                        icon="ph:handbag"
                                        class="flex-shrink-0 text-gray-600 group-hover:text-gray-900"
                                        width="28"
                                        height="30"
                                    />
                                    <span
                                        class="ml-2 text-sm font-medium text-gray-600 group-hover:text-gray-900"
                                        >{{ count }}</span
                                    >
                                    <span class="sr-only"
                                        >items in cart, view bag</span
                                    >
                                </RouterLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>
