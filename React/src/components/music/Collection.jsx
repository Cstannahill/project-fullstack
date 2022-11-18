import React, { useEffect, useState } from "react";
import musicServices from "../../services/musicService";
import { MdAlbum } from "react-icons/md";
import Table from "react-bootstrap/Table";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import locale from "rc-pagination/lib/locale/en_US";
import apiClient from "../../spotify";
import "./music.css";

const Collection = () => {
  const [collection, setCollection] = useState({
    arrayOfRecords: [],
    recordComponents: [],
    pageIndex: 0,
    pageSize: 50,
    current: 1,
    totalRecords: 729,
  });

  useEffect(() => {
    musicServices
      .getPaginated(collection.pageIndex, collection.pageSize)
      .then(getAllSuccess)
      .catch(getAllError);
  }, [collection.pageIndex, collection.pageSize]);

  useEffect(() => {
    apiClient.get("artists/{id}/top-tracks");
  });

  const getAllSuccess = (response) => {
    console.log(response.item.pagedItems);
    let arrayOfRcrds = response.item.pagedItems;
    let item = response.item;
    setCollection((prevState) => {
      const newRecords = { ...prevState };
      newRecords.arrayOfRecords = arrayOfRcrds;
      newRecords.recordComponents = arrayOfRcrds.map(mapRecord);
      newRecords.totalRecords = item.totalCount;
      return newRecords;
    });
  };

  const getAllError = (error) => {
    console.warn(error);
  };

  const onPageChange = (pageNumber) => {
    console.log("page clicked", pageNumber);

    setCollection((prevState) => {
      const newPage = { ...prevState };
      newPage.current = pageNumber;
      newPage.pageIndex = newPage.current - 1;
      return newPage;
    });
  };

  const mapRecord = (record) => {
    return (
      <tr key={"Record List" + record.id}>
        <td>
          <Link to="#">{record.artist}</Link>
        </td>
        <td>{record.title}</td>
        <td>{record.label}</td>
        <td>{record.format}</td>
        <td>{record.released}</td>
      </tr>
    );
  };

  return (
    <>
      <div className="d-flex justify-content-center p-2">
        <h1 className="text-center">
          Vinyl C<MdAlbum />
          llection
        </h1>
      </div>
      <div className="d-flex justify-content-center">
        <Pagination
          onChange={onPageChange}
          pageIndex={collection.pageIndex}
          pageSize={collection.pageSize}
          current={collection.current}
          total={collection.totalRecords}
          locale={locale}
        />
      </div>
      <div className="row">
        {collection.result && collection.recordComponents}{" "}
      </div>
      <Table striped>
        <thead>
          <tr>
            <th>Artist</th>
            <th>Album</th>
            <th>Label</th>
            <th>Format</th>
            <th>Released</th>
          </tr>
        </thead>
        <tbody>{collection.recordComponents}</tbody>
      </Table>
    </>
  );
};

export default Collection;
