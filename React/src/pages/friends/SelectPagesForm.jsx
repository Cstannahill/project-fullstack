import React from 'react';
// import './select.css';
import 'rc-pagination/assets/index.css';
import locale from 'rc-pagination/lib/locale/en_US';
import Pagination from 'rc-pagination';

function SelectPagedItem(props) {
  // const pgInfo = props.pgInfo;

  return (
    <React.Fragment>
      <Pagination
        className="text-center  d-block w-30 text-dark"
        onChange={props.onPageChange}
        current={props.pgInfo.current}
        pageSize={props.pgInfo.pageSize}
        total={props.pgInfo.count}
        locale={locale}
      />
      <div className="form-group card-select justify-content-center">
        <h5 className="text-center text-dark">Display per Page:</h5>
        <select
          name="selectPagedItems"
          className="form-control pageSelect my-2"
          id="selectPagedItems"
          onChange={props.changePageSize}
          style={{
            appearance: 'menulist'
          }}
        >
          <option value={6}>6</option>
          <option value={9}>9</option>
          <option value={12}>12</option>
          <option value={15}>15</option>
        </select>
      </div>
    </React.Fragment>
  );
}

export default SelectPagedItem;
