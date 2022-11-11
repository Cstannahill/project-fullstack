import React, { useEffect, useState } from "react";
import musicServices from "../../services/musicService";
import { MdAlbum } from "react-icons/md";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

const Collection = () => {
  useEffect(() => {
    // document.body.style.backgroundColor = "rgba(23, 22, 22, 0.935)";
    // document.body.style.color = "silver";
    musicServices.getPaginated(0, 50).then(getAllSuccess).catch(getAllError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [collection, setCollection] = useState({
    arrayOfRecords: [],
    recordComponents: [],
  });

  const getAllSuccess = (response) => {
    console.log(response.item.pagedItems);
    setCollection((prevState) => {
      const newRecords = { ...prevState };
      newRecords.arrayOfRecords = response.item.pagedItems;
      newRecords.recordComponents = newRecords.arrayOfRecords.map(mapRecord);
      return newRecords;
    });
  };

  const getAllError = (error) => {
    console.warn(error);
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
