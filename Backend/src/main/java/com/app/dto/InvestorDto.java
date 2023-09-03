package com.app.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

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
public class InvestorDto {
	
	@JsonProperty(access = Access.READ_ONLY)
    private Long id;
	@NotBlank(message = "Email is required")
	@Email(message = "Invalid email format")
	private String email;
	@NotBlank(message = "Password is required")
	@JsonProperty(access =Access.WRITE_ONLY)
    private String password;
	@NotBlank(message = "Confirm password is required")
	@JsonProperty(access =Access.WRITE_ONLY)
	private String confirmPassword;
	@NotBlank(message = "First name is required")
	@Length(min= 3, max = 20, message = "Invalid first name length")
    private String firstName;
	@NotBlank(message = "Last name is required")
	@Length(min= 3, max = 20, message = "Invalid last name length")
    private String lastName;
	
}
