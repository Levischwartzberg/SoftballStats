package com.softball.softballstats.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtils {

    public static Date parseDate(String year, String month, String day, String hour, String min) {
        String date = day+"-"+month+"-"+year+" "+hour+":"+min+":00 +0000";
        SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss Z");

        try {
            Date parsedDate = formatter.parse(date);
            return parsedDate;
        }
        catch (ParseException e) {
            return null;
        }
    }
}
