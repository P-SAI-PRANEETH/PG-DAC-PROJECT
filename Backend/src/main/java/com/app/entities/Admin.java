package com.app.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "admins")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Admin extends BaseEntity {
	
	@Column(length = 30)
	private String name;
	@Enumerated(EnumType.STRING)
	@Column(length = 20)
	private Role role=Role.ADMIN;
	@OneToMany(mappedBy = "admin", cascade = CascadeType.ALL,
			orphanRemoval = true /* , fetch = FetchType.EAGER */  )
	private List<Investor> investor = new ArrayList<>();
	
	@OneToMany(mappedBy = "admin", cascade = CascadeType.ALL,
			orphanRemoval = true /* , fetch = FetchType.EAGER */  )
	private List<Business> business = new ArrayList<>();
	
	public void addBusiness(Business b) {
		business.add(b);
		b.setAdmin(this);
	}

	public void removeBusiness(Business b) {
		business.remove(b);
		b.setAdmin(null);
	}
	
	public void addInvestor(Investor i) {
		investor.add(i);
		i.setAdmin(this);
	}

	public void removeInvestor(Investor i) {
		investor.remove(i);
		i.setAdmin(null);
	}
}

