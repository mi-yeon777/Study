package com.study.project.rest;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpServletResponse;

@RestController
// @controller + @ResponseBody
@RequestMapping("board")
public class RestBoardController {
	
	//생성자 - 클래스명과 똑같은 이름의 메소드

	private final RestBoardServiceInter service;
	public RestBoardController(RestBoardServiceInter service) {
		this.service = service;
	}

	@GetMapping
	public RestResponseDTO dtoFindAll(){
		
		
		SearchDTO searchDTO = new SearchDTO();
		searchDTO.setCurPage(1);
		searchDTO.setPageSize(5);
		searchDTO.setOffset(0);
		List<RestBoardDTO> list = service.dtoFindAll(searchDTO);
		RestPageDTO pageDTO = service.page(searchDTO);
		
		RestResponseDTO resDTO = new RestResponseDTO();
		resDTO.setList(list);
		resDTO.setPage(pageDTO);
		
		return resDTO;
	}
	
	@PostMapping("/search")
	public RestResponseDTO search(@RequestBody SearchDTO searchDTO){
		
		int curPage = searchDTO.getCurPage();
		int pageSize = searchDTO.getPageSize();
		int offset = (curPage - 1) * pageSize;
		searchDTO.setOffset(offset );
		
		List<RestBoardDTO> list = service.dtoFindAll(searchDTO);
		RestPageDTO pageDTO = service.page(searchDTO);
		
		RestResponseDTO resDTO = new RestResponseDTO();
		resDTO.setList(list);
		resDTO.setPage(pageDTO);
		
		return resDTO;
	}
	
	
	//http:localhost:8080/board/{num}
	@GetMapping("/{num}")
	public Map<String, Object> read(@PathVariable int num) {
	


		Map<String, Object> dataMap = new HashMap<String, Object>();

		RestBoardDTO dto = service.findById(num);
		List<RestFileDTO> listFile = service.findFile(num);

		dataMap.put("boardDto", dto);
		dataMap.put("listFile", listFile);

		
		
		return  dataMap;
	}
	
	@PostMapping("fileDownload")
	public void fileDownload(@RequestBody RestFileDTO fileDTO, HttpServletResponse response) throws IOException{


		File f = new File(fileDTO.getSavePath(), fileDTO.getSaveName());

		if(!f.exists()) {
			response.setStatus(HttpServletResponse.SC_NOT_FOUND);
	        return;

		}
        // file 다운로드 설정
		response.setContentType("application/octet-stream");
	    response.setHeader("Content-Disposition", "attachme0nt; filename=\""
	                       + URLEncoder.encode(fileDTO.getRealName(), "UTF-8") + "\"");
        // response 객체를 통해서 서버로부터 파일 다운로드
        OutputStream os = response.getOutputStream();
        // 파일 입력 객체 생성
        FileInputStream fis = new FileInputStream(f);
        FileCopyUtils.copy(fis, os);
        fis.close();
        os.close();

	}

	
	@PostMapping
	public Map<String, Object> create(@ModelAttribute RestBoardDTO dto,
									  @RequestPart(value = "files", required = false) List<MultipartFile> files) throws Exception{
		//@modelAttribute 텍스트만 저장
		
		
		//new FormData(); .append(
		int insert = service.create(dto, files);
		
		Map<String, Object> status = new HashMap<String, Object>();
		status.put("status", insert==0 ? false :true );
		return status;
	}
	
	

	
	
	
//	@RequestMapping(value = "list", method = RequestMethod.GET)
//	public String list() {
//		return "aa";
//	}
//	
//	@RequestMapping(value = "list", method = RequestMethod.POST)
//	public String insert() {
//		return "aa";
//	}
	
	
	
	
	
}
