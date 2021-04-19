import { RootState } from "../reducers";

export const getItemStringSelector = (state: RootState) =>
  state.items.value?.map(({ name }) => name);
