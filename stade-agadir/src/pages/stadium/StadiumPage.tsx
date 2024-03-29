import { StadiumDisplayer } from "../../components/StadiumDisplayer";
import StadiumContainer from "../../containers/stadium/StadiumContainer/StadiumContainer";
import { stadiumMapSource } from "../../constants";

const StadiumPage = ()=>{
    
return (
    <StadiumContainer>
        <StadiumDisplayer  stadiumMapSource={stadiumMapSource} /> 
    </StadiumContainer>
);
};
export default StadiumPage;