package com.baha.backend.user.dto;

import lombok.Data;

@Data
public class UserLoginRequest {
    private String username;
    private String password;
}
