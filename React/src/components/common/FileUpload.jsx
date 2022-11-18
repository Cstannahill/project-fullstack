import React from "react";
import { useDropzone } from "react-dropzone";
import Flex from "../../components/common/Flex";
import cloudUpload from "../../assets/img/icons/cloud-upload.svg";
import CardDropdown from "../../components/common/CardDropdown";
import { Dropdown, Image } from "react-bootstrap";
import { getSize } from "../../helpers/utils";

function FileDrop() {
  const [files, setFiles] = React.useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const handleRemove = (path) => {
    setFiles(files.filter((file) => file.path !== path));
  };

  return (
    <>
      <div {...getRootProps({ className: "dropzone-area py-5" })}>
        <input {...getInputProps()} />
        <Flex justifyContent="center">
          <img src={cloudUpload} alt="" width={25} className="me-2" />
          <p className="fs-0 mb-0 text-700">Drop your images here</p>
        </Flex>
      </div>

      <div className="mt-3">
        {files.map((file) => (
          <Flex
            alignItems="center"
            className="py-3 border-bottom btn-reveal-trigger"
            key={file.path}
          >
            <Image
              rounded
              width={40}
              height={40}
              src={file.preview}
              alt={file.path}
            />
            <Flex
              justifyContent="between"
              alignItems="center"
              className="ms-3 flex-1"
            >
              <div>
                <h6>{file.path}</h6>
                <Flex className="position-relative" alignItems="center">
                  <p className="mb-0 fs--1 text-400 line-height-1">
                    <strong className="text-dark">{getSize(file.size)}</strong>
                  </p>
                </Flex>
              </div>
            </Flex>
            <CardDropdown>
              <div className="py-2">
                <Dropdown.Item
                  className="text-danger"
                  onClick={() => handleRemove(file.path)}
                >
                  Remove
                </Dropdown.Item>
              </div>
            </CardDropdown>
          </Flex>
        ))}
      </div>
    </>
  );
}

export default FileDrop;
