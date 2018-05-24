package com.timpeace.nearbyshops.shop;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="likes")
public class Like {

	private ObjectId userId;
	private ObjectId shopId;

	public ObjectId getUserId() {
		return userId;
	}

	public void setUserId(ObjectId userId) {
		this.userId = userId;
	}

	public ObjectId getShopId() {
		return shopId;
	}

	public void setShopId(ObjectId shopId) {
		this.shopId = shopId;
	}

	public Like(ObjectId userId, ObjectId shopId) {
		this.userId = userId;
		this.shopId = shopId;
	}

	public Like() {

	}
}
