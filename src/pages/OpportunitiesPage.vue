<template>
    <div class="q-pa-xl">
        <h1>Offres d'emplois</h1>
        <q-table title="Jobs" :rows="rows" :columns="columns" row-key="name" />
    </div>
</template>
<script setup>
const columns = [
    {
        name: 'name',
        required: true,
        label: 'Intitulé du poste',
        align: 'left',
        field: row => row.name,
        format: val => `${val}`,
        sortable: true
    },
    { name: 'client', label: 'Client', field: 'client' },
    { name: 'begin_at', align: 'center', label: 'Date de début', field: 'begin_at', sortable: true },
    { name: 'end_at', label: 'Date de fin', field: 'end_at', sortable: true },
    { name: 'skills', label: 'Compétences requises', field: 'skills' },
    { name: 'actions', label: 'Actions', field: 'actions' },
]

const rows = [
    {
        name: 'Developpeur React',
        client: 'Total',
        begin_at: '15/09/2023',
        end_at: '05/06/2024',
        skills: 'React, Node JS',
        actions: 87,
    },
]
</script>