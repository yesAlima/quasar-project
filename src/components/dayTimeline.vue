<template>
  <q-timeline>
    <q-timeline-entry
      v-for="hour in day"
      :key="hour"
      :title="hour.temper + units.temper"
      :subtitle="hour.time"
      icon="fa-solid fa-sun"
      :color="getColor(hour.temper)"
    >
      Humidity: {{ hour.humid }}{{ units.humid }}
      <q-separator />
      Wind Speed: {{ hour.wind }}{{ units.wind }}
    </q-timeline-entry>
  </q-timeline>
</template>

<script>
export default {
  props: ["day", "units"],
  methods: {
    getColor(temper) {
      if (temper >= 40) return "red";
      else if (temper >= 35) return "orange";
      else if (temper >= 30) return "yellow";
      else return "primary";
    },
  },
};
</script>
