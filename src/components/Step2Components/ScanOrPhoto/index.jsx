import styles from "../../../pages/Step2/styles.module.scss";
import DragDropFile from "../../DragAndDrop";
import React from "react";
import QRCodeSVG from "qrcode.react";

const ScanOrPhoto = ({ name }) => {
  return (
    <div className={styles.mb24}>
      <p className={styles.scan__name}>{name}</p>
      <div className={styles.scan__wrapper}>
        <DragDropFile />
        <p className={styles.scan__or}>или</p>
        <div className={styles.scan__right}>
          <div className={styles.qr}>
            <QRCodeSVG size={80} value="https://ya.ru/" />
          </div>
          <p>
            Наведите камеру телефона на QR код,
            <br /> чтобы сфотографироваться
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScanOrPhoto;
