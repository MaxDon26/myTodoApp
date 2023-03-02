import React, { useContext, useState } from "react";

const SnackContext = React.createContext();

export const useSnack = () => {
  return useContext(SnackContext);
};

export const SnackProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const handleOpen = (params) => {
    setOpen(params.open);
    setText(params.text);
  };
  return (
    <SnackContext.Provider value={{ open, handleOpen, text }}>
      {children}
    </SnackContext.Provider>
  );
};
