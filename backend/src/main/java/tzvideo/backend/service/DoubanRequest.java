package tzvideo.backend.service;

import tzvideo.backend.utils.SignatureHelper;

import java.util.HashMap;
import java.util.Map;


public class DoubanRequest {
    public final static String UA_DOUBAN_ANDROID="api-client/1 com.douban.frodo/6.42.2(194) Android/22 product/shamu vendor/OPPO model/OPPO R11 Plus  rom/android  network/wifi  platform/mobile nd/1";

    public static String builder(String baseLink, Map<String,String> paramsMap, String requestMethod){
        StringBuilder sb=new StringBuilder();
        sb.append(baseLink+"?");

        Map<String,String> verifyMap = SignatureHelper.getVerifyMap(baseLink, requestMethod, null);
        paramsMap.put("apikey","0dad551ec0f84ed02907ff5c42e8ec70");


        for(String key:paramsMap.keySet()){
            sb.append("&"+key+"="+paramsMap.get(key));
        }
        for(String key: verifyMap.keySet()){
            sb.append("&"+key+"="+verifyMap.get(key));
        }
        return sb.toString();
    }

//    public static get(String url){
//        Request request = new Request.Builder().url("https://github.com/").build();
//
//    }

}
