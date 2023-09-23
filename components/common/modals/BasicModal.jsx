import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useModalState } from 'jotai/modal';
import { useSetModal } from '@jotai/modal';
import CancelIcon from '@mui/icons-material/Cancel';

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

export default function BasicModal({ modalKey, children, sx }) {
  const modalVal = useModalState(modalKey)
  const openCloseModal = useSetModal()

  const onClose = () => {
    openCloseModal({
      key: modalKey,
      state: false,
      data: null
    })
  }


  return (
    <div>
      <Modal
        open={modalVal?.status}
        onClose={onClose}
      >
        <Box sx={{ ...style, ...sx }}>
          <div className="text-end">
            <CancelIcon className='text-gray-600 cursor-pointer' onClick={onClose} />
          </div>
          {children}
        </Box>
      </Modal>
    </div>
  );
}