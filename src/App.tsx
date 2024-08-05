import React, { FormEvent, useState } from "react";
import BillFrom from "./components/BillFrom/BillFrom";
import BillTo from "./components/BillTo/BillTo";
import ItemsList from "./components/ItemsList";
import Preview from "./components/Preview";
import styles from "./App.module.scss";
import { InvoiceTermsEnum } from "./utils/constants";

import Logo from "./assets/logo.svg";
import Button from "./components/UI/Button/Button";
import { useMutation } from "@apollo/client";
import { SAVE_INVOICE } from "./graphql/queries";

interface Item {
  id: number;
  name: string;
  qty: number;
  price: number;
  total: number;
}

interface FormData {
  companyName: string;
  companyEmail: string;
  companyCountry: string;
  companyCity: string;
  companyPostalCode: string;
  companyStreetAddress: string;
  clientName: string;
  clientEmail: string;
  clientCountry: string;
  clientCity: string;
  clientPostalCode: string;
  clientStreetAddress: string;
  invoiceDate: string;
  paymentTerms: InvoiceTermsEnum;
  projectDescription: string;
  items: Item[];
}

const App = () => {
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    companyEmail: "",
    companyCountry: "",
    companyCity: "",
    companyPostalCode: "",
    companyStreetAddress: "",
    clientName: "",
    clientEmail: "",
    clientCountry: "",
    clientCity: "",
    clientPostalCode: "",
    clientStreetAddress: "",
    invoiceDate: new Date().toISOString().split("T")[0],
    paymentTerms: InvoiceTermsEnum.NET_10_DAYS,
    projectDescription: "",
    items: [
      {
        id: 0,
        name: "",
        qty: 0,
        price: 0,
        total: 0,
      },
    ],
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.companyName)
      newErrors.companyName = "Company Name is required";
    if (!formData.companyEmail)
      newErrors.companyEmail = "Company Email is required";
    if (!formData.paymentTerms)
      newErrors.paymentTerms = "Payment Terms are required";

    if (!formData.clientName) newErrors.clientName = "Client Name is required";
    if (!formData.clientEmail)
      newErrors.clientEmail = "Client Email is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    id?: number
  ) => {
    const { name, value } = e.target;

    if (id !== undefined) {
      const updatedItems = formData.items.map((item: Item) => {
        if (item.id === id) {
          const updatedItem = {
            ...item,
            [name]:
              name === "qty" || name === "price" ? parseFloat(value) : value,
          };

          if (name === "qty" || name === "price") {
            updatedItem.total = updatedItem.qty * updatedItem.price;
          }

          return updatedItem;
        }
        return item;
      });

      setFormData({ ...formData, items: updatedItems });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        { id: Date.now(), name: "", qty: 0, price: 0, total: 0 },
      ],
    });
  };

  const handleDeleteItem = (id: number) => {
    setFormData({
      ...formData,
      items: formData.items.filter((item) => item.id !== id),
    });
  };

  const handleReset = () => {
    setFormData({
      companyName: "",
      companyEmail: "",
      companyCountry: "",
      companyCity: "",
      companyPostalCode: "",
      companyStreetAddress: "",
      clientName: "",
      clientEmail: "",
      clientCountry: "",
      clientCity: "",
      clientPostalCode: "",
      clientStreetAddress: "",
      invoiceDate: new Date().toISOString().split("T")[0],
      paymentTerms: InvoiceTermsEnum.NET_10_DAYS,
      projectDescription: "",
      items: [],
    });
  };

  const [saveInvoice] = useMutation(SAVE_INVOICE, {
    onCompleted: () => {
      console.log("onCompleted");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleSave = (e: FormEvent) => {
    e.preventDefault();

    if (validate()) {
      console.log("Form data:", formData);
      saveInvoice({ variables: { input: formData } });
    }
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <img src={Logo} alt="logo" />
      </header>
      <form className={styles.invoiceForm}>
        <div className={styles.container}>
          <div className={styles.formHeader}>
            <div className={styles.titleBlock}>
              <h1>New Invoice</h1>
              <p>Create new invoice for your customers</p>
            </div>
            <div className={styles.btnsBlock}>
              <Button variant="secondary" onClick={handleReset}>
                Reset
              </Button>
              <Button type="submit" onClick={handleSave}>
                Save
              </Button>
            </div>
          </div>
          <div className={styles.mainForm}>
            <div className={styles.billingInfo}>
              <BillFrom
                errors={errors}
                formData={formData}
                handleInputChange={handleInputChange}
              />
              <BillTo
                errors={errors}
                formData={formData}
                handleInputChange={handleInputChange}
              />
              <ItemsList
                items={formData.items}
                handleInputChange={handleInputChange}
                handleDeleteItem={handleDeleteItem}
                handleAddItem={handleAddItem}
              />
            </div>
            <div className={styles.totalInfo}>
              <Preview formData={formData} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default App;
