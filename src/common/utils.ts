import store from '@/store'
import { TodoItemState } from './const'

export const utils = () => {
  const clear = (type:TodoItemState) => {
    store.commit('clear', type)
  }
  return {
    clear,
    TodoItemState
  }
}

export const storage = {
  get: (key:string) => JSON.parse(localStorage.getItem(key) || '[]'),
  set: (key:string, value:any) => localStorage.setItem(key, JSON.stringify(value))
}
