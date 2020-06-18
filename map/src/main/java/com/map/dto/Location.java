package com.map.dto;

public class Location {
	private String address_name;
	private String category_group_code;
	private String category_group_name;
	private String category_name;
	private String distance;
	private String id;
	private String phone;
	private String place_name;
	private String place_url;
	private String road_address_name;
	private String x;
	private String y;
	
	public String getAddress_name() {
		return address_name;
	}

	public void setAddress_name(String address_name) {
		this.address_name = address_name;
	}

	public String getCategory_group_code() {
		return category_group_code;
	}

	public void setCategory_group_code(String category_group_code) {
		this.category_group_code = category_group_code;
	}

	public String getCategory_group_name() {
		return category_group_name;
	}

	public void setCategory_group_name(String category_group_name) {
		this.category_group_name = category_group_name;
	}

	public String getCategory_name() {
		return category_name;
	}

	public void setCategory_name(String category_name) {
		this.category_name = category_name;
	}

	public String getDistance() {
		return distance;
	}

	public void setDistance(String distance) {
		this.distance = distance;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getPlace_name() {
		return place_name;
	}

	public void setPlace_name(String place_name) {
		this.place_name = place_name;
	}

	public String getPlace_url() {
		return place_url;
	}

	public void setPlace_url(String place_url) {
		this.place_url = place_url;
	}

	public String getRoad_address_name() {
		return road_address_name;
	}

	public void setRoad_address_name(String road_address_name) {
		this.road_address_name = road_address_name;
	}

	public String getX() {
		return x;
	}

	public void setX(String x) {
		this.x = x;
	}

	public String getY() {
		return y;
	}

	public void setY(String y) {
		this.y = y;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((address_name == null) ? 0 : address_name.hashCode());
		result = prime * result + ((category_group_code == null) ? 0 : category_group_code.hashCode());
		result = prime * result + ((category_group_name == null) ? 0 : category_group_name.hashCode());
		result = prime * result + ((category_name == null) ? 0 : category_name.hashCode());
		result = prime * result + ((distance == null) ? 0 : distance.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((phone == null) ? 0 : phone.hashCode());
		result = prime * result + ((place_name == null) ? 0 : place_name.hashCode());
		result = prime * result + ((place_url == null) ? 0 : place_url.hashCode());
		result = prime * result + ((road_address_name == null) ? 0 : road_address_name.hashCode());
		result = prime * result + ((x == null) ? 0 : x.hashCode());
		result = prime * result + ((y == null) ? 0 : y.hashCode());
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
		Location other = (Location) obj;
		if (address_name == null) {
			if (other.address_name != null)
				return false;
		} else if (!address_name.equals(other.address_name))
			return false;
		if (category_group_code == null) {
			if (other.category_group_code != null)
				return false;
		} else if (!category_group_code.equals(other.category_group_code))
			return false;
		if (category_group_name == null) {
			if (other.category_group_name != null)
				return false;
		} else if (!category_group_name.equals(other.category_group_name))
			return false;
		if (category_name == null) {
			if (other.category_name != null)
				return false;
		} else if (!category_name.equals(other.category_name))
			return false;
		if (distance == null) {
			if (other.distance != null)
				return false;
		} else if (!distance.equals(other.distance))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (phone == null) {
			if (other.phone != null)
				return false;
		} else if (!phone.equals(other.phone))
			return false;
		if (place_name == null) {
			if (other.place_name != null)
				return false;
		} else if (!place_name.equals(other.place_name))
			return false;
		if (place_url == null) {
			if (other.place_url != null)
				return false;
		} else if (!place_url.equals(other.place_url))
			return false;
		if (road_address_name == null) {
			if (other.road_address_name != null)
				return false;
		} else if (!road_address_name.equals(other.road_address_name))
			return false;
		if (x == null) {
			if (other.x != null)
				return false;
		} else if (!x.equals(other.x))
			return false;
		if (y == null) {
			if (other.y != null)
				return false;
		} else if (!y.equals(other.y))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "location [address_name=" + address_name + ", category_group_code=" + category_group_code
				+ ", category_group_name=" + category_group_name + ", category_name=" + category_name + ", distance="
				+ distance + ", id=" + id + ", phone=" + phone + ", place_name=" + place_name + ", place_url="
				+ place_url + ", road_address_name=" + road_address_name + ", x=" + x + ", y=" + y + "]";
	}

	public Location() {
		super();
	}

	public Location(String address_name, String category_group_code, String category_group_name, String category_name,
			String distance, String id, String phone, String place_name, String place_url, String road_address_name,
			String x, String y) {
		super();
		this.address_name = address_name;
		this.category_group_code = category_group_code;
		this.category_group_name = category_group_name;
		this.category_name = category_name;
		this.distance = distance;
		this.id = id;
		this.phone = phone;
		this.place_name = place_name;
		this.place_url = place_url;
		this.road_address_name = road_address_name;
		this.x = x;
		this.y = y;
	}
	
}
