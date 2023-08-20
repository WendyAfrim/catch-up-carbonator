<template>
    <div class="q-pa-md">
        <h1>{{ title }}</h1>
        <q-table title="Consultants" :rows="rows" :columns="columns" row-key="name" selection="multiple"
            v-model:selected="selected" :filter="option" :filter-method="filterData">
            <template v-slot:top>
                <slot name="body"></slot>
            </template>
        </q-table>
    </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';

const props = defineProps({
    title: {
        type: String
    },
    columns: {
        type: Array
    },
    rows: {
        type: Array
    },
    option: {
        type: Array
    }
})

const selected = ref([]);





function filterData(rows, terms, cols, getCellValue) {
    for (const term in terms) {
        rows = rows.filter(row =>
            (row[term] + '').toLowerCase().indexOf(terms[term].toLowerCase()) !== -1
        )
    }
    return rows
} 
</script>
