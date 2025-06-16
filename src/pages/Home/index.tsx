import ClientSearch from "../../components/ClientSearch";
import ModalClient from "../../components/Modals/ModalClient";
import ProductSelector from "../../components/ProductSelector";
function Home() {
  return (
    <>
      <ClientSearch />
      <ProductSelector />
      <ModalClient />
    </>
  );
}

export default Home;
