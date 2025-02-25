import Layout from "~/components/Layout";
import { useMe } from "~/api/query/useMe";
import WarehouseDisplay from "~/components/storage/WarehouseDisplay";
import { useActualStorageItemsQuantity } from "~/api/query/actualInventory";

interface Props {}

function Storage(props: Props) {
  // const [editable, setEditable] = createSignal(false);
  const me = useMe();

  // const [atDate, setAtDate] = createSignal(
  //   dayjs(new Date()).format("YYYY-MM") + "-01"
  // );
  // const getEcountProduct = useEcountProducts();
  // const getInventory = useGetEcountInventoryLocation();
  const ActualStorageInventory = useActualStorageItemsQuantity("20250226");

  return (
    <Layout wide>
      <WarehouseDisplay
        items={
          ActualStorageInventory.data?.getStorageItemsQuantity
            .itemsQuantities || []
        }
      />
    </Layout>
  );
}

export default Storage;
