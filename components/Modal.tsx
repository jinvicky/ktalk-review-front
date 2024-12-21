"use client";

import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";

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
  hideButton,
}: {
  open: boolean;
  setOpen: () => void;
  children?: ReactElement;
  hideButton?: boolean;
}) => {
  const { t } = useTranslation();
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
        <Box sx={style} className="outline-none">
          <Typography id="modal-description" sx={{ mt: 2 }}>
            {children}
          </Typography>
          {!hideButton && (
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
              {t("CLOSE")}
            </Button>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default CustomModal;
