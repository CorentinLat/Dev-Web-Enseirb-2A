<template>
    <el-header>
        <el-menu mode="horizontal" :ellipsis="false">
            <el-menu-item index="0">Pari Hippique Étudiant</el-menu-item>

            <article class="flex-grow"/>

            <el-menu-item index="1">Course</el-menu-item>
            <el-menu-item @click="logout">Se déconnecter</el-menu-item>
            <el-menu-item index="2">Se connecter</el-menu-item>
        </el-menu>
    </el-header>

    <el-main>
        <Race />
    </el-main>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import Race from './pages/Race.vue';

const router = useRouter();
const store = useStore();

// TOCHANGE
const loggedIn = computed(() => true);

const logout = () => {
    // TODO
};
</script>

<style scoped>
.flex-grow {
    flex-grow: 1;
}
</style>
