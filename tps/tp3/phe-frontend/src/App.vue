<template>
    <el-header>
        <el-menu mode="horizontal">
            <el-menu-item index="0"><b>Paris Hippiques Étudiants</b></el-menu-item>
        </el-menu>
    </el-header>

    <el-main>
        <el-row>
            <el-col :span="8">
                <el-form>
                    <el-form-item label="Votre nom :">
                        <el-input id="auteur" />
                    </el-form-item>

                    <el-form-item label="Vous pariez sur :">
                        <el-select id="cheval" placeholder="Sélectionnez votre cheval">
                            <el-option v-for="cheval in chevaux" :value="cheval.value" :label="cheval.text" />
                        </el-select>
                    </el-form-item>

                    <el-button-group>
                        <el-button native-type="submit" type="primary">Parier</el-button>
                        <el-button native-type="reset" type="danger">Reset</el-button>
                    </el-button-group>
                </el-form>

                <el-button type="info" style="margin-top: 10px">
                    Générer des paris
                </el-button>
            </el-col>

            <el-col :span="12" :offset="2">
                <p>Liste des paris :</p>

                <section class="paris">
                    <el-card body-class="pari">
                        <section class="pari-information">
                            <p class="no-margin">
                                <el-tag type="info">Elisa</el-tag>
                                a parié sur le cheval <b>1</b>
                            </p>

                            <span class="small">Le 01/10/2023 à 11:00</span>
                        </section>
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
import { reactive, ref } from 'vue';
import dayjs from 'dayjs';

import ChevalRace from './components/HorseRace.vue';

const form = reactive({
    auteur: '',
    cheval: null,
});

const paris = ref([
    {
        "rowid": 1,
        "auteur": "Elisa",
        "cheval": 1,
        "date": "2023-10-01 11:00:00"
    },
    {
        "rowid": 2,
        "auteur": "Arthur",
        "cheval": 4,
        "date": "2023-10-01 11:00:00"
    },
    {
        "rowid": 3,
        "auteur": "Clément",
        "cheval": 7,
        "date": "2023-10-01 11:00:00"
    },
]);
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
    // TODO
};

const ajouterPari = async () => {
    // TODO
};

const onReset = () => {
    // TODO
};

const genererPari = async () => {
    // TODO
};

const supprimerPari = async id => {
    // TODO
};

const majEtatCourse = event => {
    etatCourse.value = event;
    if (etatCourse.value === 'Terminée') {
        console.log('Gestion des paris');
    }
};
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
