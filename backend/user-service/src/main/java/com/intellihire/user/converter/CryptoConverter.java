package com.intellihire.user.converter;


import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;


@Converter
public class CryptoConverter

        implements AttributeConverter<String,String> {


    @Override
    public String convertToDatabaseColumn(
            String value
    ){

        if(value == null){
            return null;
        }

        return "ENC_" + value;
    }


    @Override
    public String convertToEntityAttribute(
            String value
    ){

        if(value == null){
            return null;
        }

        return value.replace(
                "ENC_",
                ""
        );
    }

}