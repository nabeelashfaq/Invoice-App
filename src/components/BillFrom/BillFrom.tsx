import React from "react";
import styles from "./BillFrom.module.scss";

interface BillFromProps {
  formData: {
    companyName: string;
    companyEmail: string;
    companyCountry: string;
    companyCity: string;
    companyPostalCode: string;
    companyStreetAddress: string;
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

const BillFrom: React.FC<BillFromProps> = ({
  formData,
  errors,
  handleInputChange,
}) => (
  <div className={styles.billFrom}>
    <h2>Bill From</h2>
    <div className={styles.flexContainer}>
      <div className={styles.formGroup}>
        <label htmlFor="companyName">Company Name</label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          value={formData.companyName}
          onChange={handleInputChange}
          style={{ borderColor: errors.companyName ? "red" : undefined }}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="companyEmail">Company Email</label>
        <input
          type="email"
          id="companyEmail"
          name="companyEmail"
          value={formData.companyEmail}
          onChange={handleInputChange}
          style={{ borderColor: errors.companyEmail ? "red" : undefined }}
          required
        />
      </div>
    </div>

    <div className={styles.flexContainer}>
      <div className={styles.formGroup}>
        <label htmlFor="companyCountry">Country</label>
        <select
          id="country"
          name="companyCountry"
          value={formData.companyCountry}
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
          name="companyCity"
          value={formData.companyCity}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="postalCode">Postal Code</label>
        <input
          type="text"
          id="postalCode"
          name="companyPostalCode"
          value={formData.companyPostalCode}
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
        name="companyStreetAddress"
        value={formData.companyStreetAddress}
        onChange={handleInputChange}
        required
      />
    </div>
  </div>
);

export default BillFrom;
