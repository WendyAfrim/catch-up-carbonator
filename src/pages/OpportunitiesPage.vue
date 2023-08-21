<template>
    <div class="q-px-xl">
        <h1>Nos opportunités</h1>
        <q-table title="Consultants" :rows="rows" :columns="columns" row-key="name" :filter="option"
            :filter-method="filterData">
            <template v-slot:top>
                <q-tr>
                    <q-td>
                    </q-td>
                    <q-td>
                        <q-input outlined v-model="option.position" label="Filtre Poste" dense></q-input>
                    </q-td>
                    <q-td>
                        <q-input outlined v-model="option.client" label="Filtre Client" dense></q-input>
                    </q-td>
                    <q-td>
                        <q-input outlined v-model="option.begin_at" label="Filtre Date de début" dense></q-input>
                    </q-td>
                    <q-td>
                        <q-input outlined v-model="option.skills" label="Filtre Compétences" dense></q-input>
                    </q-td>
                    <q-td>
                        <q-input outlined v-model="option.techLead" label="Filtre Tech Lead" dense></q-input>
                    </q-td>
                </q-tr>

            </template>
            <template v-slot:header="props">
                <q-tr :props="props">
                    <q-th auto-width />
                    <q-th v-for="col in props.cols" :key="col.name" :props="props">
                        {{ col.label }}
                    </q-th>
                </q-tr>
            </template>

            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td auto-width>
                        <q-btn size="sm" color="green" round dense @click="props.expand = !props.expand"
                            :icon="props.expand ? 'remove' : 'add'" />
                    </q-td>
                    <q-td v-for="col in props.cols" :key="col.name" :props="props">
                        {{ col.value }}
                    </q-td>
                </q-tr>
                <q-tr v-show="props.expand" :props="props">
                    <q-td colspan="100%">
                        <div class="text-left">
                            Besoins détaillés du projet : {{ props.row.skills }}
                            <br>
                            Exigences du client
                        </div>
                    </q-td>
                </q-tr>
            </template>
        </q-table>
    </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';

const selected = ref([]);

const columns = [
    { name: 'position', align: 'left', label: 'Poste', field: 'position', sortable: true },
    { name: 'client', align: 'center', label: 'Client', field: 'client', sortable: true },
    { name: 'begin_at', align: 'center', label: 'Date de début', field: 'begin_at', sortable: true },
    { name: 'skills', label: 'Compétences requises', field: 'skills' },
    { name: 'techLead', label: 'Tech Lead', field: 'techLead' },
    { name: 'actions', label: 'Actions', field: 'actions' },
]


const rows = [
    {
        position: "Developpeur Vue JS",
        client: "TF1",
        begin_at: "06/09/2023",
        skills: "Javascript ES6, Vue 3, Docker",
        techLead: 'Antoine Lecomte',
        actions: "<q-btn>Test</qbtn>"
    },
    {
        position: "Developpeur PHP/Symfony",
        client: "Facebook",
        begin_at: "15/06/2025",
        skills: "PHP, Symfony, Twig",
        techLead: 'Manon Leroy',
        actions: '1%'
    },
]

const option = reactive({
    position: '',
    client: '',
    begin_at: '',
    skills: '',
    techLead: '',
})

function filterData(rows, terms, cols, getCellValue) {
    for (const term in terms) {
        rows = rows.filter(row =>
            (row[term] + '').toLowerCase().indexOf(terms[term].toLowerCase()) !== -1
        )
    }
    return rows
} 
</script>
