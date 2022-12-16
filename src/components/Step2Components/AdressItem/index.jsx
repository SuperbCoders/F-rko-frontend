import React from "react";
import { RequisitesContext } from "../../../contexts/companyRequisits";
import styles from "../../../pages/Step2/styles.module.scss";
import CheckBoxRS from "../../CheckBoxRS";
import DaDataSelect from "../../DaDataSelect";
import DeleteButton from "../../DeleteButton";
import SelectRS from "../SelectRS";

const AddressItem = ({ id, type, address, basis, onSelectType, onSelectAddress, onSelectBasis }) => {
  const { setData } = React.useContext(RequisitesContext)

  const options = [ 
    { value: "Аренда", label: "Аренда" },
    { value: "Собственность", label: "Собственность" } 
  ]

  const removeFromAddressList = (id) => () => {
    setData(prev => {
      prev.addresses = prev.addresses.filter(a => a.id !== id)
      return {...prev}
    })
  }

  const formatedOptions = (list) => list.map((item) => ({ value: item.data.address.unrestricted_value, label: item.data.address.unrestricted_value }))

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
                isChecked={type?.includes("Фактический")}
                onChange={onSelectType("Фактический", id)}
                >
                <p>Фактический</p>
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
        <div className={styles.column}>
          <div className={styles.row}>
            <DaDataSelect 
              name="Адрес"
              nameStyles={{ color: "#8E909B", fontSize: "14px", marginBottom: "8px" }}
              value={address}
              message="Напишите адрес"
              formatedOptions={formatedOptions}
              onSelect={onSelectAddress(id)}
            />
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.row}>
            <SelectRS 
              nameStyles={{ color: "#8E909B", fontSize: "14px", marginBottom: "8px" }}
              value={{ value: basis, label: basis }}
              name="Основание"
              options={options}
              onChange={onSelectBasis(id)}
              placeholder="Аренда"
            />
          </div>
        </div>
        <div className={styles.column}>
          <DeleteButton onClick={removeFromAddressList(id)} />
        </div>
      </div>
    </>
  );
};

export default AddressItem;
