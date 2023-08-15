<template>
    <q-card class="my-card bg-white text-grey shadow-4 q-pa-md">
        <q-card-section horizontal>
            <q-card-section class="q-pt-xs">
                <slot></slot>
            </q-card-section>
        </q-card-section>
    </q-card>
</template>

<script></script>

<style lang="scss">
.q-card {
    border-radius: 15px;
}
</style>