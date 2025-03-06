package com.scanmeally.domain.store.repository;

import com.scanmeally.domain.store.dataTransferObject.StoreTableDTO;
import com.scanmeally.domain.store.model.StoreTable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface StoreTableRepository extends JpaRepository<StoreTable, String> {
    @Query("SELECT t.storeId, t.available FROM StoreTable t WHERE t.id = :tableId")
    Optional<Object[]> findStoreIdByTableId(@Param("tableId") String tableId);

    @Query("""
                SELECT new com.scanmeally.domain.store.dataTransferObject.StoreTableDTO(
                    t.id, t.tableNumber, t.available,o.status, o.code
                )
                FROM StoreTable t
                LEFT JOIN Order o ON t.id = o.tableId
                WHERE t.storeId = :storeId
            """)
    Page<StoreTableDTO> findAllByStoreId(
            @Param("storeId") String storeId,
            Pageable pageable
    );
}
