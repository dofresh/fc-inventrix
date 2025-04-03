import { Component } from "solid-js";
import { SearchIcon } from "~/svg/search_icon";

interface Props {
  searchInputHandle: (e: any) => void;
}

const SearchInput: Component<Props> = (props) => {
  return (
    <div class="relative flex flex-row items-center ml-3">
      <div class="absolute left-0">
        <SearchIcon width={18} fill="#aaa" />
      </div>
      <input
        type="text"
        onInput={props.searchInputHandle}
        placeholder="Search..."
        class="lg:flex input input-bordered w-full max-w-[290px] ml-5 border-b border-gray-300 p-1"
      />
    </div>
  );
};

export default SearchInput;
