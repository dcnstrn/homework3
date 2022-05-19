import React, { useEffect, useState, useMemo, useCallback } from 'react';
import {useInView} from 'react-intersection-observer';
import {useDebouncedCallback} from 'use-debounce';
import FlatListEventEmitter from '../../services/flatListEventEmitter';
import { generator } from '../../utils/generator';

const FlatList = () => {
  const {ref: endPageRef, inView} = useInView();
  const [data, setData] = useState<any[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [filteredData, setFilteredData] = useState<any[] | undefined>(undefined);

  const [showList, setShowList] = useState<boolean>(false);

  useEffect(() => {
    const onEvent = (visible: boolean) => {
      setShowList(visible);
    }

    FlatListEventEmitter.on('show-flat-list', onEvent);

    return () => {
      FlatListEventEmitter.off('show-flat-list', onEvent);
    };
  }, []);

  const updateStateWithDebounce = useDebouncedCallback(() => {
    setData(prevData => [...prevData, ...generator(20)]);
  }, 50);

  const debounceSearch = useDebouncedCallback(() => {
    if (!searchText) {
      setFilteredData(undefined);
      return;
    }

    const filters = data.filter(item => {
      return item.title.toLowerCase().includes(searchText.toLowerCase());
    });

    setFilteredData(filters);
  }, 150);

  const onTextChange = useCallback((event: any) => {
    setSearchText(event.target.value);

    debounceSearch();
  }, [])

  useEffect(() => {
    if (inView) {
      updateStateWithDebounce();
    }
  }, [inView]);

  const listItems = useMemo(() => {
    if (!showList) {
      return null;
    }

    return (filteredData || data).map((item, index) => {
      return (
        <div key={item.title + index}>
          <div className={'title'}>{item.title}</div>
          <img src={item.imgUrl} />
          <div className={'description'}>{item.description}</div>
        </div>
      );
    });
  }, [data, filteredData, showList]);

  return (
    <div className={'list'}>
      <input type={'text'} onChange={onTextChange} placeholder={'Search'} value={searchText}/>
      {listItems}
      <div ref={endPageRef} />
    </div>
  );
};

export default FlatList;
