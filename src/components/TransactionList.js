import React from 'react';

function TransactionList({ transactions, onEdit, onDelete }) {
  return (
    <div>
      <h2>Transactions</h2>
      {transactions.length === 0 ? (
        <p>No transactions to display.</p>
      ) : (
        <ul>
          {transactions.map((transaction, index) => (
            <li key={index}>
              {`${transaction.type}: $${transaction.amount} - ${transaction.category}${transaction.description ? ` (${transaction.description})` : ''}`}
              <button onClick={() => onEdit(index)}>Edit</button>
              <button onClick={() => onDelete(index)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TransactionList;