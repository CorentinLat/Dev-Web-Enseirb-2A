<template>
    <el-container direction="vertical">
        <el-row>
            <el-col :span="8">
                <el-form @submit.prevent="ajouterPari" @reset.prevent="onReset">
                    <el-form-item label="Vous pariez sur :">
                        <el-select v-model="form.cheval" id="cheval" placeholder="Sélectionnez votre cheval">
                            <el-option v-for="cheval in chevaux" :value="cheval.value" :label="cheval.text"/>
                        </el-select>
                    </el-form-item>

                    <el-button-group>
                        <el-button native-type="submit" type="primary" :disabled="isFormInvalid">Parier</el-button>
                        <el-button native-type="reset" type="danger" :disabled="isFormInvalid">Reset</el-button>
                    </el-button-group>
                </el-form>

                <el-button type="info" @click="generateBets" style="margin-top: 10px">
                    Générer des paris
                </el-button>
            </el-col>

            <el-col :span="12" :offset="2">
                <p>Liste des paris :</p>

                <section class="paris">
                    <Pari
                        v-for="pari in paris"
                        :key="pari.id"
                        :pari="pari"
                        :username="username"
                        @deletePari="deleteBet($event)"
                    />

                    <el-text v-if="!paris.length" type="danger">
                        Aucun pari n'a encore été placé...
                    </el-text>
                </section>
            </el-col>
        </el-row>

        <el-divider/>

        <b>Course - {{ stateRace }}</b>

        <el-divider/>

        <HorseRace :chevaux="chevaux" />
    </el-container>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import io from 'socket.io-client';

import HorseRace from '../components/HorseRace.vue';
import Pari from '../components/Pari.vue';

import {
    addBet,
    deleteBet,
    generateBets,
    getAllBets,
} from '../api/paris';

const socket = io('http://localhost:3000');
const store = useStore();

const form = reactive({ cheval: null });

const username = computed(() => store.getters.username);
const stateRace = computed(() => store.getters.raceState);
const isFormInvalid = computed(() => !form.cheval);

const paris = ref([]);
const chevaux = ref([
    { value: 1, text: 'Derdas', position: 0, color: 'CadetBlue' },
    { value: 2, text: 'Man Or', position: 0, color: 'CornflowerBlue' },
    { value: 3, text: 'Mirage Hero', position: 0, color: 'Coral' },
    { value: 4, text: 'Light The Fuse', position: 0, color: 'DarkRed' },
    { value: 5, text: 'Bentley Mood', position: 0, color: 'GoldenRod' },
    { value: 6, text: 'Crew Dragon', position: 0, color: 'Khaki' },
    { value: 7, text: 'Calypso Rose', position: 0, color: 'MediumBlue' },
    { value: 8, text: 'Gavotte', position: 0, color: 'Purple' },
    { value: 9, text: 'Missy Perfect', position: 0, color: 'SeaGreen' },
    { value: 10, text: 'Redhead Lady', position: 0, color: 'SteelBlue' },
]);

const ajouterPari = async () => {
    if (!username.value || !form.cheval) return;

    await addBet(username.value, form.cheval);

    form.cheval = null;
};

const chargerParis = async () => paris.value = await getAllBets();

const onReset = () => form.cheval = null;

onMounted(async () => {
    await chargerParis();

    socket.on('PARI_ADDED', pari => paris.value = [pari, ...paris.value]);
    socket.on('PARIS_ADDED', chargerParis);
    socket.on('PARI_DELETED', id => paris.value = paris.value.filter(pari => pari.id.toString() !== id));
    socket.on('PARIS_DELETED', () => paris.value = []);
});
</script>

<style scoped>
.paris {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>
