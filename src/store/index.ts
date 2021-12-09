import { TodoItem } from '@/common/interface'
import { createStore, createLogger, Store } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
import { TodoItemState } from '@/common/const'
import { storage } from '@/common/utils'

const debug = process.env.NODE_ENV !== 'production'

// 实现刷新不丢失数据，在store的subscribe（每次触发mutation的时候都会触发这个钩子）钩子中执行
const savePlugin = (store:Store<{
  todos: TodoItem[];
  item: TodoItem;
}>) => {
  store.state.todos = storage.get('latest_todos')
  // store.commit('init',storage.get())
  // 每次触发mutation的时候去做存储storage操作
  store.subscribe((mutation, state) => {
    storage.set('latest_todos', state.todos)
  })
}

export default createStore({
  state: {
    todos: [] as TodoItem[], // 是TodoItem类型的数组
    item: {} as TodoItem
  },
  mutations: {
    // init (state, todos) {
    //   state.todos = todos
    // },
    add (state, value) {
      state.todos.push({
        id: uuidv4(),
        text: value,
        state: TodoItemState.OPEN
      })
    },
    check (state, id) {
      const index = state.todos.findIndex((item) => item.id === id)
      state.todos[index].state = state.todos[index].state === TodoItemState.DONE ? TodoItemState.OPEN : TodoItemState.DONE
    },
    remove (state, id) {
      const index = state.todos.findIndex((item) => item.id === id)
      state.todos[index].state = TodoItemState.DELETE
    },
    clear (state, type:TodoItemState) {
      state.todos = state.todos.filter(item => item.state !== type)
    },
    saveEditItem (state, item:TodoItem) {
      state.item = item
    },
    update (state, item:TodoItem) {
      const index = state.todos.findIndex(i => i.id === item.id)
      state.todos[index] = item
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    dones: (state) => state.todos.filter(item => item.state === TodoItemState.DONE),
    deletes: (state) => state.todos.filter(item => item.state === TodoItemState.DELETE),
    opens: (state) => state.todos.filter(item => item.state === TodoItemState.OPEN)
  },
  plugins: debug ? [createLogger(), savePlugin] : [savePlugin]
})
