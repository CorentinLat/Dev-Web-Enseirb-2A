<template>
    <el-header>
        <el-menu mode="horizontal">
            <el-menu-item index="0"><b>Paris Hippiques Étudiants</b></el-menu-item>
        </el-menu>
    </el-header>

    <el-main>
        <el-row>
            <el-col :span="8">
                <el-form @submit.prevent="ajouterPari" @reset.prevent="onReset">
                    <el-form-item label="Votre nom :">
                        <el-input id="auteur" v-model="form.auteur" />
                    </el-form-item>

                    <el-form-item label="Vous pariez sur :">
                        <el-select v-model="form.cheval" id="cheval" placeholder="Sélectionnez votre cheval">
                            <el-option v-for="cheval in chevaux" :value="cheval.value" :label="cheval.text" />
                        </el-select>
                    </el-form-item>

                    <el-button-group>
                        <el-button native-type="submit" type="primary">Parier</el-button>
                        <el-button native-type="reset" type="danger">Reset</el-button>
                    </el-button-group>
                </el-form>

                <el-button type="info" @click="genererPari" style="margin-top: 10px">
                    Générer des paris
                </el-button>
            </el-col>

            <el-col :span="12" :offset="2">
                <p>Liste des paris :</p>

                <section class="paris">
                    <el-card body-class="pari" v-for="pari in paris" :key="pari.rowid">
                        <section class="pari-information">
                            <p class="no-margin">
                                <el-tag :type="pari.auteur === form.auteur ? 'success' : 'info'">{{ pari.auteur }}</el-tag>
                                a parié sur le cheval <b>{{ pari.cheval }}</b>
                            </p>

                            <span class="small">{{ getFormattedDate(pari.date) }}</span>
                        </section>

                        <el-button
                            v-if="pari.auteur === form.auteur"
                            type="danger"
                            circle
                            :icon="Delete"
                            @click="supprimerPari(pari.rowid)"
                        />
                    </el-card>
                </section>
            </el-col>
        </el-row>

        <el-divider />

        <b>Course - {{ etatCourse }}</b>

        <el-divider />

        <ChevalRace :chevaux="chevaux" @update:raceState="majEtatCourse($event)" />
    </el-main>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { Delete } from '@element-plus/icons-vue'
import dayjs from 'dayjs';

import ChevalRace from './components/HorseRace.vue';

const form = reactive({
    auteur: '',
    cheval: null,
});

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
const etatCourse = ref('En attente Paris');

const chargerParis = async () => {
    try {
        const response = await fetch('http://localhost:3000/paris');

        paris.value = await response.json();
    } catch (e) {
        console.error(e);
    }
};

const ajouterPari = async () => {
    try {
        await fetch('http://localhost:3000/paris', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                auteur: form.auteur,
                cheval: form.cheval,
            }),
        });

        chargerParis();
        form.cheval = null;
    } catch (e) {
        console.error(e);
    }
};

const onReset = () => {
    form.auteur = '';
    form.cheval = null;
};

const genererPari = async () => {
    try {
        await fetch(`http://localhost:3000/paris/generate`, { method: 'POST' })

        chargerParis();
    } catch (e) {
        console.error(e);
    }
};

const supprimerPari = async id => {
    try {
        await fetch(`http://localhost:3000/paris/${id}`, { method: 'DELETE' })

        // loadParis();
        paris.value = paris.value.filter(m => m.rowid !== id);
    } catch (e) {
        console.error(e);
    }
};

const getFormattedDate = date => dayjs(date).format('Le DD/MM/YYYY à HH:mm');

const majEtatCourse = event => {
    etatCourse.value = event;
    if (etatCourse.value === 'Terminée') {
        console.log('Gestion des paris');
    }
};

onMounted(chargerParis);
</script>

<style>
.paris {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.pari {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
}

.pari-information {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.no-margin { margin: 0; }
</style>
