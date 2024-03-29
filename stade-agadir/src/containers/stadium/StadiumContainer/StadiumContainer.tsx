import {  Container } from "@mui/material";

interface StadiumContainerProps {
  children: React.ReactNode;
}

const StadiumContainer = ({ children }: StadiumContainerProps) => {
  return <Container >{children}</Container>;
};
export default StadiumContainer;