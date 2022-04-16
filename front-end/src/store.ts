import { configureStore } from '@reduxjs/toolkit'
import groupStageReducer from './store/groupStageReducer'
import playoffStageReducer from './store/playoffStageReducer'

export const store = configureStore({
  reducer: {
    groupStage: groupStageReducer,
    playoffStage: playoffStageReducer,
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {groupStage: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch