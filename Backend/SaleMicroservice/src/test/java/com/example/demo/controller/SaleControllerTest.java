package com.example.demo.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.demo.model.Car;
import com.example.demo.model.Customer;
import com.example.demo.model.Sale;
import com.example.demo.service.SaleService;
import com.example.demo.repository.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
@AutoConfigureMockMvc
class SaleControllerTest {

	@Autowired
	SaleRepository saleRepository;
	@Autowired
	CarRepository carRepository;
	@Autowired
	CustomerRepository customerRepository;
	@Autowired
	SaleService saleService;
    @Test
    void getAllSale() {
        List<Sale> mockSales = new ArrayList<>();
        mockSales.add(new Sale(1L, new Car(), new Customer(), 1000.0));
        mockSales.add(new Sale(2L, new Car(), new Customer(), 2000.0));

        SaleService saleService = new SaleService() {
            @Override
            public List<Sale> getAllSales() {
                return mockSales;
            }
        };

        SaleController saleController = new SaleController(saleService);
        ResponseEntity<List<Sale>> response = saleController.getAllSale();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(mockSales.size(), response.getBody().size());
    }

    @Test
    void getSaleById() {
        Sale sampleSale = new Sale(1L, new Car(), new Customer(), 1000.0);

        SaleService saleService = new SaleService() {
            @Override
            public Sale getSaleById(Long id) {
                return sampleSale;
            }
        };

        SaleController saleController = new SaleController(saleService);
        ResponseEntity<Sale> response = saleController.getSaleById(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(sampleSale.getSaleId(), response.getBody().getSaleId());
    }
    
    
    
    @Test
    void updateSale() {
        Sale updatedSale = new Sale(7L, new Car(1L), new Customer(1), 9000.0);
        System.out.println(updatedSale.getSalePrice());

        SaleController saleController = new SaleController(saleService);
        ResponseEntity<Sale> response = saleController.updateSale(7L, updatedSale);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(updatedSale.getSalePrice(), response.getBody().getSalePrice());
    }

    @Test
    void deleteSale() {
        SaleService saleService = new SaleService() {
            @Override
            public Boolean deleteSale(Long id) {
            	saleRepository.deleteById(id);
                return true;
            }
        };

        SaleController saleController = new SaleController(saleService);
        ResponseEntity<String> response = saleController.deleteSale(9L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Resource with id 9 deleted", response.getBody());
    }
}
