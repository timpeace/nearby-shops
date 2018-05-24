package com.timpeace.nearbyshops;

import javax.servlet.Filter;
import javax.servlet.http.HttpServletRequest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.timpeace.nearbyshops.config.CustomURLRewriter;


@SpringBootApplication
public class MainNearbyShops {

	public static void main(String[] args) {
		SpringApplication.run(MainNearbyShops.class, args);
	}
	
    @RequestMapping(value = "{path:[^\\.]*}", method = RequestMethod.GET)
    public String  redirect(HttpServletRequest request) {
        // Forward to home page so that route is preserved.
        return "forward:/";
    }
    
    @Bean
    public FilterRegistrationBean tuckeyRegistrationBean() {
        final FilterRegistrationBean registrationBean = new FilterRegistrationBean();
        registrationBean.setFilter((Filter) new CustomURLRewriter());
        return registrationBean;
    }
    
}
