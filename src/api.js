// API utility for transaction operations
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/transactions';

export async function fetchTransactions() {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error('Failed to fetch transactions');
  return res.json();
}

export async function addTransaction(transaction) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...transaction, type: transaction.type.toLowerCase() }),
  });
  if (!res.ok) throw new Error('Failed to add transaction');
  return res.text();
}

export async function updateTransaction(id, transaction) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...transaction, type: transaction.type.toLowerCase() }),
  });
  if (!res.ok) throw new Error('Failed to update transaction');
  return res.text();
}

export async function deleteTransaction(id) {
  const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete transaction');
  return res.text();
}
