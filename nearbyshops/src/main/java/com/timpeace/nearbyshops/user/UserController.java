package com.timpeace.nearbyshops.user;

import java.security.Principal;
import java.util.LinkedHashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

	@Autowired
	private UserService userService;
	
	// Add a new user
	@RequestMapping(value="/api/v1/signup", method=RequestMethod.POST)
	public Map<String, String> addNewUser(@RequestBody User user){
		return userService.addNewUser(user);
	}

	@RequestMapping(value = "/user", method = RequestMethod.GET)
	@ResponseBody
    public Map<String, String> currentUser(Principal currentUser) {
        Map<String, String> map = new LinkedHashMap<>();
        if(currentUser.getName() == null || currentUser == null || currentUser.getName().isEmpty() || currentUser.getName().equals("")){
            map.put("invalidUser", "Username or password are invalid !");
            return map;
        }else{
        	com.timpeace.nearbyshops.user.User user = userService.findByUsername(currentUser.getName());
        	map.put("userId", user.getId());
            map.put("username", currentUser.getName());
            return map;
        }
    }
}
