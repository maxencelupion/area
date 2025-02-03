import React, {useState, cloneElement} from "react";
import styles from "./ChangeInfosModals.module.css"
import AlertButtons from "@/pages/Components/Button/alertButtons";
import {Modal, Box, TextField, ThemeProvider, createTheme} from '@mui/material';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: '#011627',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#FF0054',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#011627',
          '&.Mui-focused': {
            color: '#FF0054',
          },
        },
      },
    },
  },
});

export default function ChangeInfosModals({
                                            _content,
                                            _title = "",
                                            setIsModalOpen,
                                            isModalOpen,
                                            _icon = <div/>,
                                            setUserInfos,
                                            setChangeData,
                                            type = "default"
                                          }) {
  const [inputContent, setInputContent] = useState("");

  const modifiedIcon = React.cloneElement(_icon, {
    size: 50,
    color: "#011627"
  });

  const handleSave = () => {
    if (inputContent.length === 0) {
      toast.error(`You must enter a valid ${_title.toLowerCase()}`);
    } else {
      const newLabel = _title.toLowerCase();
      setUserInfos(prevUserInfos => ({
        ...prevUserInfos,
        [newLabel]: inputContent
      }));
      toast.success(`You've successfully changed your ${_title.toLowerCase()}`);
      setChangeData(true);
      setInputContent("");
      handleClose();
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setInputContent("");
  };

  const renderInputComponent = () => {
    switch (type) {
      case 'password':
        return (
          <TextField
            fullWidth
            variant="outlined"
            label={`Enter new ${_title.toLowerCase()}`}
            type="password"
            value={inputContent}
            onChange={(e) => setInputContent(e.target.value)}
            margin="normal"
          />
        );
      default:
        return (
          <TextField
            fullWidth
            variant="outlined"
            label={`Enter new ${_title.toLowerCase()}`}
            value={inputContent}
            onChange={(e) => setInputContent(e.target.value)}
            margin="normal"
          />
        );
    }
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Modal open={isModalOpen} onClose={handleClose}>
          <Box className={styles.changeModalBox}>
            <div className={styles.changeModalHeader}>
              <h2 className={styles.changeTitle}>{`Change your ${_title}`}</h2>
              {modifiedIcon}
            </div>

            {renderInputComponent()}

            <div className={styles.changeModalButtons}>
              <AlertButtons color={"#011627"} content={"Save changes"} onPress={handleSave} />
              <AlertButtons color={"#FF0054"} content={"Close"} onPress={handleClose} />
            </div>
          </Box>
        </Modal>
      </ThemeProvider>
    </div>
  );
}