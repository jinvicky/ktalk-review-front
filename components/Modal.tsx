import React, { ReactElement, useState } from "react";
import { Button, Modal, Box, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 4,
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
          <Typography id="modal-description" sx={{ mt: 2 }}>
            {children}
          </Typography>
          <Button
            onClick={setOpen}
            variant="contained"
            sx={{
              mt: 2,
              position: "relative",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            닫기
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default CustomModal;
