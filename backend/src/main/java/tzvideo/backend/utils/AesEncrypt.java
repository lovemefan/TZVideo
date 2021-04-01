package tzvideo.backend.utils;

import javax.crypto.Cipher;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;

public class AesEncrypt {
    public static final String encrypt(String text,String key){
        SecretKeySpec spec=buildSpec(key);
        byte[] decode=Base64.decode(text,0);
        Cipher instance= null;
        try {
            instance = Cipher.getInstance("AES/CBC/NoPadding");
            instance.init(2,spec,new IvParameterSpec("DOUBANFRODOAPPIV".getBytes()));
            return new String(instance.doFinal(decode));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return text;
    }

    private static SecretKeySpec buildSpec(String key) {
        byte[] b;
        if(key==null){
            key="";
        }
        StringBuilder sb=new StringBuilder();
        sb.append(key);
        while (sb.length()<16){
            sb.append("\u0000");
        }
        if(sb.length()>16){
            sb.setLength(16);
        }
        try {
            b=sb.toString().getBytes("utf-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            b=null;
        }
        return new SecretKeySpec(b,"AES");
    }

    public static void main(String[] args) {
        String SIGN="MIICUjCCAbsCBEty1MMwDQYJKoZIhvcNAQEEBQAwcDELMAkGA1UEBhMCemgxEDAOBgNVBAgTB0Jl\n" +
                "aWppbmcxEDAOBgNVBAcTB0JlaWppbmcxEzARBgNVBAoTCkRvdWJhbiBJbmMxFDASBgNVBAsTC0Rv\n" +
                "dWJhbiBJbmMuMRIwEAYDVQQDEwlCZWFyIFR1bmcwHhcNMTAwMjEwMTU0NjExWhcNMzcwNjI3MTU0\n" +
                "NjExWjBwMQswCQYDVQQGEwJ6aDEQMA4GA1UECBMHQmVpamluZzEQMA4GA1UEBxMHQmVpamluZzET\n" +
                "MBEGA1UEChMKRG91YmFuIEluYzEUMBIGA1UECxMLRG91YmFuIEluYy4xEjAQBgNVBAMTCUJlYXIg\n" +
                "VHVuZzCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEAg622fxLuwQtC8KLYp5gHk0OmfrFiIisz\n" +
                "kzPLBhKPZDHjYS1URhQpzf00T8qg2oEwJPPELjN2Q7YOoax8UINXLhMgFQkyAvMfjdEOSfoKH93p\n" +
                "v2d4n/IjQc/TaDKu6yb53DOq76HTUYLcfLKOXaGwGjAp3QqTqP9LnjJjGZCdSvMCAwEAATANBgkq\n" +
                "hkiG9w0BAQQFAAOBgQA3MovcB3Hv4bai7OYHU+gZcGQ/8sOLAXGD/roWPX3gm9tyERpGztveH35p\n" +
                "aI3BrUWg2Vir0DRjbR48b2HxQidQTVIH/HOJHV0jgYNDviD18/cBwKuLiBvdzc2Fte+zT0nnHXMy\n" +
                "E6tVeW3UdHC1UvzyB7Qcxiu4sBiEO1koToQTWw==\n";
        /**
         * 反编译豆瓣后得到的一个常量，在豆瓣APP里面固定写死了,具体位置看我的图文解析
         */
//        String TEXT="bHUvfbiVZUmm2sQRKwiAcw==";
        String TEXT="74CwfJd4+7LYgFhXi1cx0IQC35UQqYVFycCE+EVyw1E=";
        String result = AesEncrypt.encrypt(TEXT, SIGN);
        System.out.println(result);
    }
}
