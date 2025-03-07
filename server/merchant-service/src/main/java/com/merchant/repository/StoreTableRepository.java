package com.merchant.repository;

import com.merchant.dataTransferObject.OrderStoreTableDTO;
import com.merchant.dataTransferObject.StoreTableDTO;
import com.merchant.model.StoreTable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface StoreTableRepository extends JpaRepository<StoreTable, String> {
    @Query("SELECT t.storeId, t.available FROM StoreTable t WHERE t.id = :tableId")
    Optional<Object[]> findStoreIdByTableId(@Param("tableId") String tableId);

    @Query("select new com.merchant.domain.store.dataTransferObject.StoreTableDTO(" +
            "st.id, st.tableNumber" +
            ") from StoreTable st " +
            "where st.id = :id")
    Optional<StoreTableDTO> findStoreTableDTOById(@Param("id") String id);

    @Query("""
                SELECT new com.merchant.domain.store.dataTransferObject.OrderStoreTableDTO(
                    t.id, t.tableNumber, t.available,o.status, o.code
                )
                FROM StoreTable t
                LEFT JOIN Order o ON t.id = o.tableId
                WHERE t.storeId = :storeId
            """)
    Page<OrderStoreTableDTO> findAllByStoreId(
            @Param("storeId") String storeId,
            Pageable pageable
    );
}
