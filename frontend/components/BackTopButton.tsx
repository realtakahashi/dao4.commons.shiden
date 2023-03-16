import { Group } from "@mantine/core";
import Link from "next/link";

export function BackTopButton() {
    return (
        <Group position="apart" >
        <button className="m-5 px-6 px-3 border-double border-white border-2 bg-black rounded text-white  hover:border-orange-500 text-30px" style={{"fontFamily":"Gill sans"}}>
          <Link href="/">Back to Top</Link>
        </button>  
        </Group>
    )
}