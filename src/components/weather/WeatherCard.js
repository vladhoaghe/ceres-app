import React from "react";
import ReactWeather, { useOpenWeather } from "react-open-weather";

function WeatherCard(props) {
    const { data, isLoading, errorMessage } = useOpenWeather({
        key: "39e3082c3b397e0d923544e011d13f29",
        lat: "43.90079915690249",
        lon: "25.212335586547848",
        lang: "en",
        unit: "metric",
    });

    const customStyles = {
        fontFamily: "Helvetica, sans-serif",
        gradientStart: "#35322D",
        gradientMid: "#58534B",
        gradientEnd: "#847D71",
        locationFontColor: "#FFF",
        todayTempFontColor: "#FFF",
        todayDateFontColor: "#C7C3BD",
        todayRangeFontColor: "#C7C3BD",
        todayDescFontColor: "#C7C3BD",
        todayInfoFontColor: "#C7C3BD",
        todayIconColor: "#FFF",
        forecastBackgroundColor: "#FFF",
        forecastSeparatorColor: "#DDD",
        forecastDateColor: "#777",
        forecastDescColor: "#777",
        forecastRangeColor: "#777",
        forecastIconColor: "#847D71",
    };

    return (
        <ReactWeather
            theme={customStyles}
            isLoading={isLoading}
            errorMessage={errorMessage}
            data={data}
            lang="en"
            locationLabel={props.parcelName}
            unitsLabels={{ temperature: "C", windSpeed: "Km/h" }}
            showForecast
        />
    );
}

export default WeatherCard;
