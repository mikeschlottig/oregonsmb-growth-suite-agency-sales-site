import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export type Plan = 'starter' | 'growth' | 'scale';
interface PlanState {
  plan: Plan;
  setPlan: (plan: Plan) => void;
}
export const usePlanStore = create<PlanState>()(
  persist(
    (set) => ({
      plan: 'growth',
      setPlan: (plan: Plan) => set({ plan }),
    }),
    {
      name: 'oregon-smb-plan-storage', // name of the item in the storage (must be unique)
    }
  )
);