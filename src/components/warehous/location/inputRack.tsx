import { useNavigate } from "@solidjs/router";
import {
  createSignal,
  createEffect,
  Component,
  Setter,
  Show,
  Accessor,
} from "solid-js";

interface Props {
  location: string;
  showSubmit: boolean;
  setShowSubmit: Setter<boolean>;
  loading: boolean;
  setShowLocationInput: Setter<boolean>;
  showLocationInput: Accessor<boolean>;
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
    props.location.split("-")[1] || "L"
  );

  const numList = Array.from({ length: 18 }, (_, i) => i + 1);
  const [numSelected, setNumSelected] = createSignal(
    props.location.split("-")[2] || "1"
  );

  const shelfList = Array.from({ length: 3 }, (_, i) => i + 1);
  const [shelfSelected, setShelfSelected] = createSignal(
    props.location.split("-")[3] || "1"
  );

  //현제 location 입력값 dom에서 가져오기
  const getSelectValue = (id: string) => {
    const selectValue = document.getElementById(id) as HTMLSelectElement;
    return selectValue?.value;
  };

  const handleRoomSelect = (e: any) => {
    const room = e.target.value;
    setRoomSelected(room);
  };

  const handleColumnSelect = (e: any) => {
    setColumnSelected(e.target.value);
  };

  const handleNumSelect = (e: any) => {
    setNumSelected(e.target.value);
    fetchUrl();
  };

  const handleShelfSelect = (e: any) => {
    setShelfSelected(e.target.value);
    fetchUrl();
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

    navigate(`/warehouse/${locationPath}`);
  };

  const submitHandle = () => {
    fetchUrl();
  };

  createEffect(() => {
    if (
      props.location !==
      `${getSelectValue("room")}-${getSelectValue("column")}-${getSelectValue(
        "num"
      )}-${getSelectValue("shelf")}`
    ) {
      // props.setShowLocationInput(false);
      props.setShowSubmit(true);
    }
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
        <Show when={props.showLocationInput()}>
          <div class="flex flex-col items-center">
            <select
              id="room"
              class="block mx-2 p-3 text-2xl rounded-lg border-2"
              onChange={handleRoomSelect}
              value={roomSelected()}
            >
              {roomList.map((item) => (
                <option value={item} selected={roomSelected() === String(item)}>
                  {item}
                </option>
              ))}
            </select>
            <div>저장고</div>
          </div>
          <Show when={!etc.includes(roomSelected())}>
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
                        <option
                          value={item}
                          selected={columnSelected() === String(item)}
                        >
                          {item}
                        </option>
                      ))
                    : columnList.map((item) => (
                        <option
                          value={item}
                          selected={columnSelected() === String(item)}
                        >
                          {item}
                        </option>
                      ))}
                </select>
                <div>열</div>
              </div>
              <Show
                when={columnSelected() !== "f"}
                fallback={
                  <div class="flex">
                    <div class="flex flex-col items-center">
                      <select
                        id="num"
                        class="mx-2 p-3 text-2xl rounded-lg border-2"
                        onChange={handleNumSelect}
                        value={numSelected()}
                      >
                        {numList.map((item) => (
                          <option
                            value={item}
                            selected={numSelected() === String(item)}
                          >
                            {item}
                          </option>
                        ))}
                      </select>
                      <div>번호</div>
                    </div>
                  </div>
                }
              >
                <div class="flex">
                  <div class="flex flex-col items-center">
                    <select
                      id="num"
                      class="mx-2 p-3 text-2xl rounded-lg border-2"
                      onChange={handleNumSelect}
                      value={numSelected()}
                    >
                      {numList.map((item) => (
                        <option
                          value={item}
                          selected={numSelected() === String(item)}
                        >
                          {item}
                        </option>
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
                        <option
                          value={item}
                          selected={shelfSelected() === String(item)}
                        >
                          {item === 1 ? "" : item}
                        </option>
                      ))}
                    </select>
                    <div>단</div>
                  </div>
                </div>
              </Show>
            </div>
          </Show>
        </Show>
      </div>

      <button
        class={`${
          !props.loading && props.showSubmit && "hidden"
        } w-[20rem] h-14 mt-12 bg-sky-500 rounded-lg text-white font-bold mb-12`}
        onClick={submitHandle}
      >
        랙으로 이동
      </button>
    </div>
  );
};

export default LocationCode;
