package com.ssafy.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "confirm_merchant")
public class Confirm implements Serializable {
	
	private static final long serialVersionUID = -3136999742844052542L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private Long id;
	
	@Column(name="cmpnm", nullable=false)
	private String cmpnm;
	
	@Column(name="address", nullable=false)
	private String address;
	
	@Column(name="tel", nullable=false)
	private String tel;
	
	@Column(name="citynm", nullable=false)
	private String citynm;
	
	@Column(name="zipcd", nullable=false)
	private String zipcd;
	
	@Column(name="category", nullable=false)
	private String category;
	
	@Column(name="latitude", nullable=false)
	private String latitude;
	
	@Column(name="longitude", nullable=false)
	private String longitude;
}
