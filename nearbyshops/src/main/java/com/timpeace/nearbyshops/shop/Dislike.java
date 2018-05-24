package com.timpeace.nearbyshops.shop;

import java.util.Date;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection="dislikes")
public class Dislike {
	
	private ObjectId userId;
	private ObjectId shopId;
	@Indexed(name="created",expireAfterSeconds = 7200) // document will expire in 2 hours
	private Date created;
	
	public ObjectId getShopId() {
		return shopId;
	}

	public void setShopId(ObjectId shopId) {
		this.shopId = shopId;
	}

	public ObjectId getUserId() {
		return userId;
	}

	public void setUserId(ObjectId userId) {
		this.userId = userId;
	}

	public Date getCreated() {
		return created;
	}

	public void setCreated(Date created) {
		this.created = new Date();
	}

	public Dislike(ObjectId userId, ObjectId shopId, Date created) {
		super();
		this.userId = userId;
		this.shopId = shopId;
		this.created = new Date();
	}

	public Dislike(){
		
	}
}
