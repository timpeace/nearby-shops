package com.timpeace.nearbyshops.shop;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "shops", path = "shops")
public interface ShopRepository extends MongoRepository<Shop, ObjectId> {
	List<Shop> findById(@Param("_id") String id);

}