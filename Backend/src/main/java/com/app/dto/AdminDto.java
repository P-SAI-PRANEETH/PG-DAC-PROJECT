package com.app.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.Length;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AdminDto {
	
	@NotBlank(message = "Email is required")
	@Email(message = "Invalid email format")
	private String email;
	@NotBlank(message = "Name is required")
	@Length(min= 3, max = 30, message = "Invalid name length")
    private String name;
}
