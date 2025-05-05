import { configureStore } from "@reduxjs/toolkit";

// slice

import UserSlice from "@/app/lib/slice/userSlice";



export const makeStore = () => {
  return configureStore({
    reducer: {
      user: UserSlice.reducer
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]