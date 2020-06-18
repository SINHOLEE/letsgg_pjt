package com.map.dto;

public class Merchant {
	int id;
	String refine_roadnm_addr;
	String latitude;
	String longitude;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getRefine_roadnm_addr() {
		return refine_roadnm_addr;
	}
	public void setRefine_roadnm_addr(String refine_roadnm_addr) {
		this.refine_roadnm_addr = refine_roadnm_addr;
	}
	public String getLatitude() {
		return latitude;
	}
	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}
	public String getLongitude() {
		return longitude;
	}
	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id;
		result = prime * result + ((latitude == null) ? 0 : latitude.hashCode());
		result = prime * result + ((longitude == null) ? 0 : longitude.hashCode());
		result = prime * result + ((refine_roadnm_addr == null) ? 0 : refine_roadnm_addr.hashCode());
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Merchant other = (Merchant) obj;
		if (id != other.id)
			return false;
		if (latitude == null) {
			if (other.latitude != null)
				return false;
		} else if (!latitude.equals(other.latitude))
			return false;
		if (longitude == null) {
			if (other.longitude != null)
				return false;
		} else if (!longitude.equals(other.longitude))
			return false;
		if (refine_roadnm_addr == null) {
			if (other.refine_roadnm_addr != null)
				return false;
		} else if (!refine_roadnm_addr.equals(other.refine_roadnm_addr))
			return false;
		return true;
	}
	@Override
	public String toString() {
		return "Merchant [id=" + id + ", refine_roadnm_addr=" + refine_roadnm_addr + ", latitude=" + latitude
				+ ", longitude=" + longitude + "]";
	}
	public Merchant(int id, String refine_roadnm_addr, String latitude, String longitude) {
		super();
		this.id = id;
		this.refine_roadnm_addr = refine_roadnm_addr;
		this.latitude = latitude;
		this.longitude = longitude;
	}
	public Merchant() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}
