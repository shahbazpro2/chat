//store active user chat

import { atom } from "jotai";

export const activeUserAtom = atom(null);
export const loggedInUserAtom = atom(null);
export const pinnedUserAtom = atom(null);

//set active user
export const setActiveUserAtom = atom(
    null,
    (get, set, activeUser) => {
        set(activeUserAtom, activeUser);
    }
);

//set logged in user
export const setLoggedInUserAtom = atom(
    null,
    (get, set, loggedInUser) => {
        set(loggedInUserAtom, loggedInUser);
    }
);

//set pinned user
export const setPinnedUserAtom = atom(
    null,
    (get, set, pinnedUser) => {
        const users = get(pinnedUserAtom);
        if (users) {
            const index = users.findIndex(user => user.id === pinnedUser.id);
            if (index === -1) {
                set(pinnedUserAtom, [...users, pinnedUser]);
            }
        } else {
            set(pinnedUserAtom, [pinnedUser]);
        }
    })

//remove pinned user
export const removePinnedUserAtom = atom(
    null,
    (get, set, pinnedUser) => {
        const users = get(pinnedUserAtom);
        if (users) {
            const index = users.findIndex(user => user.id === pinnedUser.id);
            if (index !== -1) {
                users.splice(index, 1);
                set(pinnedUserAtom, [...users]);
            }
        }
    }
)

