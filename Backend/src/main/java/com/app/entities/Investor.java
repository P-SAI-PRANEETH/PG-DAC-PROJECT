package com.app.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "investors")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Investor extends BaseEntity {

	@Column(name = "first_name", length = 20)
	@NotBlank(message = "First name is required")
	private String firstName;
	@Column(name = "last_name", length = 20)
	@NotBlank(message = "Last name is required")
	private String lastName;
	@Enumerated(EnumType.STRING)
	@Column(length = 20)
	private Role role=Role.INVESTOR;
	
	@ManyToOne
	@JoinColumn(name = "admin_id")
	private Admin admin;
	
	@ManyToMany
	@JoinTable(name = "investor_business", joinColumns = @JoinColumn(name = "investor_id"), inverseJoinColumns = @JoinColumn(name = "business_id"))
	private List<Business> businesses = new ArrayList<>();
	@OneToMany(mappedBy = "investor", cascade = CascadeType.ALL, orphanRemoval = true /* , fetch = FetchType.EAGER */ )
	private List<Transaction> transactions = new ArrayList<>();

}
