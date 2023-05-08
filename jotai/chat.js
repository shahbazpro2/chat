//store active user chat

import { atom } from "jotai";

export const activeUserAtom = atom(null);

//set active user
export const setActiveUserAtom = atom(
    null,
    (get, set, activeUser) => {
        set(activeUserAtom, activeUser);
    }
);