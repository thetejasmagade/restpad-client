import { UUID } from 'crypto';
import { create } from 'zustand';

type State = {
    userInfo: {
        id: UUID | undefined,
        email: string,
        fullName: string,
        plan: 'FREE' | 'STARTER' | 'PREMIUM'
    };
    updateUserInfo: (data: any) => void;
};

export const useDefaultAppStore = create<State>((set) => ({
    userInfo: {
        id: undefined,
        email: "",
        fullName: "",
        plan: "FREE"
    },
    updateUserInfo: (data: any) => set((state) => state.userInfo = data),
}));
