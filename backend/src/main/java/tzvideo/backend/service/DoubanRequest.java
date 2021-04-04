package tzvideo.backend.service;

import okhttp3.*;
import tzvideo.backend.utils.SignatureHelper;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;


public class DoubanRequest {
    public final static String UA_DOUBAN_ANDROID="api-client/1 com.douban.frodo/7.0.1(204) Android/22 product/TAS-AN00 vendor/HUAWEI model/TAS-AN00  rom/android  network/wifi  udid/6e0aa478da3e9a1e81237b27130aac9e58344989  platform/AndroidPad";


    private RequestBody commonBody = new FormBody.Builder()
            .add("apikey", "0dad551ec0f84ed02907ff5c42e8ec70")
            .build();

    public static String builder(String baseLink, Map<String,String[]> paramsMap, String requestMethod){
        StringBuilder sb=new StringBuilder();
        sb.append(baseLink+"?");

        Map<String,String> verifyMap = SignatureHelper.getVerifyMap(baseLink, requestMethod, null);
        verifyMap.put("apikey","0dad551ec0f84ed02907ff5c42e8ec70");


        for(String key:paramsMap.keySet()){
            sb.append("&"+key+"="+paramsMap.get(key));
        }
        for(String key: verifyMap.keySet()){
            sb.append("&"+key+"="+verifyMap.get(key));
        }
        return sb.toString();
    }


    public static Response get(String url) throws IOException {
        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder().url(url).
                addHeader("User-Agent",UA_DOUBAN_ANDROID).
                build();
        Call call = client.newCall(request);
        Response response = call.execute();
        return  response;
    }



    public static void main(String[] args) {
        Map<String, String> paramete = new HashMap<String, String>();
        String sb = DoubanRequest.builder("http://baidu.com/",null,"GET");
        Response resonse = null;
        try {
            resonse = DoubanRequest.get(sb);
            System.out.println(resonse.body().string());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


}
