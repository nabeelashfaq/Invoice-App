// components/BillTo/BillTo.tsx
import React from "react";
import styles from "./BillTo.module.scss";
import { InvoiceTermsEnum } from "../../utils/constants";

interface BillToProps {
  formData: {
    clientName: string;
    clientEmail: string;
    clientCountry: string;
    clientCity: string;
    clientPostalCode: string;
    clientStreetAddress: string;
    paymentTerms: string;
    invoiceDate: string;
    projectDescription: string;
  };
  errors: {
    companyName: string;
    companyEmail: string;
    clientName: string;
    clientEmail: string;
  };
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const BillTo: React.FC<BillToProps> = ({
  formData,
  errors,
  handleInputChange,
}) => (
  <div className={styles.billTo}>
    <h2>Bill To</h2>

    <div className={styles.flexContainer}>
      <div className={styles.formGroup}>
        <label htmlFor="clientName">Client's Name</label>
        <input
          type="text"
          id="clientName"
          name="clientName"
          value={formData.clientName}
          onChange={handleInputChange}
          style={{ borderColor: errors.clientName ? "red" : undefined }}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="clientEmail">Client's Email</label>
        <input
          type="email"
          id="clientEmail"
          name="clientEmail"
          value={formData.clientEmail}
          onChange={handleInputChange}
          style={{ borderColor: errors.clientEmail ? "red" : undefined }}
          required
        />
      </div>
    </div>

    <div className={styles.flexContainer}>
      <div className={styles.formGroup}>
        <label htmlFor="country">Country</label>
        <select
          id="country"
          name="clientCountry"
          value={formData.clientCountry}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Country</option>
          <option value="USA">USA</option>
          <option value="Canada">Canada</option>
          <option value="UK">UK</option>
        </select>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          name="clientCity"
          value={formData.clientCity}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="postalCode">Postal Code</label>
        <input
          type="text"
          id="postalCode"
          name="clientPostalCode"
          value={formData.clientPostalCode}
          onChange={handleInputChange}
          required
        />
      </div>
    </div>

    <div className={styles.formGroup}>
      <label htmlFor="streetAddress">Street Address</label>
      <input
        type="text"
        id="streetAddress"
        name="clientStreetAddress"
        value={formData.clientStreetAddress}
        onChange={handleInputChange}
        required
      />
    </div>

    <div className={styles.flexContainer}>
      <div className={styles.formGroup}>
        <label htmlFor="invoiceDate">Invoice Date</label>
        <input
          type="date"
          id="invoiceDate"
          name="invoiceDate"
          placeholder="Client's Name"
          value={formData.invoiceDate}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="paymentTerms">Payment Terms</label>
        <select
          id="paymentTerms"
          name="paymentTerms"
          value={formData.paymentTerms}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Term</option>
          <option value={InvoiceTermsEnum.NET_10_DAYS}>Net 10 Days</option>
          <option value={InvoiceTermsEnum.NET_20_DAYS}>Net 20 Days</option>
          <option value={InvoiceTermsEnum.NET_30_DAYS}>Net 30 Days</option>
        </select>
      </div>
    </div>

    <div className={styles.formGroup}>
      <label htmlFor="projectDescription">Project Description</label>
      <input
        type="text"
        id="projectDescription"
        name="projectDescription"
        value={formData.projectDescription}
        onChange={handleInputChange}
        required
      />
    </div>
  </div>
);

export default BillTo;
