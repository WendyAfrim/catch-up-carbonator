<template>
    <div class="q-pa-xl">
        <h1 class="q-px-xl">Mes compétences</h1>
        <div class="row">
            <div class="col-12 col-md-6 q-px-xl q-py-md">
                <q-select filled v-model="model" use-input hide-selected fill-input input-debounce="0" :options="options"
                    @filter="filterFn" hint="Basic autocomplete" label="Hard skills" standout="bg-green text-white">
                    <template v-slot:no-option>
                        <q-item>
                            <q-item-section class="text-grey">
                                No results
                            </q-item-section>
                        </q-item>
                    </template>
                </q-select>
                <div class="q-mt-md">
                    <q-table flat bordered title="Langages" :rows="rows" :columns="columns" row-key="name"
                        :separator="separator" />
                </div>
            </div>
            <div class="col-12 col-md-6 q-px-xl q-py-md">
                <q-select filled v-model="model" use-input hide-selected fill-input input-debounce="0" :options="options"
                    @filter="filterFn" hint="Basic autocomplete" label="Softs skills" standout="bg-green text-white">
                    <template v-slot:no-option>
                        <q-item>
                            <q-item-section class="text-grey">
                                No results
                            </q-item-section>
                        </q-item>
                    </template>
                </q-select>
                <div class="q-mt-md">
                    <q-table flat bordered title="Treats" :rows="rows" :columns="columns" row-key="name"
                        :separator="separator" />
                </div>
            </div>
        </div>
    </div>
</template>
<script></script>
<style></style>