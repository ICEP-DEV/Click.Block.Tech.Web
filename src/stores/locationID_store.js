import { create } from 'zustand'

const useLocationIDStore = create((set) => ({
  LocationID: 0,
  updateLocationID: (newID) => set({ LocationID: newID }),
}))

export default useLocationIDStore;
