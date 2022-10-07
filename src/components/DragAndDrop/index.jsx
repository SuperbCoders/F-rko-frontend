import React, { useState } from "react";
import styles from "../../pages/Step2/styles.module.scss";
import { getFormatFile, getSizeMb } from "../../helpers";

const DragDropFile = () => {
  const [dragActive, setDragActive] = React.useState(false);
  const inputRef = React.useRef(null);
  const [documentList, setDocumentList] = useState([]);

  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const addToDocumentList = (file) => {
    if (documentList.length > 4) return;
    setDocumentList((prevState) => [...documentList, file]);
  };

  // triggers when file is dropped
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer?.files[0]) {
      addToDocumentList(e.dataTransfer.files[0]);
    }
  };

  // triggers when file is selected with click
  const handleChange = function (e) {
    if (e.target?.files[0]) addToDocumentList(e.target.files[0]);
  };

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <form
      className="form-file-upload"
      onDragEnter={handleDrag}
      onClick={onButtonClick}
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        ref={inputRef}
        type="file"
        className="input-file-upload"
        multiple={true}
        onChange={handleChange}
      />

      <label className={`${dragActive ? "drag-active" : ""} label-file-upload`}>
        {documentList.length > 0 ? (
          <div className={styles.documents}>
            {documentList.map((document) => {
              return (
                <div className={styles.mb24}>
                  <div className={styles.download__item}>
                    <div className={styles.icon}>
                      <p className={styles.format}>
                        {getFormatFile(document.name)}
                      </p>
                      <p className={styles.size}>{getSizeMb(document.size)}</p>
                    </div>
                    <p className={styles.name}>{document.name}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <p>Перетащите файлы сюда или нажмите,</p>
            <button className="upload-button">
              чтобы выбрать файлы для загрузки
            </button>
            <p>до 5 файлов или 20мб</p>
          </div>
        )}
      </label>

      {dragActive && (
        <div
          className="drag-file-element"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        />
      )}
    </form>
  );
};

export default DragDropFile;
