import { Box,  } from "@mui/material";
import CardComponent from "./CardComponent";

const Dashboard: React.FC = () => {
  return (
    <>
      <span style={{ whiteSpace: "nowrap", fontSize: "28px", display:"flex", justifyContent:"flex-start"}}>
        CNAPP Dashboard
      </span>
      <Box style={{ display: "flex" }}>
        <CardComponent />
      </Box>
    </>
  );
};

export default Dashboard;
