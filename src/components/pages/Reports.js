import React from "react";
import ReactWeather, { useOpenWeather } from "react-open-weather";

function Reports() {
    const { data, isLoading, errorMessage } = useOpenWeather({
        key: "39e3082c3b397e0d923544e011d13f29",
        lat: "43.90079915690249",
        lon: "25.212335586547848",
        lang: "en",
        unit: "metric",
    });
    return (
        <div className="reports">
            <h1>Reports</h1>
            <ReactWeather
                isLoading={isLoading}
                errorMessage={errorMessage}
                data={data}
                lang="en"
                locationLabel="Your parcel"
                unitsLabels={{ temperature: "C", windSpeed: "Km/h" }}
                showForecast
            />
        </div>
    );
}

export default Reports;
