<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <div>
      <div v-for="item in items" :key="item">
        <q-input outlined rounded color="orange" bg-color="green" v-model="item.value"></q-input>
      </div>
    </div>
    <div v-if="isAllFloat">
      {{ calculateAverage }}
    </div>
    <div v-else>
      <div v-for="(item, index) in items" :key="index">
        <div v-if="!item.state" outlined rounded color="orange" bg-color="green">
          Component {{ index+1 }} is not a float value
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  data() {
    return {
      items: [
        {
          value: 1.0,
          state: true
        },
        {
          value: 2.0,
          state: true
        },
        {
          value: 3.0,
          state: true
        }
      ]
    }
  },
  computed: {
    calculateAverage() {
      const n = this.items.length
      let sum = 0
      for(let i=0 ; i<n ; i++)
        sum += parseFloat(this.items[i].value)
      return sum/n
    },
    isAllFloat() {
      const n = this.items.length
      let allFloat = true
      for(let i=0 ; i<n ; i++) {
        let state = true
        if (isNaN(parseFloat(this.items[i].value)))
          state = false
        this.items[i].state = state
        allFloat = allFloat && state
      }
      return allFloat
    }
  }
}
</script>
