package com.app.entities;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Future;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "campaigns")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Campaign {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonProperty(access = Access.READ_ONLY)
	@Column(name = "campaign_id")
    private Long campaignId;
	@Column(length = 50)
    @NotBlank(message = "Title is required")
    private String title;
    @NotBlank(message = "Description is required")
    private String description;
    @Column(name = "goal_amount")
    @NotNull(message = "Goal amount is required")
    @Min(value = 10000)
    private double goalAmount;
    @JsonProperty(access = Access.READ_ONLY)
    @Column(name = "current_amount")
    private double currentAmount;
    @Column(name = "start_date")
    @Future
    private LocalDate startDate;
    @Column(name = "end_date")
    @Future
    private LocalDate endDate;
    private boolean approved;
    
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "business_id")
    private Business business;
	

}
