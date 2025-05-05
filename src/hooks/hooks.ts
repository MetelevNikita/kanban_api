import { useDispatch, useSelector, useStore } from "react-redux";
import { RootState, AppStore, AppDispatch } from "@/app/lib/store";

//


export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()