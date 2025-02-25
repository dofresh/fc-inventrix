// QrGetPallet.tsx
import { Component, createSignal, createEffect } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { EcountProductsQuery } from "~/generated/graphql";
import AddStockItmesModal from "./Modals/addStockItmesModal";
import { StockType } from "./warehous/location/stockItems";
import { QuickScanner } from "./QrCode/quickScan";

interface Props {
  isScan: boolean;
  setIsScan: (value: boolean) => void;
  rackId: string | undefined;
  location: string | undefined;
  pallets: string[] | undefined;
  productData: EcountProductsQuery | undefined;
}

export type palletType = {
  palletCode: string;
  enterQuantity: number;
  productCode: string;
  warehousingDate: string;
  expirationDate: string;
};

export const QrGetPallet: Component<Props> = (props) => {
  const [isModalOpen, setIsModalOpen] = createSignal(false);
  const [stocks, setStocks] = createSignal<StockType[]>([]);
  const [currentStock, setCurrentStock] = createSignal<StockType | undefined>();
  const [param, setParam] = createSignal<palletType>();
  const [decodedValue, setDecodedValue] = createSignal("");

  const navigate = useNavigate();

  const handleCloseModal = () => {
    setCurrentStock(undefined);
    setIsModalOpen(false);
  };

  createEffect(() => {
    const value = decodedValue();
    if (value !== "") {
      const [
        palletCode,
        productCode,
        enterQuantity,
        warehousingDate,
        expirationDate,
      ] = value.replace(/\s/g, "").split(",");

      if (import.meta.env.DEV) {
        // console.log("value:", value.split("/")[4]);
      }

      setParam({
        palletCode,
        productCode,
        enterQuantity: Number(enterQuantity),
        expirationDate,
        warehousingDate,
      });

      setTimeout(() => {
        setIsModalOpen(true);
      }, 1000);
    }
  });

  return (
    <div class="mx-6 max-w-[30rem]">
      <AddStockItmesModal
        productData={props.productData}
        currentStock={currentStock()}
        isOpen={isModalOpen()}
        onClose={handleCloseModal}
        rackId={props.rackId}
        setStocks={setStocks}
        stocks={stocks()}
        location={props.location || ""}
        param={param()}
        setIsScan={props.setIsScan}
      />
      <QuickScanner
        pallets={props.pallets}
        isScan={props.isScan}
        setIsModalOpen={setIsModalOpen}
        setIsScan={props.setIsScan}
        onResult={(res: string) => setDecodedValue(res)}
      />
    </div>
  );
};

export default QrGetPallet;
