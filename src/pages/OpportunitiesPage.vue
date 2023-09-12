<template>
  <div class="q-px-xl">
    <h1>Nos opportunités</h1>
    <q-table title="Consultants" :rows="opportunities" :columns="columns" row-key="name" :filter="option"
             :filter-method="filterData">
      <template v-slot:top>
        <q-tr>
          <q-td>
          </q-td>
          <q-td>
            <q-input outlined v-model="option.position" label="Filtre Poste" dense></q-input>
          </q-td>
          <q-td>
            <q-input outlined v-model="option.client" label="Filtre Client" dense></q-input>
          </q-td>
          <q-td>
            <q-input outlined v-model="option.begin_at" label="Filtre Date de début" dense></q-input>
          </q-td>
          <q-td>
            <q-input outlined v-model="option.skillsName" label="Filtre Compétences" dense></q-input>
          </q-td>
          <q-td>
            <q-input outlined v-model="option.leadTech" label="Filtre Tech Lead" dense></q-input>
          </q-td>
        </q-tr>

      </template>

      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width/>
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <ModalComponent logo="add_circle" color="green">
              <template #header>
                <h5>{{ props.row.name }}</h5>
              </template>
              <template #body>
                <div v-if="!success">
                  <h5>Poste</h5>
                  <p>{{ props.row.position }}</p>
                  <h5>Description</h5>
                  <p>{{ props.row.description }}</p>

                  <h5>Compétences requises</h5>
                  <q-table
                    title="Skills"
                    :rows="props.row.skills"
                    :columns="skillsColumns"
                    row-key="name"
                  />
                  <div class="text-center q-mt-xl">
                    <q-btn color="green" label="Postuler" :icon="submit ? 'pending' : 'send'"
                           @click="applyToProject(props.row.name)"/>
                  </div>
                </div>
                <SuccessComponent v-else-if="success">
                  <div class="text-center text-green-4">
                    <p>Votre demande a bien été pris en compte !</p>
                  </div>
                </SuccessComponent>
                <div v-else-if="errorMessage" class="text-red-9">
                  <p>Une erreur est survenue</p>
                </div>
              </template>
            </ModalComponent>
          </q-td>
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue';
import {CreateProjectOutput, getProjects, getProjectsOutput, Project} from 'src/firebase/Project';
import ModalComponent from 'components/ModalComponent.vue';
import {currentUserStore} from 'stores/currrent_user';
import {setConsultantCurrentProject} from 'src/firebase/Consultant';
import SuccessComponent from 'components/SuccessComponent.vue';

const icon = ref('send');
const submit = ref(false);
const success = ref(false);

const store = currentUserStore();
const errorMessage = ref('');


const columns = [
  {name: 'position', align: 'left', label: 'Poste', field: 'position', sortable: true},
  {name: 'client', align: 'center', label: 'Client', field: 'client', sortable: true},
  {name: 'skillsName', label: 'Compétences requises', field: 'skillsName'},
  {name: 'start_at', align: 'center', label: 'Date de début', field: 'start_at', sortable: true},
  {name: 'end_at', align: 'center', label: 'Date de fin', field: 'end_at', sortable: true},
  {name: 'leadTech', label: 'Tech Lead', field: 'leadTech'},
]

const option = reactive({
  position: '',
  client: '',
  skillsName: '',
  begin_at: '',
  leadTech: '',
})

const skillsColumns = [
  {name: 'name', align: 'left', label: 'Nom', field: 'name', sortable: true},
  {name: 'level', align: 'center', label: 'Niveau', field: 'level', sortable: true},
  {name: 'nb_exp', align: 'center', label: 'Expérience', field: 'nb_exp', sortable: true},
]


function filterData(rows, terms, cols, getCellValue) {
  for (const term in terms) {
    rows = rows.filter(row =>
      (row[term] + '').toLowerCase().indexOf(terms[term].toLowerCase()) !== -1
    )
  }
  return rows
}

async function applyToProject(projectName: string) {
  submit.value = true;
  const consultantId = store.uid;
  if (consultantId) {
    const project = await setConsultantCurrentProject(consultantId, projectName);
    if (!project) {
      success.value = false;
    } else {
      success.value = true;
    }
  }
  console.log(store.uid);
//   Todo : Let a consultant apply to a project, verifying if the consultant is available
}

const opportunities = ref<CreateProjectOutput[] | undefined>()

onMounted(async () => {
  opportunities.value = await getProjectsOutput();
})
</script>
