import { Component, createSignal, createEffect, For, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { CameraDevice, Html5Qrcode, Html5QrcodeResult } from "html5-qrcode";
import { BarcodeScanIcon } from "~/svg/barcodeScan";
import { QrcodeScanIcon } from "~/svg/qrcodeScanIcon";
import { ImCancelCircle } from "solid-icons/im";

const qrConfig = { fps: 10, qrbox: { width: 300, height: 300 } };
const brConfig = { fps: 10, qrbox: { width: 300, height: 150 } };
let html5QrCode: Html5Qrcode;

interface QuickScannerProps {
  onResult: (res: string) => void;
  isMutipleScan?: boolean;
  isScan: boolean;
  setIsScan: (value: boolean) => void;
  setIsModalOpen: (value: boolean) => void;
  pallets: string[] | undefined;
}

export const QuickScanner: Component<QuickScannerProps> = (props) => {
  let fileRef: HTMLInputElement | undefined;

  const [scannerType, setScannerType] = createSignal("QR");
  const [cameraList, setCameraList] = createSignal<CameraDevice[]>([]);
  const [activeCamera, setActiveCamera] = createSignal<CameraDevice>();

  const handleClickAdvanced = () => {
    // 1. 먼저 isScan을 true로 설정하여 reader div가 렌더링되게 함
    props.setIsScan(true);

    // 2. reader 요소가 렌더링될 때까지 기다림
    setTimeout(() => {
      html5QrCode = new Html5Qrcode("reader");

      const qrCodeSuccessCallback = (
        decodedText: string,
        decodedResult: Html5QrcodeResult
      ) => {
        handleStop();
        if (!props.isMutipleScan) {
          if (props.pallets?.includes(decodedText.split(",")[0])) {
            alert(`랙에 존재하는 품목재고값입니다.`);
            props.setIsScan(false);
            return;
          }
          props.onResult(decodedText);
          alert(`decoded:__ ${decodedText}`);
          props.setIsModalOpen(true);
          props.setIsScan(false);
        }
      };

      html5QrCode.start(
        { facingMode: "environment" },
        scannerType() === "QR" ? qrConfig : brConfig,
        qrCodeSuccessCallback,
        undefined
      );
    }, 100); // reader 요소가 렌더링될 시간을 주기 위해 약간의 지연을 줌
  };

  const getCameras = () => {
    Html5Qrcode.getCameras()
      .then((devices: CameraDevice[]) => {
        if (devices && devices.length) {
          setCameraList(devices);
          setActiveCamera(devices.length > 1 ? devices[1] : devices[0]);
        }
      })
      .catch((err) => {
        console.error(err);
        setCameraList([]);
      });
  };

  const onCameraChange = (e: Event) => {
    const target = e.target as HTMLSelectElement;
    if (target.selectedIndex) {
      const selectedCamera = target.options[target.selectedIndex];
      const cameraId = selectedCamera.dataset.key;
      setActiveCamera(cameraList().find((cam) => cam.id === cameraId));
    }
  };

  const handleStop = () => {
    try {
      html5QrCode
        .stop()
        .then(() => {
          html5QrCode.clear();
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const scanFile = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (!target.files?.length) return;

    const imageFile = target.files[0];
    html5QrCode
      .scanFile(imageFile, true)
      .then((qrCodeMessage) => {
        props.onResult(qrCodeMessage);
        html5QrCode.clear();
      })
      .catch((err) => {
        console.log(`Error scanning file. Reason: ${err}`);
      });
  };

  createEffect(() => {
    const oldRegion = document.getElementById("qr-shaded-region");
    oldRegion?.remove();

    if (!cameraList().length) {
      getCameras();
    }

    if (cameraList().length > 0 && props.isScan) {
      const scrollToEnd = () => {
        if (typeof window !== "undefined") {
          window.scrollTo({
            top: document.body.scrollHeight,
            left: 0,
            behavior: "smooth",
          });
        }
      };

      const observer = new MutationObserver(scrollToEnd);
      observer.observe(document.body, {
        attributes: true,
        childList: true,
        subtree: true,
      });

      return () => observer.disconnect();
    }
  });

  return (
    <div style={{ position: "relative" }}>
      <Show when={props.isScan}>
        <div>
          <div class="flex justify-between">
            <div>
              <button onClick={getCameras} class="m-2"></button>
              <Show when={cameraList().length > 0}>
                <select
                  value={activeCamera()?.id}
                  onChange={onCameraChange}
                  class="border p-2 m-2"
                >
                  <For each={cameraList()}>
                    {(camera) => (
                      <option data-key={camera.id} value={camera.id}>
                        {camera.label}
                      </option>
                    )}
                  </For>
                </select>
              </Show>
            </div>

            <div>
              <button
                onClick={() => {
                  handleStop();
                  props.setIsScan(false);
                }}
              >
                <ImCancelCircle size={25} />
              </button>
            </div>
          </div>

          <div id="reader" class="w-full"></div>
          <br />
          <br />

          <div class="flex justify-between">
            <button
              class="border-4 rounded-lg p-2"
              onClick={() => fileRef?.click()}
            >
              라이브러리 사진
            </button>
          </div>

          <input
            type="file"
            hidden
            ref={fileRef}
            accept="image/*"
            onChange={scanFile}
          />
        </div>
      </Show>

      <Show when={!props.isScan}>
        <button
          class="w-full flex justify-center items-center"
          onClick={handleClickAdvanced}
        >
          {scannerType() === "QR" ? (
            <QrcodeScanIcon width={90} fill="#555" />
          ) : (
            <BarcodeScanIcon width={90} fill="#555" />
          )}
        </button>
      </Show>
    </div>
  );
};
