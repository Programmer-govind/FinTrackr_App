package com.fintrackr.app.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Entity
@Data
@Table(name = "transactions")
public class Transaction {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long Id;
	
	@NotEmpty(message = "Transaction Type is required")
	private String type;
	
	@NotEmpty(message = "Transaction amount is required")
	private String amount;
	
	@NotEmpty(message = "Category is required")
	private String category;
	
	private String description;
	
	@CreationTimestamp
	private LocalDateTime timestamp;
}
