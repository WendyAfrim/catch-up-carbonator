<template>
    <q-btn color="green" text-color="white" label="Ajouter" @click="open" />
    <q-dialog v-model="icon">
        <q-card>
            <q-card-section class="row items-center q-px-md">
                <slot name="header"></slot>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>

            <q-card-section class="q-px-md">
                <slot name="body"></slot>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>
<script setup>
import { ref } from 'vue';

const icon = ref(false);

const emit = defineEmits(['open']);

function open() {
    emit('open', icon.value = true);
}
</script>
<style></style>