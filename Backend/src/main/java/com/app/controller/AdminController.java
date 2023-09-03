package com.app.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AdminDto;
import com.app.dto.ApiResponse;
import com.app.dto.AuthRequest;
import com.app.service.AdminService;

@RestController
@RequestMapping("/admin")
//@CrossOrigin(origins = "http://localhost:3000")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

	@Autowired
	private AdminService adminService;
	
	@PostMapping("/signin")
	public ResponseEntity<?> adminLogin(@RequestBody AuthRequest request) {
		return new ResponseEntity<>(adminService.authenticate(request), HttpStatus.OK);
	}
	
	@GetMapping("/admins")
	public ResponseEntity<?> getAllAdmins() {
		return new ResponseEntity<>(adminService.getAllAdmins(), HttpStatus.OK);
	}

	@PutMapping("/{adminId}")
	public ResponseEntity<?> updateAdmin(@PathVariable Long adminId, @RequestBody @Valid AdminDto admin) {
		return new ResponseEntity<>(new ApiResponse(adminService.updateAdmin(adminId, admin)), HttpStatus.OK);
	}

	@DeleteMapping("/{adminId}")
	public ResponseEntity<?> deleteAdmin(@PathVariable Long adminId) {
		return new ResponseEntity<>(new ApiResponse(adminService.deleteAdmin(adminId)), HttpStatus.OK);
	}

	/*
	 * command: mvn javadoc
	 * 
	 * Description
	 * 
	 * @param
	 * 
	 * @return
	 * 
	 * @throws
	 */
}
