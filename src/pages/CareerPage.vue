<template>
    <div class="q-mx-xl">
        <h1 class="q-pl-xl">Ajouter un nouveau parcours personnalisé</h1>
        <div class="q-mx-xl">
            <div class="row">
                <div class="col-6 col-6 q-pa-md">
                    <Card>
                        <template #body>
                            <h2 class="text-h6 text-center">Détails du parcours</h2>
                            <div class="">
                                <div class="row">
                                    <div class="col-12 col-6">
                                        <div class="q-mx-xl q-mt-xl">
                                            <q-input standout="bg-green text-white" :dense="true" v-model="text"
                                                label="Nom du parcours" />
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 col-6">
                                        <div class="q-ma-xl">
                                            <q-input standout="bg-green text-white" v-model="text" label="Description"
                                                filled autogrow />
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 col-6">
                                        <div class="q-mx-xl q-mb-xl">
                                            <q-input standout="bg-green text-white" v-model="text" label="Pré-requis" filled
                                                autogrow />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="text-center q-pt-ùd q-pb-md">
                                <q-btn color="green">Enregistrer</q-btn>
                            </div>
                        </template>
                    </Card>
                </div>
                <div class="col-6 col-6 q-pa-md">
                    <Card>
                        <template #body>
                            <h2 class="text-h6 text-center">Définir les objectifs</h2>
                            <div class="">
                                <div class="row">
                                    <div class="col-12 col-12">
                                        <div class="q-mx-xl q-mt-xl">
                                            <q-input standout="bg-green text-white" :dense="true" v-model="text"
                                                label="Objectif 1" />
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 col-12">
                                        <div class="q-ma-xl">
                                            <q-input standout="bg-green text-white" :dense="true" v-model="text"
                                                label="Objectif 2" />
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 col-12">
                                        <div class="q-mx-xl">
                                            <q-input standout="bg-green text-white" :dense="true" v-model="text"
                                                label="Objectif 3" />
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 col-12">
                                        <div class="q-ma-xl">
                                            <q-input standout="bg-green text-white" :dense="true" v-model="text"
                                                label="Objectif 4" />
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 col-12">
                                        <div class="q-mx-xl">
                                            <q-input standout="bg-green text-white" :dense="true" v-model="text"
                                                label="Objectif 5" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="text-center q-pt-xl q-pb-md">
                                <q-btn color="green">Enregistrer</q-btn>
                            </div>
                        </template>
                    </Card>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import Card from 'src/components/CardComponent.vue';
</script>
<style></style>