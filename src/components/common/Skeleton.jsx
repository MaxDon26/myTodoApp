import { ListItem, Skeleton as SkeletonMUI } from "@mui/material";
import React from "react";

export const Skeleton = () => {
  return (
    <ListItem divider>
      <SkeletonMUI width={25} />
      <SkeletonMUI width="100%" sx={{ ml: 3, mr: 1 }} />
      <SkeletonMUI width="15%" sx={{ mx: 1 }} />
      <SkeletonMUI width={30} sx={{ mx: 1 }} />
      <SkeletonMUI width={30} sx={{ mx: 1 }} />
    </ListItem>
  );
};
