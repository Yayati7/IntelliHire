package com.intellihire.user.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(

        prefix="resume"

)

public class ResumeProperties {

    private String uploadFolder;

    private String tempFolder;

    private String maxSize;

    public String getUploadFolder(){

        return uploadFolder;

    }

    public void setUploadFolder(

            String uploadFolder

    ){

        this.uploadFolder=uploadFolder;

    }

    public String getTempFolder(){

        return tempFolder;

    }

    public void setTempFolder(

            String tempFolder

    ){

        this.tempFolder=tempFolder;

    }

    public String getMaxSize(){

        return maxSize;

    }

    public void setMaxSize(

            String maxSize

    ){

        this.maxSize=maxSize;

    }

}