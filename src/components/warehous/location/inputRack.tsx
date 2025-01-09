import { useNavigate } from "@solidjs/router";
import { createSignal, createEffect, Component, Setter } from "solid-js";

interface Props {
  location: string;
  showSubmit: boolean;
  setShowSubmit: Setter<boolean>;
  loading: boolean;
}

const LocationCode: Component<Props> = (props) => {
  const navigate = useNavigate();

  const freezers = ["1", "2", "3", "4", "5"];
  const refrigerators = ["상온"];
  const etc = ["출고장", "패킹장", "이동중"];

  const roomList = [...freezers, ...refrigerators, ...etc];

  const [roomSelected, setRoomSelected] = createSignal(
    props.location.split("-")[0] || "1"
  );

  const columnList = ["L", "C", "R", "f"];
  const columnListNormal = ["a", "b", "c", "d", "e"];

  const [columnSelected, setColumnSelected] = createSignal(
    props.location.split("-")[1]
  );
  const numList = Array.from({ length: 18 }, (_, i) => i + 1);
  const [numSelected, setNumSelected] = createSignal(
    props.location.split("-")[2]
  );

  const shelfList = Array.from({ length: 3 }, (_, i) => i + 1);
  const [shelfSelected, setShelfSelected] = createSignal(
    props.location.split("-")[3] || "1"
  );

  const handleRoomSelect = (e: any) => {
    const room = e.target.value;
    setRoomSelected(room);
    if (freezers.includes(room)) {
      setColumnSelected("L");
      setNumSelected("1");
    } else if (refrigerators.includes(room)) {
      setColumnSelected("a");
      setNumSelected("1");
    } else if (etc.includes(room)) {
      setColumnSelected("");
      setNumSelected("");
    }
  };

  const handleColumnSelect = (e: any) => {
    setColumnSelected(e.target.value);
  };

  const handleNumSelect = (e: any) => {
    setNumSelected(e.target.value);
  };

  const handleShelfSelect = (e: any) => {
    setShelfSelected(e.target.value);
  };

  const fetchUrl = () => {
    let locationPath = `${roomSelected()}`;
    if (columnSelected()) {
      locationPath = `${roomSelected()}-${columnSelected()}`;
    }
    if (columnSelected() && numSelected()) {
      locationPath = `${roomSelected()}-${columnSelected()}-${numSelected()}`;
    }
    if (shelfSelected() !== "1") {
      locationPath += `-${shelfSelected()}`;
    }

    const baseUrl = import.meta.env.DEV
      ? "http://localhost:3004"
      : "https://fc.freshhada.com";

    navigate(`/warehouse/${locationPath}`);
  };

  const submitHandle = () => {
    fetchUrl();
  };

  createEffect(() => {
    fetchUrl();
  });

  createEffect(() => {
    const shelf =
      props.location.split("-")[3] === undefined
        ? "1"
        : props.location.split("-")[3];

    props.setShowSubmit(
      props.location.split("-")[0] === roomSelected() &&
        props.location.split("-")[1] === columnSelected()
    );
  });

  return (
    <div class="w-full flex flex-col justify-center items-center">
      <div class="flex mt-12">
        <div class="flex flex-col items-center">
          <select
            id="room"
            class="block mx-2 p-3 text-2xl rounded-lg border-2"
            onChange={handleRoomSelect}
            value={roomSelected()}
          >
            {roomList.map((item) => (
              <option value={item}>{item}</option>
            ))}
          </select>
          <div>저장고</div>
        </div>
        {!etc.includes(roomSelected()) && (
          <div class="flex">
            <div class="flex flex-col items-center">
              <select
                id="column"
                class="block mx-2 p-3 text-2xl rounded-lg border-2"
                onChange={handleColumnSelect}
                value={columnSelected()}
              >
                {refrigerators.includes(roomSelected())
                  ? columnListNormal.map((item) => (
                      <option value={item}>{item}</option>
                    ))
                  : columnList.map((item) => (
                      <option value={item}>{item}</option>
                    ))}
              </select>
              <div>열</div>
            </div>
            {columnSelected() === "f" ? (
              <div class="flex">
                <div class="flex flex-col items-center">
                  <select
                    id="num"
                    class="mx-2 p-3 text-2xl rounded-lg border-2"
                    onChange={handleNumSelect}
                    value={numSelected()}
                  >
                    {numList.map((item) => (
                      <option value={item}>{item}</option>
                    ))}
                  </select>
                  <div>번호</div>
                </div>
              </div>
            ) : (
              <div class="flex">
                <div class="flex flex-col items-center">
                  <select
                    id="num"
                    class="mx-2 p-3 text-2xl rounded-lg border-2"
                    onChange={handleNumSelect}
                    value={numSelected()}
                  >
                    {numList.map((item) => (
                      <option value={item}>{item}</option>
                    ))}
                  </select>
                  <div>번호</div>
                </div>
                <div class="flex flex-col items-center">
                  <select
                    id="shelf"
                    class="mx-2 p-3 text-2xl rounded-lg border-2"
                    onChange={handleShelfSelect}
                    value={shelfSelected()}
                  >
                    {shelfList.map((item) => (
                      <option value={item}>{item === 1 ? "" : item}</option>
                    ))}
                  </select>
                  <div>단</div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {/* <button
        class={`${
          !props.loading && props.showSubmit && "hidden"
        } w-[20rem] h-14 mt-12 bg-sky-500 rounded-lg text-white font-bold`}
        onClick={submitHandle}
      >
        랙으로 이동
      </button> */}
    </div>
  );
};

export default LocationCode;
