package com.account.api.account;

import com.account.dataTransferObject.ApiResponse;
import com.account.domain.account.dataTransferObject.UserDTO;
import com.account.domain.account.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/users", produces = "application/json")
@RequiredArgsConstructor
@Tag(name = "User API")
public class UserResource {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<UserDTO>>> getAllUsers() {
        List<UserDTO> users = userService.findAll();
        return ApiResponse.<List<UserDTO>>build().withData(users).toEntity();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserDTO>> getUser(@PathVariable(name = "id") final String id) {
        UserDTO user = userService.get(id);
        return ApiResponse.<UserDTO>build().withData(user).toEntity();
    }

    @PostMapping
    public ResponseEntity<ApiResponse<String>> createUser(@RequestBody final UserDTO userDTO) {
        String createdId = userService.create(userDTO);
        return ApiResponse.<String>build().withData(createdId).toEntity();
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> updateUser(@PathVariable(name = "id") final String id,
                                                          @RequestBody final UserDTO userDTO) {
        userService.update(id, userDTO);
        return ApiResponse.<String>build().withData(id).toEntity();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteUser(@PathVariable(name = "id") final String id) {
        userService.delete(id);
        return ApiResponse.<Void>build().withData(null).toEntity();
    }
}
