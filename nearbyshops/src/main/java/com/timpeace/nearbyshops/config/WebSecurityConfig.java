package com.timpeace.nearbyshops.config;


import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.timpeace.nearbyshops.user.UserNotFoundException;
import com.timpeace.nearbyshops.user.UserService;


@Configuration
@EnableWebSecurity
public class WebSecurityConfig  extends WebSecurityConfigurerAdapter implements UserDetailsService {
	
	@Autowired
	private UserService userService;
	
	private final ObjectMapper objectMapper;
	
    public WebSecurityConfig(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

	@Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .authorizeRequests()
            .antMatchers("/resources/**","/images/**","/js/**","/css/**","/views/**","/","/index.html","/all-shops","/login","/signup","/api/v1/shops","/api/v1/signup","/api/v1/user").permitAll()
        	.anyRequest().authenticated()
        	
            .and()
            .formLogin()
            .loginPage("/login")
            .permitAll()
            .successHandler(this::loginSuccessHandler)
            .failureHandler(this::loginFailureHandler)
            
            .and()
            .logout()
            .permitAll()
            .logoutSuccessHandler(this::logoutSuccessHandler)
            .invalidateHttpSession(true)
            
            .and()
	        .httpBasic()
	        
	        .and()
	        .csrf().csrfTokenRepository(csrfTokenRepository())
	        
	        .and()
	        .addFilterAfter(new CsrfHeaderFilter(), CsrfFilter.class);
    }
	
	@Bean
	public CsrfTokenRepository csrfTokenRepository() {
	    HttpSessionCsrfTokenRepository repository =
	            new HttpSessionCsrfTokenRepository();

	    repository.setHeaderName("X-XSRF-TOKEN");
	    return repository;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		com.timpeace.nearbyshops.user.User user = userService.findByUsername(username);
		if(user == null){
			throw new UserNotFoundException(username); 
		}
        return toUserDetails(user);
	}
	

    private UserDetails toUserDetails(com.timpeace.nearbyshops.user.User userObject) {
        return User.withUsername(userObject.getUsername())
                   .password(userObject.getPassword())
                   .roles("USER").build();
    }
    
    private void loginSuccessHandler(HttpServletRequest request,HttpServletResponse response,Authentication authentication) throws IOException {
        response.setStatus(HttpStatus.OK.value());
        objectMapper.writeValue(response.getWriter(), "You are logged in !");
    }
     
    private void loginFailureHandler(HttpServletRequest request, HttpServletResponse response, AuthenticationException e) throws IOException {
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        objectMapper.writeValue(response.getWriter(), "Username or Password are invalid !");
    }
        
    private void logoutSuccessHandler(HttpServletRequest request,HttpServletResponse response,Authentication authentication) throws IOException {
        response.setStatus(HttpStatus.OK.value());
        objectMapper.writeValue(response.getWriter(), "You are logged out !");
    }
}
