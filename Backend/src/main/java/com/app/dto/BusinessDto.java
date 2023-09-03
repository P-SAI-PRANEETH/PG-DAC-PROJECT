package com.app.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import com.app.entities.Category;
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
public class BusinessDto {
	
	@JsonProperty(access = Access.READ_ONLY)
	private Long id;
	@NotBlank(message = "Email is required")
	@Email(message = "Invalid email format")
	private String email;
	@NotBlank(message = "Password is required")
	@JsonProperty(access =Access.WRITE_ONLY)
    private String password;
	@JsonProperty(access =Access.WRITE_ONLY)
	@NotBlank(message = "Confirm password is required")
	private String confirmPassword;
	@NotBlank(message = "Company name is required")
	private String companyName;
	@NotBlank(message = "Company description is required")
	private String companyDescription;
	private Category category;
//	@NotBlank(message = "Image is required")
	private String imageFileName;
	@NotBlank(message = "address line1 is required")
	private String adrLine1;
	@NotBlank(message = "address line2 is required")
	private String adrLine2;
	@NotBlank(message = "City is required")
	private String city;
	@NotBlank(message = "Pincode is required")
	private String pincode;
	@NotBlank(message = "State is required")
	private String state;
	@JsonProperty(access = Access.READ_ONLY)
	private byte arr [];
}
