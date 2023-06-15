//handle diff modals using key
import { atom, useAtom, useSetAtom } from 'jotai'
import React from 'react';

export const modalAtom = atom({})

export const useModal = () => useAtom(modalAtom)


export const openCloseModalAtom = atom(
    null,
    (get, set, { key, status, data }) => {
        const modal = get(modalAtom);
        if (!status) {
            set(modalAtom, {
                ...modal, [key]: {
                    status,
                    data: null
                }
            });
        } else {
            set(modalAtom, {
                ...modal, [key]: {
                    status,
                    data
                }
            });
        }
    })


export const getModalAtom = (key) => atom((get) => get(modalAtom)[key])

export const useModalState = (key) => {
    const [modalVal] = useAtom(
        React.useMemo(
            () => getModalAtom(key),
            []
        )
    )


    return modalVal
}


export const useSetModal = () => {
    const openCloseModal = useSetAtom(openCloseModalAtom)

    return openCloseModal
}