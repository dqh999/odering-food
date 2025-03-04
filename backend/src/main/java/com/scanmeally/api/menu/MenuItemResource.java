package com.scanmeally.api.menu;

import com.scanmeally.domain.menu.dataTransferObject.MenuItemDTO;
import com.scanmeally.domain.menu.service.MenuItemService;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(value = "/api/menuItems", produces = MediaType.APPLICATION_JSON_VALUE)
public class MenuItemResource {

    private final MenuItemService menuItemService;

    public MenuItemResource(final MenuItemService menuItemService) {
        this.menuItemService = menuItemService;
    }

    @GetMapping
    public ResponseEntity<List<MenuItemDTO>> getAllMenuItems() {
        return ResponseEntity.ok(menuItemService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MenuItemDTO> getMenuItem(@PathVariable(name = "id") final String id) {
        return ResponseEntity.ok(menuItemService.get(id));
    }

    @PostMapping
    
    public ResponseEntity<String> createMenuItem(@RequestBody  final MenuItemDTO menuItemDTO) {
        final String createdId = menuItemService.create(menuItemDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateMenuItem(@PathVariable(name = "id") final String id,
            @RequestBody  final MenuItemDTO menuItemDTO) {
        menuItemService.update(id, menuItemDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    
    public ResponseEntity<Void> deleteMenuItem(@PathVariable(name = "id") final String id) {
        menuItemService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
