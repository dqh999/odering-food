package com.scanmeally.api.menu;

import com.scanmeally.domain.menu.dataTransferObject.CategoryDTO;
import com.scanmeally.domain.menu.service.CategoryService;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(value = "/api/categories", produces = MediaType.APPLICATION_JSON_VALUE)
public class CategoryResource {

    private final CategoryService categoryService;

    public CategoryResource(final CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity<List<CategoryDTO>> getAllCategories() {
        return ResponseEntity.ok(categoryService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryDTO> getCategory(@PathVariable(name = "id") final String id) {
        return ResponseEntity.ok(categoryService.get(id));
    }

    @PostMapping
    
    public ResponseEntity<String> createCategory(@RequestBody  final CategoryDTO categoryDTO) {
        final String createdId = categoryService.create(categoryDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateCategory(@PathVariable(name = "id") final String id,
            @RequestBody  final CategoryDTO categoryDTO) {
        categoryService.update(id, categoryDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    
    public ResponseEntity<Void> deleteCategory(@PathVariable(name = "id") final String id) {
        categoryService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
