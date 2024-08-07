import Image from "next/image";
import Nav from "./navbar/nav";
import Cart from "./cart/page";
import Context from "./context/contextMangment";
import Products from "./products/page";

export default function Home() {
  return (
      <>
      <Products />
      </>
  );
}
