<template #header>
    <h1 class="text-h5">{{ title }}</h1>
</template>
<!-- <template #body>
    <span>Veuillez renseigner toutes ses informations
    </span>
    <div class="row">
        <div class="col-12 col-md-6">
            <div class="q-py-md">
                <q-input standout="bg-green text-white" :dense="true" v-model="text" label="Nom" />
            </div>
        </div>
        <div class="col-12 col-md-6">
            <div class="q-py-md q-px-md">
                <q-select standout="bg-green text-white" v-model="model" :dense="true" label="Prénom" />
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12 col-md-12">
            <div class="q-py-md">
                <q-input standout="bg-green text-white" :dense="true" v-model="text" label="Email" />
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12 col-md-6">
            <div class="q-py-md">
                <q-input standout="bg-green text-white" :dense="true" v-model="text" label="Poste" />
            </div>
        </div>
        <div class="col-12 col-md-6">
            <div class="q-py-md q-px-md">
                <q-select standout="bg-green text-white" v-model="model" :dense="true" label="Date d'entrée" />
            </div>
        </div>
    </div>
    <div class="text-right">
        <q-btn color="green" label="Enregistrer" class="q-my-md"></q-btn>
    </div>
</template> -->
<script setup lang="ts">
const props = defineProps({
    title: {
        type: String
    },
    subtitle: {
        type: String
    }
})
</script>