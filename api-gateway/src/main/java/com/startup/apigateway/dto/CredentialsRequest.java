package com.startup.apigateway.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.ToString;

@NoArgsConstructor
@Getter
public class CredentialsRequest {

    @NonNull
    String email;

    @ToString.Exclude
    @NonNull
    String password;

    String firstName;
    String lastName;
}
