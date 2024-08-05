import React from "react";
import styles from "./ItemsList.module.scss";

interface Item {
  id: number;
  name: string;
  qty: number;
  price: number;
  total: number;
}

interface ItemsListProps {
  items: Item[];
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => void;
  handleDeleteItem: (id: number) => void;
  handleAddItem: () => void;
}

const ItemsList: React.FC<ItemsListProps> = ({
  items,
  handleInputChange,
  handleDeleteItem,
  handleAddItem,
}) => {
  return (
    <div className={styles.itemsList}>
      <h2>Items List</h2>
      <div className={styles.itemsHeader}>
        <span>Item Name</span>
        <span>Qty.</span>
        <span>Price</span>
        <span>Total</span>
      </div>
      {items.map((item) => (
        <div key={item.id} className={styles.itemRow}>
          <input
            type="text"
            name="name"
            placeholder="Item Name"
            value={item.name}
            onChange={(e) => handleInputChange(e, item.id)}
            required
          />
          <input
            type="number"
            name="qty"
            placeholder="Qty."
            value={item.qty}
            onChange={(e) => handleInputChange(e, item.id)}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={item.price}
            onChange={(e) => handleInputChange(e, item.id)}
            required
          />
          <input
            type="number"
            name="total"
            placeholder="Total"
            value={item.total}
            readOnly
          />
          <button
            type="button"
            className={styles.deleteButton}
            onClick={() => handleDeleteItem(item.id)}
          >
            🗑️
          </button>
        </div>
      ))}
      <button
        type="button"
        className={styles.addButton}
        onClick={handleAddItem}
      >
        + Add New Item
      </button>
    </div>
  );
};

export default ItemsList;
