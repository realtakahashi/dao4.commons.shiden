import { Header } from '@mantine/core';
import { Aperture } from "react-feather";

export function DfCHeader() {
  return (
    <Header height={70} className="text-white pt-2" style={{"backgroundColor":"grey","fontFamily":"Gill sans"}}>
        <div style={{"display":"flex","flexDirection":"row", "justifyContent":"center", "verticalAlign":"center"}}>
            <Aperture size={50}/>
            <text style={{"fontSize":35}}>dao4.commons.shiden</text>
        </div>
    </Header>
  );
}