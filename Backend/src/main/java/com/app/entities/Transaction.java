package com.app.entities;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Min;
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
@Table(name = "transactions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Transaction {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonProperty(access = Access.READ_ONLY)
    private Long id;
	@Column(name = "campaign_id")
	private Long campaignId;
    @NotNull(message = "Amount is required")
    @Min(value = 500)
    private double amount;
    private LocalDateTime timestamp;
    @Column(name = "paypal_payment_id")
    @JsonProperty(access = Access.READ_ONLY)
    private String paypalPaymentId;
    
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "investor_id")
    private Investor investor;
}
