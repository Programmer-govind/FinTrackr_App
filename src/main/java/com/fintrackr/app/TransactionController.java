package com.fintrackr.app;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fintrackr.app.model.Transaction;

import jakarta.validation.Valid;

@CrossOrigin(origins = "https://gautam-govind-fintrackr-app.netlify.app")
@RestController
@RequestMapping("/api/transactions")
public class TransactionController {
	@Autowired
	private TransactionService service;

	// create transaction
	@PostMapping
	public ResponseEntity<String> createTransaction(@Valid @RequestBody Transaction object) {
		String message = service.saveTransaction(object);
		return new ResponseEntity<String>(message, HttpStatus.CREATED);
	}

	// get all transaction
	@GetMapping
	public ResponseEntity<List<Transaction>> allTransactions() {
		List<Transaction> transactions = service.getAllTransactions();
		return new ResponseEntity<>(transactions, HttpStatus.OK);
	}

	// get transaction by Id
	@GetMapping("/{Id}")
	public ResponseEntity<Transaction> transactionById(@PathVariable Long Id) throws Exception {
		Transaction transaction = service.getTransaction(Id);
		return new ResponseEntity<>(transaction, HttpStatus.OK);
	}

	// update Transaction
	@PutMapping("/{Id}")
	public ResponseEntity<String> update(@PathVariable Long Id, @Valid @RequestBody Transaction object) {
		service.updateTransaction(Id, object);
		return new ResponseEntity<String>("Transaction updated successfully..", HttpStatus.OK);
	}

	// delete Transaction
	@DeleteMapping("/{Id}")
	public ResponseEntity<String> delete(@PathVariable Long Id) {
		service.deleteTransaction(Id);
		return new ResponseEntity<String>("Transaction deleted successfully..", HttpStatus.OK);
	}
}
