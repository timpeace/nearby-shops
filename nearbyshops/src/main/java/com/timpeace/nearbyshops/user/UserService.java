package com.timpeace.nearbyshops.user;

import java.util.LinkedHashMap;
import java.util.Map;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import java.util.regex.Pattern;

@Service
public class UserService {

    @Autowired
    MongoTemplate mongoTemplate;

    private Pattern patternUsername,patternPassword;
    
    // Add new user in signup
	public Map<String, String> addNewUser(User user){
		patternUsername = Pattern.compile("^[a-z0-9_-]{4,15}$");
		boolean validUsername = (user.getUsername() != null) && patternUsername.matcher(user.getUsername()).matches();
		patternPassword = Pattern.compile("^(?=\\S+$).{4,}$");
		boolean validPassword = (user.getPassword() != null) && (!user.getPassword().equals("")) && patternPassword.matcher(user.getPassword()).matches();
		Map<String, String> map = new LinkedHashMap<>();
		Query query = new Query();
		query.addCriteria(Criteria.where("username").is(user.getUsername()));
		if(!validUsername){
			map.put("invalid", "Invalid username !");
			return map; // invalid username
		}else if(validUsername && mongoTemplate.find(query, User.class).size()>0){
			map.put("alreadyExist", "Username already exist !");
			return map; // user already exist
		}else if(validUsername && !validPassword){
			map.put("invalid", "Invalid password !");
			return map; // invalid password
		}else{
			mongoTemplate.save(user);
			map.put("valid", "Welcome ! You are signed up !");
			return map; // new user added
		}
	}

	// Used by ValidateUser
	public boolean findUser(String userId) {
		Query query = new Query();
		query.addCriteria(Criteria.where("_id").is(new ObjectId(userId)));
		if(mongoTemplate.find(query, User.class).size()>0){
			return true; // user exists
		}else{
			return false; // user does not exist
		}
	}
	
	// Used by loadUserByUsername in WebSecurityConfig
	public User findByUsername(String username){
		Query query = new Query();
		query.addCriteria(Criteria.where("username").is(username));
		User user = new User();
		user = mongoTemplate.findOne(query, User.class);
		return user;	
	}
}
