package com.app.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dto.AdminDto;
import com.app.dto.AuthRequest;
import com.app.entities.Admin;
import com.app.repository.AdminRepository;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {

	@Autowired
	private AdminRepository adminRepo;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public String updateAdmin(Long id, AdminDto admin) {
		Admin existingAdmin = adminRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid admin id!!!"));
		existingAdmin.setName(admin.getName());
		adminRepo.save(existingAdmin);
		return "Admin " + admin.getName() + "'s  details updated!";
	}

	@Override
	public String deleteAdmin(Long id) {
		Admin admin = adminRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Invalid admin id!!!"));
		adminRepo.delete(admin);
		return "Admin " + admin.getName() + "'s  details deleted!";
	}

	@Override
	public List<AdminDto> getAllAdmins() {
		List<Admin> admins = adminRepo.findAll();
		List<AdminDto> adminDtos = admins.stream().map((a) -> modelMapper.map(a, AdminDto.class))
				.collect(Collectors.toList());
		return adminDtos;
	}

	@Override
	public AdminDto authenticate(AuthRequest request) {
		Admin admin = adminRepo.findByEmailAndPassword(request.getEmail(), request.getPassword())
				.orElseThrow(() -> new ResourceNotFoundException("Bad Credentials , Invalid Login!!!"));
		return modelMapper.map(admin, AdminDto.class);
	}

}
