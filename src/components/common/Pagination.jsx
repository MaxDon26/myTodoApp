import React from "react";

import { Pagination as PaginationMUI } from "@mui/material";

export const Pagination = ({ values }) => {
  const { todosCrop, pageCount, setPage, page, count } = values;
  return (
    <>
      {count > todosCrop.length && (
        <PaginationMUI
          count={pageCount}
          page={page}
          sx={{ display: "flex", justifyContent: "center", my: 3 }}
          variant="outlined"
          color="primary"
          onChange={(event, value) => setPage(value)}
        />
      )}
    </>
  );
};
