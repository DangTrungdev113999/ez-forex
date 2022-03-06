import { useState, useEffect } from 'react';

export function useDynamicList<T extends { id?: string }>({ initList = [] }: { initList: T[] }) {
  const [list, setList] = useState<T[]>(initList);
  const [itemPicked, setItem] = useState<T>({});

  const onSetupData = () => {
    setList(initList);
    setItem({});
  };

  useEffect(() => {
    onSetupData();

    return () => onSetupData();
  }, []);

  const onHandleListPicked = (item: T) => {
    const checked = list.map(elm => elm.id).includes(item.id);
    if (checked) {
      const index = list.findIndex(elm => elm.id === item.id);
      const listAlpha = [...list];
      listAlpha.splice(index, 1);
      return setList(listAlpha);
    }
    setList(prev => [...prev, item]);
  };

  const setItemPicked = (item: T) => {
    setItem(item);
  };

  const onIscheckedById = (item: T) =>
    list?.map(elm => elm.id)?.includes(item.id) || item.id === itemPicked?.id;

  return {
    listPicked: list,
    onHandleListPicked,
    onIscheckedById,
    setList,
    itemPicked,
    setItemPicked,
  };
}
