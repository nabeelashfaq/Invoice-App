import { gql } from "@apollo/client";

export const SAVE_INVOICE = gql`
  mutation SaveInvoice($input: InvoiceInput!) {
    saveInvoice(input: $input) {
      id
      companyName
      clientName
      invoiceDate
      items {
        id
        name
        qty
        price
        total
      }
    }
  }
`;
