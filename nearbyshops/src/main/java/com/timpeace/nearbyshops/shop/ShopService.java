package com.timpeace.nearbyshops.shop;

import java.util.ArrayList;
import java.util.List;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

@Service
public class ShopService {
	
    @Autowired
    MongoTemplate mongoTemplate;
    
    public List<Shop> findAllShops(){
		Query query1 = new Query();
		List<Shop> shops = mongoTemplate.find(query1, Shop.class);
		return shops;
    }
    
    public List<Shop> findNearbyShops(String userId){
		List<ObjectId> shopsIds = new ArrayList<>();
		Query query1 = new Query();
		query1.addCriteria(Criteria.where("userId").is(new ObjectId(userId)));
		mongoTemplate.find(query1, Like.class).forEach(like->shopsIds.add(like.getShopId())); // list of liked shops IDs
		Query query2 = new Query();
		query2.addCriteria(Criteria.where("userId").is(new ObjectId(userId)));
		mongoTemplate.find(query2, Dislike.class).forEach(dislike->shopsIds.add(dislike.getShopId())); // list of disliked shops IDs
		Query query3 = new Query();
		query3.addCriteria(Criteria.where("_id").not().in(shopsIds)); // shops that are not liked, not disliked
		query3.with(new Sort(Sort.Direction.ASC, "location")); // sort shops by location
		List<Shop> shops = mongoTemplate.find(query3, Shop.class);
		return shops;
    }
    
	public List<Shop> findPreferredShops(String userId) {
		List<ObjectId> shopsIds = new ArrayList<>();
		Query query1 = new Query();
		query1.addCriteria(Criteria.where("userId").is(new ObjectId(userId)));
		mongoTemplate.find(query1, Like.class).forEach(like->shopsIds.add(like.getShopId()));
		Query query2 = new Query();
		query2.addCriteria(Criteria.where("_id").in(shopsIds));
		List<Shop> shops = mongoTemplate.find(query2, Shop.class);
		return shops;
	}
	
	public void likeShop(Like like){
		mongoTemplate.save(like, "likes");
	}
	
	public void removeLikedShop(String userId, String shopId){
		mongoTemplate.remove(new Query(Criteria.where("shopId").is(new ObjectId(shopId)).and("userId").is(new ObjectId(userId))), Like.class);
	}
	
	public void dislikeShop(Dislike dislike){
		mongoTemplate.save(dislike, "dislikes");
	}

}
