import React from "react";
import styles from "../../../pages/Step2/styles.module.scss";
import CheckBoxRS from "../../CheckBoxRS";
import Input from "../Input";
import SelectRS from "../SelectRS";

const AddressItem = ({ id, type, address, onCheckbox, onChange }) => {

  return (
    <>
      <div className={styles.row}>
        <div>
          <p className={styles.name_option}>Адрес</p>
          <div className={styles.checks} style={{ marginBottom: 0 }}>
            <div className={styles.checks__item}>
              <CheckBoxRS
                isChecked={type === "Юридический"}
                onChange={onCheckbox("Юридический", id)}
              >
                <p>Юридический</p>
              </CheckBoxRS>
            </div>
            <div className={styles.checks__item}>
              <CheckBoxRS
                isChecked={type === "Фактический"}
                onChange={onCheckbox("Фактический", id)}
              >
                <p>Фактический</p>
              </CheckBoxRS>
            </div>
            <div className={styles.checks__item}>
              <CheckBoxRS
                isChecked={type === "Почтовый"}
                onChange={onCheckbox("Почтовый", id)}
              >
                <p>Почтовый</p>
              </CheckBoxRS>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.column}>
          <div className={styles.row}>
            <Input
              value={address}
              name="Адрес"
              inputName={id}
              placeholder="Напишите адрес"
              onChange={onChange(id)}
            />
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.row}>
            <SelectRS 
              value={{ value: "Аренда", label: "Аренда" }}
              defaultValue={{ value: "Аренда", label: "Аренда" }}
              name="Основание"
              options={[ { value: "Аренда", label: "Аренда" } ]}
              placeholder="Аренда"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressItem;
