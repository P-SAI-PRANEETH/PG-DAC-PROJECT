package com.app.service;

import java.util.List;

import com.app.dto.AdminDto;
import com.app.dto.AuthRequest;

public interface AdminService {

	String updateAdmin(Long id, AdminDto admin);
	String deleteAdmin(Long id);
	List<AdminDto> getAllAdmins();
	AdminDto authenticate(AuthRequest request);
}
