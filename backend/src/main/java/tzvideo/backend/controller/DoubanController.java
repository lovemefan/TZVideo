package tzvideo.backend.controller;

import okhttp3.Response;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import tzvideo.backend.service.DoubanRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/v2")
public class DoubanController {
    private static final String HOST = "https://frodo.douban.com";


    /**
     * 豆瓣片单
     * @return
     */
    @RequestMapping(value = "/skynet/new_playlists", method = RequestMethod.GET)
    public String playList(HttpServletRequest request) {
        return get(request.getRequestURI(), request.getParameterMap());
    }

    @RequestMapping(value = "/doulist/{listId}/posts", method = RequestMethod.GET)
    public String playList_info(HttpServletRequest request) {
        return get(request.getRequestURI(), request.getParameterMap());
    }

    @RequestMapping(value = "/movie/{movideId}", method = RequestMethod.GET)
    public String getMovie(HttpServletRequest request) {
        return get(request.getRequestURI(), request.getParameterMap());
    }

    @RequestMapping(value = "tv/{tvId}", method = RequestMethod.GET)
    public String getTv(HttpServletRequest request) {
        return get(request.getRequestURI(), request.getParameterMap());
    }

    @RequestMapping(value = "/subject_collection/{types}/items", method = RequestMethod.GET)
    public String getHostSeries(HttpServletRequest request) {
        return get(request.getRequestURI(), request.getParameterMap());
    }


    @RequestMapping(value = "/search/movie/{method}", method = RequestMethod.GET)
    public String getSearch(HttpServletRequest request) {
        return get(request.getRequestURI(), request.getParameterMap());
    }

    private String get(String uri, Map<String,String[]> paramsMap) {
        String url = DoubanRequest.builder(HOST + uri, paramsMap,"GET");
        System.out.println(url);
        Response resonse = null;
        try {
            resonse = DoubanRequest.get(url);
            String result = resonse.body().string();
            System.out.println(result);
            return result;
        } catch (IOException e) {
            e.printStackTrace();
            return "{message:\"error\", code: 500}";
        }
    }



}
