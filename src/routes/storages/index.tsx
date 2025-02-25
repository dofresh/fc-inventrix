import Layout from "~/components/Layout";

import { AiFillEdit } from "solid-icons/ai";
import { useMe } from "~/api/query/useMe";
import { createSignal, Show } from "solid-js";
import { Role } from "~/generated/graphql";
import WarehouseDisplay from "~/components/storage/WarehouseDisplay";
import dayjs from "dayjs";
import {
  useEcountProducts,
  useGetEcountInventoryLocation,
} from "~/api/query/ecount/useEcountProductList";
import { useActualStorageItemsQuantity } from "~/api/query/actualInventory";

interface Props {}

function Storage(props: Props) {
  const [editable, setEditable] = createSignal(false);
  const me = useMe();

  const [atDate, setAtDate] = createSignal(
    dayjs(new Date()).format("YYYY-MM") + "-01"
  );
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
