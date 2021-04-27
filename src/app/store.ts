import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import world from '../features/world/worldSlice';

export const store = configureStore({
  reducer: {
    world,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
