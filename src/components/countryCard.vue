<template>
  <div>
    <q-img  :src="item.flags.svg" class="rounded-borders q-my-lg" :img-style="{opacity:'0.4'}" height="500px">
      <q-card class="my-card absolute-full text-subtitle2 flex flex-center" flat bordered>
        <q-card-section horizontal>
          <!-- <q-btn color="red" size="xl" label="Do something not here" @click="$emit('dosomthing','ali')"></q-btn> -->
          <q-card-section class="q-pt-xs">
            <div class="text-h6 text-dark">Country name in different languages:</div>
            <div class="text-h5 q-mt-sm q-mb-xs text-dark">eng: {{  item.name.official  }}</div>
            <div>
              <span v-for="(language, lang) in item.translations" :key="lang" class="text-dark">
                {{  lang  }}: {{  language.official  }},
              </span>
            </div>
          </q-card-section>
        </q-card-section>
        <q-card-actions class="flex flex-center" vertical>
          <div class="text-dark q-mx-auto">
            <q-icon name="fa-regular fa-clock" color="dark" size="20px"/>
            Timezones
          </div>
          <div>
            <q-chip v-for="time in item.timezones" :key="time" outline color="dark">
              {{ time }}
            </q-chip>
          </div>
        </q-card-actions>
      </q-card>
    </q-img>
  </div>
</template>

<script>
export default {
  props:["item"]
}
</script>
