import React from "react";
import styles from "../../../pages/Step2/styles.module.scss";
import CheckBoxRS from "../../CheckBoxRS";
import Input from "../Input";
import SelectRS from "../SelectRS";

const AddressItem = () => {
  return (
    <>
      <div className={styles.row}>
        <div>
          <p className={styles.name_option}>Адрес</p>
          <div className={styles.checks} style={{ marginBottom: 0 }}>
            <div className={styles.checks__item}>
              <CheckBoxRS />
              <p>Юридический</p>
            </div>
            <div className={styles.checks__item}>
              <CheckBoxRS />
              <p>Фактический</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.column}>
          <div className={styles.row}>
            <Input name={"Адрес"} placeholder={"Напишите адрес"} />
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.row}>
            <SelectRS name={"Основание"} placeholder={"Аренда"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressItem;
