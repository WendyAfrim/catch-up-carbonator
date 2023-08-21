<template>
    <div class="q-pa-md">
        <h1>{{ title }}</h1>
        <q-table title="Consultants" :rows="rows" :columns="columns" row-key="name" selection="multiple"
            v-model:selected="selected" :filter="option" :filter-method="filterData">
            <template v-slot:top>
                <q-tr>
                    <q-td>
                    </q-td>
                    <q-td>
                        <q-input outlined v-model="option.email" label="Filtre Email" dense></q-input>
                    </q-td>
                    <q-td>
                        <q-input outlined v-model="option.position" label="Filtre Poste" dense></q-input>
                    </q-td>
                    <q-td>
                        <q-input outlined v-model="option.skills" label="Filtre Compétences" dense></q-input>
                    </q-td>
                    <q-td>
                        <q-input outlined v-model="option.end_at" label="Filtre Date de début" dense></q-input>
                    </q-td>
                    <q-td>
                        <q-input outlined v-model="option.state" label="Filtre Etat" dense></q-input>
                    </q-td>
                </q-tr>
                <!-- <slot name="body"></slot> -->
            </template>
        </q-table>
    </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';


const selected = ref([]);

const columns = [
    {
        name: 'firstname',
        required: true,
        label: 'Prénom',
        align: 'center',
        field: 'firstname',
        sortable: true
    },
    { name: 'lastname', align: 'center', label: 'Nom', field: 'lastname', sortable: true },
    { name: 'email', align: 'center', label: 'Email', field: 'email', sortable: true },
    { name: 'position', align: 'center', label: 'Poste', field: 'position', sortable: true },
    { name: 'begin_at', align: 'center', label: 'Date de début', field: 'begin_at', sortable: true },
    { name: 'skills', label: 'Compétences', field: 'skills' },
    { name: 'state', label: 'Statut', field: 'state' },
    { name: 'actions', label: 'Actions', field: 'actions' },
]


const rows = [
    {
        lastname: 'Dupont',
        firstname: "Jean",
        email: "jean@carbon.com",
        position: "Developpeur React",
        begin_at: "06/06/2025",
        skills: "JS, Vue",
        state: 'Libre',
        actions: '1%'
    },
    {
        lastname: 'Ferreira',
        firstname: "Kevin",
        email: "kevin@carbon.com",
        position: "Developpeur Python",
        begin_at: "06/06/2025",
        skills: "Python, Django",
        state: 'Occupé',
        actions: '1%'
    },
]

const option = reactive({
    email: '',
    position: '',
    skills: '',
    end_at: '',
    state: '',
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
