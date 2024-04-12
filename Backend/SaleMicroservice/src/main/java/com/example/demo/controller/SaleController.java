package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Sale;
import com.example.demo.service.SaleService;

@RestController
@RequestMapping("/sales")
@CrossOrigin(origins = "*")
public class SaleController {
	
	@Autowired
	private final SaleService saleService;
	
	public SaleController(SaleService saleService) {
		this.saleService = saleService;
	}
	
	@GetMapping
	public ResponseEntity<List<Sale>> getAllSale() {
		List<Sale> sales = saleService.getAllSales();
		if (sales != null) {
			return ResponseEntity.ok(sales);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Sale> getSaleById(@PathVariable Long id) {
		Sale sale = saleService.getSaleById(id);
		if (sale != null) {
			return ResponseEntity.ok(sale);
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	}
	
	@PostMapping
	public ResponseEntity<Sale> createSale(@RequestBody Sale sale) {
		Sale createdSale = saleService.createSale(sale);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdSale);
	}
	
	@PatchMapping("/{id}")
	public ResponseEntity<Sale> updateSale(@PathVariable Long id, 
			@RequestBody Sale sale) {
		Sale existingSale = saleService.updateSale(id, sale);
		if (existingSale == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		return ResponseEntity.ok(existingSale);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteSale(@PathVariable Long id) {
		Boolean deleted = saleService.deleteSale(id);
		if (deleted) {
			return ResponseEntity.ok("Resource with id " + id + " deleted");
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Resource not found");
	}
}
