package com.example.demo.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.demo.model.Car;
import com.example.demo.model.Customer;
import com.example.demo.model.Sale;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class SaleServiceTest {

    private MockSaleRepository saleRepository;
    private SaleService saleService;

    @BeforeEach
    void setUp() {
        saleRepository = new MockSaleRepository();
        saleService = new SaleService(saleRepository);
    }

    @Test
    void getAllSales() {
        List<Sale> mockSales = new ArrayList<>();
        mockSales.add(new Sale(1L, new Car(), new Customer(), 1000.0));
        mockSales.add(new Sale(2L, new Car(), new Customer(), 2000.0));

        saleRepository.setMockSales(mockSales);

        List<Sale> result = saleService.getAllSales();

        assertEquals(mockSales, result);
    }

    @Test
    void getSaleById() {
        Sale mockSale = new Sale(1L, new Car(), new Customer(), 1000.0);

        saleRepository.setMockSale(mockSale);

        Sale result = saleService.getSaleById(1L);

        assertEquals(mockSale, result);
    }

    @Test
    void createSale() {
        Sale mockSale = new Sale(1L, new Car(), new Customer(), 1000.0);

        Sale createdSale = saleService.createSale(mockSale);

        assertEquals(mockSale, createdSale);
    }

}