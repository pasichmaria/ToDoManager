import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface Todo {
  id: number
  text: string
  name: string
  completed: boolean
}
const VisibilityFilters = {
  all: 'all',
  completed: 'completed',
  active: 'active',
} as const
interface TodoState {
  todos: Todo[]
  visibilityFilter: string
}
const initialState: TodoState = {
  todos: [] as Todo[],
  visibilityFilter: VisibilityFilters.all,
}

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: {
      reducer(state, action: PayloadAction<Todo>) {
        state.todos.push(action.payload)
      },
      prepare(text: string, name: string) {
        return {
          payload: {
            id: Date.now(),
            text,
            name,
            completed: false,
          },
        }
      },
    },
    toggleTodo(state, action: PayloadAction<number>) {
      const todo = state.todos.find((todo) => todo.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
    setFilter(state, action: PayloadAction<string>) {
      state.visibilityFilter = action.payload
    },
  },
})

export const { addTodo, toggleTodo, setFilter } = todoSlice.actions
export default todoSlice.reducer

export { VisibilityFilters }