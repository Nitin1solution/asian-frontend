
import Featured from "@/components/Featured";
import styles from "./page.module.css";
import dynamic from "next/dynamic";

import MemberDispatch from "@/components/MemberDispatch";

 function Home() {
  return (
    <>
   <Featured/>
   <MemberDispatch/>
    </>
  );
}
export default dynamic (() => Promise.resolve(Home), {ssr: false})
