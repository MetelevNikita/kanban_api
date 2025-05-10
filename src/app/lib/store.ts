import { configureStore } from "@reduxjs/toolkit";

// slice

import UserSlice from "@/app/lib/slice/userSlice";
import TaskSlice from "@/app/lib/slice/taskSlice";



export const makeStore = () => {
  return configureStore({
    reducer: {
      user: UserSlice.reducer,
      task: TaskSlice.reducer
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]