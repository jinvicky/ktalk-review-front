import React, { ReactElement, useState } from "react";
import { Button, Modal, Box, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CustomModal = ({
  open,
  setOpen,
  children,
}: {
  open: boolean;
  setOpen: () => void;
  children?: ReactElement;
}) => {
  if (!open) {
    return <></>;
  }
  return (
    <div>
      <Modal
        open={open}
        onClose={setOpen}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-title" variant="h6" component="h2">
            Modal Title
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            상속받은 내용들:
            {children}
          </Typography>
          <Button
            onClick={setOpen}
            variant="contained"
            sx={{ mt: 2 }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default CustomModal;
