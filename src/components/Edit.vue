<template>
    <div class="container">
      <div class="form-group">
        <label for="">内容</label>
        <input type="text" class="form-control" v-model="newItem.text">
        <button type="button" class="btn btn-success mr-4" @click="save">保存</button>
        <button type="button" class="btn btn-secondary mr-4" @click="cancel">取消</button>
      </div>
    </div>
</template>

<script lang="ts">
import router from '@/router'
import store from '@/store'
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup () {
    const item = store.state.item
    const newItem = { ...item }

    const save = () => {
      store.commit('update', newItem)
      router.go(-1)
    }

    const cancel = () => {
      router.go(-1)
    }

    return reactive({
      newItem,
      save,
      cancel
    })
  }
})
</script>

<style scoped>

</style>
