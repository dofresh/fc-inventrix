import {
  Component,
  createSignal,
  createEffect,
  onMount,
  Show,
  For,
} from "solid-js";
import { IoBackspaceSharp } from "solid-icons/io";
import { useNavigate } from "@solidjs/router";
import { CameraDevice, Html5Qrcode, Html5QrcodeResult } from "html5-qrcode";
import { QrcodeScanIcon } from "~/svg/qrcodeScanIcon";
import { BarcodeScanIcon } from "~/svg/barcodeScan";

const qrConfig = { fps: 10, qrbox: { width: 300, height: 300 } };
const brConfig = { fps: 10, qrbox: { width: 300, height: 150 } };
let html5QrCode: Html5Qrcode;

interface ScannerProps {
  type: string;
  onResult: (res: string) => void;
  isMutipleScan?: boolean;
}

export const Scanner: Component<ScannerProps> = (props) => {
  let fileRef: HTMLInputElement | undefined;
  const navigate = useNavigate();

  const [cameraList, setCameraList] = createSignal<CameraDevice[]>([]);
  const [activeCamera, setActiveCamera] = createSignal<CameraDevice>();
  const [isScan, setIsScan] = createSignal(false);

  const handleClickAdvanced = () => {
    setIsScan(true);
    const qrCodeSuccessCallback = (
      decodedText: string,
      decodedResult: Html5QrcodeResult
    ) => {
      console.info(decodedResult, decodedText);
      if (!props.isMutipleScan) {
        props.onResult(decodedText);
        alert(`decoded:__ ${decodedText}`);
        handleStop();
      }
    };

    html5QrCode
      .start(
        { facingMode: "environment" },
        props.type === "QR" ? qrConfig : brConfig,
        qrCodeSuccessCallback,
        undefined
      )
      .then(() => {
        // const oldRegion = document.getElementById("qr-shaded-region");
        // if (oldRegion) oldRegion.innerHTML = "";
      });
  };

  const getCameras = () => {
    Html5Qrcode.getCameras()
      .then((devices: CameraDevice[]) => {
        console.info(devices);
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

  const onCameraChange = (e: any) => {
    if (e.target.selectedIndex) {
      const selectedCamera = e.target.options[e.target.selectedIndex];
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
      .scanFile(imageFile, /* showImage= */ true)
      .then((qrCodeMessage) => {
        props.onResult(qrCodeMessage);
        html5QrCode.clear();
      })
      .catch((err) => {
        console.log(`Error scanning file. Reason: ${err}`);
      });
  };

  onMount(() => {
    html5QrCode = new Html5Qrcode("reader");
    const oldRegion = document.getElementById("qr-shaded-region");
    oldRegion?.remove();
    if (!cameraList().length) {
      getCameras();
    }
  });

  createEffect(() => {
    if (cameraList().length) {
      // 카메라 리스트가 변경될 때의 로직
    }
  });

  return (
    <div style={{ position: "relative" }}>
      <div class="flex justify-between">
        <div>
          <button onClick={getCameras} class="m-2">
            카메라선택
          </button>
          {cameraList().length > 0 && (
            <select
              value={activeCamera()?.id}
              onChange={onCameraChange}
              class="border p-2"
            >
              <For each={cameraList()}>
                {(camera) => (
                  <option data-key={camera.id} value={camera.id}>
                    {camera.label}
                  </option>
                )}
              </For>
            </select>
          )}
        </div>

        <Show when={isScan()}>
          <div>
            <button
              onClick={() => {
                handleStop();
                setIsScan(false);
              }}
            >
              스켄 취소
            </button>
          </div>
        </Show>
      </div>

      <Show when={!isScan()}>
        <div>
          <button
            class="w-full flex justify-center items-center p-12"
            onClick={handleClickAdvanced}
          >
            {props.type === "QR" ? (
              <QrcodeScanIcon width={120} fill="111" />
            ) : (
              <BarcodeScanIcon width={120} fill="111" />
            )}
          </button>
        </div>
      </Show>

      <div id="reader"></div>
      <br />
      <br />

      <div class="flex justify-between">
        <button
          class="border-4 rounded-lg p-2"
          onClick={() => fileRef?.click()}
        >
          라이브러리 사진
        </button>
        <button
          class="border-4 rounded-lg p-2 text-4xl"
          onClick={() => navigate(-1)}
        >
          <IoBackspaceSharp />
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
  );
};
