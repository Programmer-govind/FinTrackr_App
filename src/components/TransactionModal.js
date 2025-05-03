import React, { useState } from 'react';

function TransactionModal({ isOpen, onClose, onSave }) {
  const [type, setType] = useState('Credit');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    if (!type || !amount || !category) {
      alert('Please fill in all required fields (Type, Amount, and Category).');
      return;
    }
    onSave({ type, amount: parseFloat(amount), category, description });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add Transaction</h2>
        <label>
          Type:
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Credit">Credit</option>
            <option value="Debit">Debit</option>
          </select>
        </label>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <label>
          Category:
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Billing">Billing</option>
            <option value="Others">Others</option>
          </select>
        </label>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default TransactionModal;