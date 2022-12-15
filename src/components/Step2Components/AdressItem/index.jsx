import React from "react";
import { RequisitesContext } from "../../../contexts/companyRequisits";
import styles from "../../../pages/Step2/styles.module.scss";
import DaDataSelect from "../../DaDataSelect";
import DeleteButton from "../../DeleteButton";
import RadioButtonRS from "../../RadioButtonRS";
import SelectRS from "../SelectRS";

const AddressItem = ({ id, type, address, basis, onRadio, onSelectAddress, onSelectBasis }) => {
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
            <div 
              className={styles.checks__item}
              onClick={onRadio("Юридический", id)}
            >
              <RadioButtonRS 
                isActive={type === "Юридический"} 
              />
              <p>Юридический</p>
            </div>
            <div 
              className={styles.checks__item}
              onClick={onRadio("Фактический", id)}
            >
              <RadioButtonRS 
                isActive={type === "Фактический"} 
              />
              <p>Фактический</p>
            </div>
            <div 
              className={styles.checks__item}
              onClick={onRadio("Почтовый", id)}
            >
              <RadioButtonRS 
                isActive={type === "Почтовый"} 
              />
              <p>Почтовый</p>
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
