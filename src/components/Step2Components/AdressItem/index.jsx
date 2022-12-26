import React from "react";
import { RequisitesContext } from "../../../contexts/companyRequisits";
import styles from "../../../pages/Step2/styles.module.scss";
import CheckBoxRS from "../../CheckBoxRS";
import DaDataSelect from "../../DaDataSelect";
import DeleteButton from "../../DeleteButton";

const AddressItem = ({ id, type, address, onSelectType, onSelectAddress }) => {
  const { setData } = React.useContext(RequisitesContext)

  const removeFromAddressList = (id) => () => {
    setData(prev => {
      prev.addresses = prev.addresses.filter((_, i) => i !== id)
      return {...prev}
    })
  }

  const formatedOptions = (list) => list.map((item) => ({ value: item.unrestricted_value, label: item.unrestricted_value }))

  return (
    <>
      <div className={styles.row}>
        <div>
          <p className={styles.name_option}>Адрес</p>
          <div className={styles.checks} style={{ marginBottom: 0 }}>
            <div className={styles.checks__item}>
              <CheckBoxRS
                isChecked={type?.includes("Юридический")}
                onChange={onSelectType("Юридический", id)}
                >
                <p>Юридический</p>
              </CheckBoxRS>
            </div>
            <div className={styles.checks__item}>
              <CheckBoxRS
                isChecked={type?.includes("Почтовый")}
                onChange={onSelectType("Почтовый", id)}
                >
                <p>Почтовый</p>
              </CheckBoxRS>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.row} ${styles.align_end}`}>
        <div className={`${styles.column} ${styles.column_66}`}>
          <div className={styles.row}>
            <DaDataSelect 
              name="Адрес"
              nameStyles={{ color: "#8E909B", fontSize: "14px", marginBottom: "8px" }}
              value={address}
              isAddr={true}
              message="Напишите адрес"
              formatedOptions={formatedOptions}
              onSelect={onSelectAddress(id)}
            />
          </div>
        </div>
        <div style={{ width: "auto" }} className={styles.column}>
          <DeleteButton onClick={removeFromAddressList(id)} />
        </div>
      </div>
    </>
  );
};

export default AddressItem;
