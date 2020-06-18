package com.ssafy.domain;

import java.io.Serializable;
import java.util.LinkedHashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "makedb_sigun")
public class Sigun implements Serializable{
	
	private static final long serialVersionUID = -3136999742844052542L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="do_nm")
	private String doNm;
	
	@Column(name="sigun_nm")
	private String sigunNm;
	
	@OneToMany(mappedBy="sigun", fetch=FetchType.LAZY)
	@JsonIgnore
	private Set<Merchant> merchants = new LinkedHashSet<>();
	
}