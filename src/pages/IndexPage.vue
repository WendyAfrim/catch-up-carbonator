<template>
  <!--  <ConsultantView></ConsultantView>-->
  <!--  <RhView></RhView>-->
  <LeadTechView></LeadTechView>
</template>
<script setup lang="ts">
import ConsultantView from 'pages/Dashboard/ConsultantDashboard.vue'
import RhView from 'pages/Dashboard/RhDashboard.vue'
import LeadTechView from './Dashboard/LeadTechDashboard.vue';


</script>


<style lang="scss">
.q-card {
  border-radius: 15px;
}

//.icon {
//  font-size: 2.5em;
//  padding: 0.3em;
//  color: white;
//  border-radius: 10px;
//
//  &__green {
//    background-color: $green;
//  }
//
//  &__red {
//    background-color: $red;
//  }
//
//  &__bg-grey {
//    background-color: $grey;
//  }
//
//  &__grey {
//    color: $grey;
//  }
//}


.kpi {
  &__content {
    font-size: 1.8em;
  }
}
</style>
