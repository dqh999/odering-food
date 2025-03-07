package com.menu.repository;

import com.menu.model.MenuItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;


public interface MenuItemRepository extends JpaRepository<MenuItem, String> {
    @Query("select m.price, smi.available " +
            "from MenuItem m " +
            "join StoreMenuItem smi " +
            "on m.id = smi.itemId " +
            "where m.id = :menuItemId and smi.storeId = :storeId")
    Optional<Object[]> findPriceAndAvailability(String storeId, String menuItemId);

    Page<MenuItem> searchByNameAndDescription(String storeId, String keyword, Pageable pageable);

    Page<MenuItem> findByCategoryId(String categoryId, Pageable pageable);
}
