<template>
    <!-- <q-btn color="green" text-color="white" :label="label" @click="open" /> -->
    <span class="material-icons pointer cta" @click="open">
        add_circle
    </span>
    <q-dialog v-model="icon">
        <q-card style="width: 700px; max-width: 80vw;">
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
<script setup lang="ts">
import { ref } from 'vue';

const icon = ref(false);
const medium = ref(false);

const emit = defineEmits(['open']);

function open() {
    emit('open', icon.value = true);
}

const props = defineProps({
    classCta: {
        type: String
    }
})


</script>
<style lang="scss">
.cta {
    font-size: 1.8em;
    cursor: pointer;
    margin-left: 0.5em;
    color: white;
}
</style>