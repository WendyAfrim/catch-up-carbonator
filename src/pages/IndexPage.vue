<template>
  <ConsultantView></ConsultantView>
  <RhView></RhView>
</template>
<script setup lang="ts">
import ConsultantView from 'pages/Dashboard/ConsultantDashboard.vue'
import RhView from 'pages/Dashboard/RhDashboard.vue'
</script>


<style lang="scss">
.q-card {
  border-radius: 15px;
}

.icon {
  font-size: 2.5em;
  padding: 0.3em;
  color: white;
  border-radius: 10px;
  margin-left: 3.7em;

  &__green {
    background-color: $green;
  }

  &__red {
    background-color: $red;
  }

  &__grey {
    background-color: $grey;
  }
}

.kpi {
  &__content {
    font-size: 1.8em;
  }
}
</style>
