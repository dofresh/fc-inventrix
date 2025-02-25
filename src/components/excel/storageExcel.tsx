import { createSignal } from "solid-js";
import { DropdownMenu } from "../DropdownMenu";
import { ExcelIcon } from "~/svg/excel_icon";
import Modal from "../Model";
import StorageExcelExport, { Item } from "./export/storageExcelExport";
import dayjs from "dayjs";
import { Grouped } from "../storage/WarehouseDisplay";

interface Props {
  data: Grouped;
}

function StorageExcel(props: Props) {
  const [showExcelUploadModal, setShowExcelUploadModal] = createSignal(false);
  return (
    <div>
      <Modal
        isOpen={showExcelUploadModal()}
        onClose={() => setShowExcelUploadModal(false)}
      >
        <div class="h-[calc(100vh-90px)] lg:h-[440px] border border-slate-300 ">
          UploadExcelEcountProfitMargin
        </div>
      </Modal>
      <DropdownMenu
        trigger={
          <div class="flex items-center">
            <ExcelIcon size={44} />
          </div>
        }
      >
        <div class="px-4 py-2 cursor-pointer hover:bg-slate-100">
          <StorageExcelExport
            data={props.data}
            fileName={`판매현황-${dayjs().format("YYYY년 M월 D일")} `}
          />
        </div>
      </DropdownMenu>
    </div>
  );
}

export default StorageExcel;
