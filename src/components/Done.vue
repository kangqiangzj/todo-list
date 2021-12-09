<template>
    <div>
      <ul class="list-group">
        <li v-for="item in dones" :key="item.id" class="list-group-item d-flex align-items-center justify-content-between" >{{item.text}}</li>
      </ul>
    </div>
    <button class="btn btn-danger" type="button" @click="clear(TodoItemState.DONE)">清除所有</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import { utils } from '@/common/utils'
export default defineComponent({
  setup () {
    const { clear, TodoItemState } = utils()
    return {
      clear,
      TodoItemState
    }
  },
  computed: {
    ...mapGetters(['dones'])
  }
})
</script>

<style scoped>

</style>
