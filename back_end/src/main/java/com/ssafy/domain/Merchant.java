package com.ssafy.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.ColumnResult;
import javax.persistence.ConstructorResult;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedAttributeNode;
import javax.persistence.NamedEntityGraph;
import javax.persistence.SqlResultSetMapping;
import javax.persistence.Table;

import com.ssafy.dto.MerchantDto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@SqlResultSetMapping(
		name="merchantDtoMapper",
		classes = @ConstructorResult(
				targetClass = MerchantDto.class,
				columns = {
                        @ColumnResult(name="id", type = Long.class),
                        @ColumnResult(name="cmpnm_nm", type = String.class),
                        @ColumnResult(name="refine_roadnm_addr", type = String.class),
                        @ColumnResult(name="refine_lotno_addr", type = String.class),
                        @ColumnResult(name="telno", type = String.class),
                        @ColumnResult(name="region_mny_nm", type = String.class),
                        @ColumnResult(name="brnhstrm_mny_use_posbl_yn", type = String.class),
                        @ColumnResult(name="card_mny_use_posbl_yn", type = String.class),
                        @ColumnResult(name="mobile_mny_use_posbl_yn", type = String.class),
                        @ColumnResult(name="refine_zip_cd", type = String.class),
                        @ColumnResult(name="latitude", type = String.class),
                        @ColumnResult(name="longitude", type = String.class),
                        @ColumnResult(name="category_id", type = Long.class),
                        @ColumnResult(name="sigun_id", type = Long.class),
                        @ColumnResult(name="category_type", type = String.class),
                        @ColumnResult(name="distance", type = String.class)
                }
		)
)
@Entity
@Getter
@ToString(exclude = {"category", "sigun"})
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "makedb_merchant")
@NamedEntityGraph(name="MerchantWithCategoryAndSigun", attributeNodes = {@NamedAttributeNode("category"), @NamedAttributeNode("sigun")})
public class Merchant implements Serializable{
	
	private static final long serialVersionUID = 7645597484064897497L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private Long id;
	
	@Column(name="cmpnm_nm", nullable=false)
	private String cmpnmNm;
	
	@Column(name="refine_roadnm_addr")
	private String refineRoadnmAddr;
	
	@Column(name="refine_lotno_addr")
	private String refineLotnoAddr;
	
	@Column(name="telno")
	private String telno;
	
	@Column(name="region_mny_nm")
	private String regionMnyNm;
	
	@Column(name="brnhstrm_mny_use_posbl_yn")
	private String brnhstrmMnyUsePosblYn;
	
	@Column(name="card_mny_use_posbl_yn")
	private String cardMnyUsePosblYn;
	
	@Column(name="mobile_mny_use_posbl_yn")
	private String mobileMnyUsePosblYn;
	
	@Column(name="refine_zip_cd")
	private String refineZipCd;
	
	@Column(name="latitude")
	private String latitude;
	
	@Column(name="longitude")
	private String longitude;
	
	@ManyToOne
	@JoinColumn(name="category_id", foreignKey = @ForeignKey(name = "FK_MERCHANT_CATEGORY"))
	private Category category;
	
	@ManyToOne
	@JoinColumn(name="sigun_id", foreignKey = @ForeignKey(name = "FK_MERCHANT_SIGUN"))
	private Sigun sigun;

	@Column(name="category_type")
	private String categoryType;
	
	public void setCategory(Category category) {
		this.category = category;
		category.getMerchants().add(this);
	}
	
	public void setSigun(Sigun sigun) {
		this.sigun = sigun;
		sigun.getMerchants().add(this);
	}
}
