package com.app.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "businesses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Business{

	@Column(name = "company_name", length = 50, nullable = false, unique = true)
	private String companyName;

	@Column(name = "description", nullable = false)
	private String companyDescription;
	
	@Enumerated(EnumType.STRING)
	@Column(length = 20, nullable = false)
	private Category category;
	
	@Enumerated(EnumType.STRING)
	@Column(length = 20)
	private Role role=Role.BUSINESS;
	
	@Column(name = "image_file_name")
	private String imageFileName;
	
	@Column(name="adr_line1",length=100, nullable = false)
	private String adrLine1;

	@Column(name="adr_line2",length=100, nullable = false)
	private String adrLine2;
	
	@Column(nullable = false)
	private String pincode;
	
	private boolean approved;
	
	@ManyToOne
	@JoinColumn(name = "admin_id")
	private Admin admin;

	@ManyToMany(mappedBy = "businesses")
	private List<Investor> investors = new ArrayList<>();

	@OneToMany(mappedBy = "business", cascade = CascadeType.ALL, orphanRemoval = true /* , fetch = FetchType.EAGER */ )
	private List<Campaign> campaigns = new ArrayList<>();
	
	@ManyToOne
    @JoinColumn(name = "city_id")
    private City city;
    
    @ManyToOne
    @JoinColumn(name = "state_id")
    private State state;
}
