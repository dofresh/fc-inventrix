import { A } from "@solidjs/router";
import { Show } from "solid-js";
import { MenuType } from "~/contracts/types/menu";

interface Props {
  item: MenuType;
}

function MobileMenu(props: Props) {
  return (
    <li>
      <Show
        when={!props.item.isSeperate}
        fallback={
          <div
            class={props.item.isSeperate ? "border-b border-gray-200" : ""}
          ></div>
        }
      >
        <A class="link" href={props.item.url || ""}>
          {props.item.Icon && <props.item.Icon class="min-w-max" size={23} />}
          {props.item.name}
        </A>
      </Show>
    </li>
  );
}

export default MobileMenu;
