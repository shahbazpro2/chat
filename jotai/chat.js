//store active user chat

import { atom } from "jotai";

export const activeUserAtom = atom(null);
export const activeGroupAtom = atom(null);
export const loggedInUserAtom = atom(null);
export const pinnedUserAtom = atom(null);

//set active group
export const setActiveGroupAtom = atom(
    null,
    (get, set, activeGroup) => {
        set(activeGroupAtom, activeGroup);
    }
);

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

//set pinned users
export const setPinnedUsersAtom = atom(
    null,
    (get, set, pinnedUsers) => {
        const existing = get(pinnedUserAtom);
        if (!existing) {
            set(pinnedUserAtom, pinnedUsers);
            return;
        }
        const filterExisting = pinnedUsers.filter(user => {
            const index = existing?.findIndex(item => item?.pinnedId === user?.pinnedId);
            return index === -1;
        });

        set(pinnedUserAtom, filterExisting);
    }

);

//set pinned user
export const setPinnedUserAtom = atom(
    null,
    (get, set, pinnedUser) => {
        const users = get(pinnedUserAtom);
        if (users) {
            const index = users.findIndex(user => user.pinnedId === pinnedUser.pinnedId);
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
            const index = users.findIndex(user => user.pinnedId === pinnedUser.pinnedId);
            if (index !== -1) {
                users.splice(index, 1);
                set(pinnedUserAtom, [...users]);
            }
        }
    }
)

