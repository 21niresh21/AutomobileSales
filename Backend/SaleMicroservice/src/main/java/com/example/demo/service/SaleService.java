package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.demo.model.Car;
import com.example.demo.model.Customer;
import com.example.demo.model.Sale;
import com.example.demo.repository.CarRepository;
import com.example.demo.repository.CustomerRepository;
import com.example.demo.repository.SaleRepository;

@Service
public class SaleService {
	
	@Autowired
	private SaleRepository saleRepository;
	@Autowired
	private CustomerRepository customerRepository;
	@Autowired
	private CarRepository carRepository;
	
	

	public SaleService() {
		super();
	}

	public SaleService(SaleRepository saleRepository) {
		super();
		this.saleRepository = saleRepository;
	}

	public List<Sale> getAllSales() {
		return saleRepository.findAll();
	}
	
	public Sale getSaleById(Long id) {
		return saleRepository.findById(id).orElse(null);
	}
	
	public Sale createSale(Sale sale) {
		return saleRepository.save(sale);
	}
	
	public Sale updateSale(@PathVariable Long id, 
			@RequestBody Sale sale) {
		Sale existingSale = saleRepository.findById(id).orElse(null);
		
		if (existingSale != null) {
			if (sale.getCar() != null) {
				Car car = carRepository.findById(sale.getCar().getId()).orElse(null);
				existingSale.setCar(car);
			}
			if (sale.getCustomer() != null) {
				Customer customer = customerRepository.findById(sale.getCustomer().getCustomerId())
						.orElse(null);
				System.out.println(customer.getCustomerId());
				existingSale.setCustomer(customer);
			}
			if (sale.getSaleDate() != null) {
				existingSale.setSaleDate(sale.getSaleDate());
			}
			if (sale.getSalePrice() != null) {
				existingSale.setSalePrice(sale.getSalePrice());
			}
		}
		saleRepository.save(existingSale);
		existingSale = saleRepository.findById(id).orElse(null);
		return existingSale;
	}
	
	public Boolean deleteSale(Long id) {
		Sale existingSale = saleRepository.findById(id).orElse(null);
		if (existingSale == null) {
			return false;
		}
		saleRepository.delete(existingSale);
		return true;
	}
	
}
