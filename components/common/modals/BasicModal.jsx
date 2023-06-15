import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useModalState } from 'jotai/modal';
import { useSetModal } from '@jotai/modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 3,
  "&:focus": {
    outline: "none"
  }
};

export default function BasicModal({ modalKey, children }) {
  const modalVal = useModalState(modalKey)
  const openCloseModal = useSetModal()

  console.log(modalVal)

  return (
    <div>
      <Modal
        open={modalVal?.status}
        onClose={() => openCloseModal({
          key: modalKey,
          state: false,
          data: null
        })}
      >
        <Box sx={style}>
          {children}
        </Box>
      </Modal>
    </div>
  );
}