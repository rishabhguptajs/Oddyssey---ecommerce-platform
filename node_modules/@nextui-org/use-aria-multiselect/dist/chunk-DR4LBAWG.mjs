// src/use-multiselect-list-state.ts
import { useListState } from "@react-stately/list";
function useMultiSelectListState(props) {
  const {
    collection,
    disabledKeys,
    selectionManager,
    selectionManager: { setSelectedKeys, selectedKeys, selectionMode }
  } = useListState(props);
  const missingKeys = [];
  const selectedItems = selectedKeys.size !== 0 ? Array.from(selectedKeys).map((key) => {
    const item = collection.getItem(key);
    if (!item) {
      missingKeys.push(key);
    }
    return item;
  }).filter(Boolean) : null;
  if (missingKeys.length) {
    console.warn(
      `Select: Keys "${missingKeys.join(
        ", "
      )}" passed to "selectedKeys" are not present in the collection.`
    );
  }
  return {
    collection,
    disabledKeys,
    selectionManager,
    selectionMode,
    selectedKeys,
    setSelectedKeys: setSelectedKeys.bind(selectionManager),
    selectedItems
  };
}

export {
  useMultiSelectListState
};
