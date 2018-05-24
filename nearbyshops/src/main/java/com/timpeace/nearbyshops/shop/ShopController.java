package com.timpeace.nearbyshops.shop;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.timpeace.nearbyshops.user.UserNotFoundException;
import com.timpeace.nearbyshops.user.UserService;

@RestController
public class ShopController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private ShopService shopService;
	
	// Retrieve all shops
	@RequestMapping(method=RequestMethod.GET,value="/api/v1/shops")
	public List<Shop> findAllShops(){
		return shopService.findAllShops();
	}
	
	
	// Retrieve shops for main page, not liked, not disliked
	@RequestMapping(method=RequestMethod.GET,value="/api/v1/secured/nearby-shops")
	public List<Shop> findNearbyShops(@RequestParam String userId){
		this.validateUser(userId);
		return shopService.findNearbyShops(userId);
	}
	
	// Retrieve shops liked by a specific user
	@RequestMapping(method=RequestMethod.GET,value="/api/v1/secured/preferred-shops")
	public List<Shop> findPreferredShops(@RequestParam String userId){
		this.validateUser(userId);
		return shopService.findPreferredShops(userId);
	}
	
	// Like a shop by a specific user
	@RequestMapping(method=RequestMethod.POST,value="/api/v1/secured/like-shop")
	public void likeShop(@RequestBody Like like){
		this.validateUser(like.getUserId().toString());
		shopService.likeShop(like);
	}
	
	// Remove a liked shop from preferred shops
	@RequestMapping(method=RequestMethod.DELETE,value="/api/v1/secured/remove-shop")
	public void removeLikedShop(@RequestParam String shopId,@RequestParam String userId){
		this.validateUser(userId);
		shopService.removeLikedShop(userId, shopId);
	}
	
	// Dislike a shop by a specific user
	@RequestMapping(method=RequestMethod.POST,value="/api/v1/secured/dislike-shop")
	public void dislikeShop(@RequestBody Dislike dislike){
		this.validateUser(dislike.getUserId().toString());
		dislike.setCreated(new Date());
		shopService.dislikeShop(dislike);
	}	
	
	// validate the existence of user, throw an exception if user not exist
	private void validateUser(String userId) {
		if(!userService.findUser(userId)) throw new UserNotFoundException(userId);
	}
}
