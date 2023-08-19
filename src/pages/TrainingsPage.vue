<template>
    <div class="q-px-xl">
        <h1>Nos formations</h1>
        <div class="row">
            <div class="col-12 col-md-4">
                <div class="q-pa-xl">
                    <Card>
                        <template #img>
                            <img src="https://cdn.quasar.dev/img/mountains.jpg">
                        </template>
                        <template #body>
                            <q-card-section>
                                <div class="text-h6">Docker</div>
                                <div class="text-right">
                                    <q-btn color="primary" label="M'inscrire" class="q-mt-xs"></q-btn>
                                </div>
                            </q-card-section>
                        </template>
                    </Card>
                </div>
            </div>
            <div class="col-12 col-md-4">
                <div class="q-pa-xl">
                    <Card>
                        <template #img>
                            <img src="https://cdn.quasar.dev/img/mountains.jpg">
                        </template>
                        <template #body>
                            <q-card-section>
                                <div class="text-h6">Kubernetes</div>
                                <div class="text-right">
                                    <q-btn color="primary" label="M'inscrire"></q-btn>
                                </div>
                            </q-card-section>
                        </template>
                    </Card>
                </div>
            </div>
            <div class="col-12 col-md-4">
                <div class="q-pa-xl">
                    <Card>
                        <template #img>
                            <img src="https://cdn.quasar.dev/img/mountains.jpg">
                        </template>
                        <template #body>
                            <q-card-section>
                                <div class="text-h6">SQL</div>
                                <div class="text-right">
                                    <q-btn color="primary" label="M'inscrire"></q-btn>
                                </div>
                            </q-card-section>
                        </template>
                    </Card>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import Card from 'components/CardComponent.vue';
</script>
<style></style>