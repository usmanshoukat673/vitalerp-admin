<?php

namespace App\Http\Traits;

trait States
{
    protected function us_states()
    {
        return json_decode('
            [
                {
                    "id": 1456,
                    "name": "Alabama",
                    "state_code": "AL",
                    "latitude": "32.31823140",
                    "longitude": "-86.90229800",
                    "type": "state"
                },
                {
                    "id": 1400,
                    "name": "Alaska",
                    "state_code": "AK",
                    "latitude": "64.20084130",
                    "longitude": "-149.49367330",
                    "type": "state"
                },
                {
                    "id": 1424,
                    "name": "American Samoa",
                    "state_code": "AS",
                    "latitude": "-14.27097200",
                    "longitude": "-170.13221700",
                    "type": "outlying area"
                },
                {
                    "id": 1434,
                    "name": "Arizona",
                    "state_code": "AZ",
                    "latitude": "34.04892810",
                    "longitude": "-111.09373110",
                    "type": "state"
                },
                {
                    "id": 1444,
                    "name": "Arkansas",
                    "state_code": "AR",
                    "latitude": "35.20105000",
                    "longitude": "-91.83183340",
                    "type": "state"
                },
                {
                    "id": 1402,
                    "name": "Baker Island",
                    "state_code": "UM-81",
                    "latitude": "0.19362660",
                    "longitude": "-176.47690800",
                    "type": "islands \/ groups of islands"
                },
                {
                    "id": 1416,
                    "name": "California",
                    "state_code": "CA",
                    "latitude": "36.77826100",
                    "longitude": "-119.41793240",
                    "type": "state"
                },
                {
                    "id": 1450,
                    "name": "Colorado",
                    "state_code": "CO",
                    "latitude": "39.55005070",
                    "longitude": "-105.78206740",
                    "type": "state"
                },
                {
                    "id": 1435,
                    "name": "Connecticut",
                    "state_code": "CT",
                    "latitude": "41.60322070",
                    "longitude": "-73.08774900",
                    "type": "state"
                },
                {
                    "id": 1399,
                    "name": "Delaware",
                    "state_code": "DE",
                    "latitude": "38.91083250",
                    "longitude": "-75.52766990",
                    "type": "state"
                },
                {
                    "id": 1437,
                    "name": "District of Columbia",
                    "state_code": "DC",
                    "latitude": "38.90719230",
                    "longitude": "-77.03687070",
                    "type": "district"
                },
                {
                    "id": 1436,
                    "name": "Florida",
                    "state_code": "FL",
                    "latitude": "27.66482740",
                    "longitude": "-81.51575350",
                    "type": "state"
                },
                {
                    "id": 1455,
                    "name": "Georgia",
                    "state_code": "GA",
                    "latitude": "32.16562210",
                    "longitude": "-82.90007510",
                    "type": "state"
                },
                {
                    "id": 1412,
                    "name": "Guam",
                    "state_code": "GU",
                    "latitude": "13.44430400",
                    "longitude": "144.79373100",
                    "type": "outlying area"
                },
                {
                    "id": 1411,
                    "name": "Hawaii",
                    "state_code": "HI",
                    "latitude": "19.89676620",
                    "longitude": "-155.58278180",
                    "type": "state"
                },
                {
                    "id": 1398,
                    "name": "Howland Island",
                    "state_code": "UM-84",
                    "latitude": "0.81132190",
                    "longitude": "-176.61827360",
                    "type": "islands \/ groups of islands"
                },
                {
                    "id": 1460,
                    "name": "Idaho",
                    "state_code": "ID",
                    "latitude": "44.06820190",
                    "longitude": "-114.74204080",
                    "type": "state"
                },
                {
                    "id": 1425,
                    "name": "Illinois",
                    "state_code": "IL",
                    "latitude": "40.63312490",
                    "longitude": "-89.39852830",
                    "type": "state"
                },
                {
                    "id": 1440,
                    "name": "Indiana",
                    "state_code": "IN",
                    "latitude": "40.26719410",
                    "longitude": "-86.13490190",
                    "type": "state"
                },
                {
                    "id": 1459,
                    "name": "Iowa",
                    "state_code": "IA",
                    "latitude": "41.87800250",
                    "longitude": "-93.09770200",
                    "type": "state"
                },
                {
                    "id": 1410,
                    "name": "Jarvis Island",
                    "state_code": "UM-86",
                    "latitude": "-0.37435030",
                    "longitude": "-159.99672060",
                    "type": "islands \/ groups of islands"
                },
                {
                    "id": 1428,
                    "name": "Johnston Atoll",
                    "state_code": "UM-67",
                    "latitude": "16.72950350",
                    "longitude": "-169.53364770",
                    "type": "islands \/ groups of islands"
                },
                {
                    "id": 1406,
                    "name": "Kansas",
                    "state_code": "KS",
                    "latitude": "39.01190200",
                    "longitude": "-98.48424650",
                    "type": "state"
                },
                {
                    "id": 1419,
                    "name": "Kentucky",
                    "state_code": "KY",
                    "latitude": "37.83933320",
                    "longitude": "-84.27001790",
                    "type": "state"
                },
                {
                    "id": 1403,
                    "name": "Kingman Reef",
                    "state_code": "UM-89",
                    "latitude": "6.38333300",
                    "longitude": "-162.41666700",
                    "type": "islands \/ groups of islands"
                },
                {
                    "id": 1457,
                    "name": "Louisiana",
                    "state_code": "LA",
                    "latitude": "30.98429770",
                    "longitude": "-91.96233270",
                    "type": "state"
                },
                {
                    "id": 1453,
                    "name": "Maine",
                    "state_code": "ME",
                    "latitude": "45.25378300",
                    "longitude": "-69.44546890",
                    "type": "state"
                },
                {
                    "id": 1401,
                    "name": "Maryland",
                    "state_code": "MD",
                    "latitude": "39.04575490",
                    "longitude": "-76.64127120",
                    "type": "state"
                },
                {
                    "id": 1433,
                    "name": "Massachusetts",
                    "state_code": "MA",
                    "latitude": "42.40721070",
                    "longitude": "-71.38243740",
                    "type": "state"
                },
                {
                    "id": 1426,
                    "name": "Michigan",
                    "state_code": "MI",
                    "latitude": "44.31484430",
                    "longitude": "-85.60236430",
                    "type": "state"
                },
                {
                    "id": 1438,
                    "name": "Midway Atoll",
                    "state_code": "UM-71",
                    "latitude": "28.20721680",
                    "longitude": "-177.37349260",
                    "type": "islands \/ groups of islands"
                },
                {
                    "id": 1420,
                    "name": "Minnesota",
                    "state_code": "MN",
                    "latitude": "46.72955300",
                    "longitude": "-94.68589980",
                    "type": "state"
                },
                {
                    "id": 1430,
                    "name": "Mississippi",
                    "state_code": "MS",
                    "latitude": "32.35466790",
                    "longitude": "-89.39852830",
                    "type": "state"
                },
                {
                    "id": 1451,
                    "name": "Missouri",
                    "state_code": "MO",
                    "latitude": "37.96425290",
                    "longitude": "-91.83183340",
                    "type": "state"
                },
                {
                    "id": 1446,
                    "name": "Montana",
                    "state_code": "MT",
                    "latitude": "46.87968220",
                    "longitude": "-110.36256580",
                    "type": "state"
                },
                {
                    "id": 1439,
                    "name": "Navassa Island",
                    "state_code": "UM-76",
                    "latitude": "18.41006890",
                    "longitude": "-75.01146120",
                    "type": "islands \/ groups of islands"
                },
                {
                    "id": 1408,
                    "name": "Nebraska",
                    "state_code": "NE",
                    "latitude": "41.49253740",
                    "longitude": "-99.90181310",
                    "type": "state"
                },
                {
                    "id": 1458,
                    "name": "Nevada",
                    "state_code": "NV",
                    "latitude": "38.80260970",
                    "longitude": "-116.41938900",
                    "type": "state"
                },
                {
                    "id": 1404,
                    "name": "New Hampshire",
                    "state_code": "NH",
                    "latitude": "43.19385160",
                    "longitude": "-71.57239530",
                    "type": "state"
                },
                {
                    "id": 1417,
                    "name": "New Jersey",
                    "state_code": "NJ",
                    "latitude": "40.05832380",
                    "longitude": "-74.40566120",
                    "type": "state"
                },
                {
                    "id": 1423,
                    "name": "New Mexico",
                    "state_code": "NM",
                    "latitude": "34.51994020",
                    "longitude": "-105.87009010",
                    "type": "state"
                },
                {
                    "id": 1452,
                    "name": "New York",
                    "state_code": "NY",
                    "latitude": "40.71277530",
                    "longitude": "-74.00597280",
                    "type": "state"
                },
                {
                    "id": 1447,
                    "name": "North Carolina",
                    "state_code": "NC",
                    "latitude": "35.75957310",
                    "longitude": "-79.01929970",
                    "type": "state"
                },
                {
                    "id": 1418,
                    "name": "North Dakota",
                    "state_code": "ND",
                    "latitude": "47.55149260",
                    "longitude": "-101.00201190",
                    "type": "state"
                },
                {
                    "id": 1431,
                    "name": "Northern Mariana Islands",
                    "state_code": "MP",
                    "latitude": "15.09790000",
                    "longitude": "145.67390000",
                    "type": "outlying area"
                },
                {
                    "id": 4851,
                    "name": "Ohio",
                    "state_code": "OH",
                    "latitude": "40.41728710",
                    "longitude": "-82.90712300",
                    "type": "state"
                },
                {
                    "id": 1421,
                    "name": "Oklahoma",
                    "state_code": "OK",
                    "latitude": "35.46756020",
                    "longitude": "-97.51642760",
                    "type": "state"
                },
                {
                    "id": 1415,
                    "name": "Oregon",
                    "state_code": "OR",
                    "latitude": "43.80413340",
                    "longitude": "-120.55420120",
                    "type": "state"
                },
                {
                    "id": 1448,
                    "name": "Palmyra Atoll",
                    "state_code": "UM-95",
                    "latitude": "5.88850260",
                    "longitude": "-162.07866560",
                    "type": "islands \/ groups of islands"
                },
                {
                    "id": 1422,
                    "name": "Pennsylvania",
                    "state_code": "PA",
                    "latitude": "41.20332160",
                    "longitude": "-77.19452470",
                    "type": "state"
                },
                {
                    "id": 1449,
                    "name": "Puerto Rico",
                    "state_code": "PR",
                    "latitude": "18.22083300",
                    "longitude": "-66.59014900",
                    "type": "outlying area"
                },
                {
                    "id": 1461,
                    "name": "Rhode Island",
                    "state_code": "RI",
                    "latitude": "41.58009450",
                    "longitude": "-71.47742910",
                    "type": "state"
                },
                {
                    "id": 1443,
                    "name": "South Carolina",
                    "state_code": "SC",
                    "latitude": "33.83608100",
                    "longitude": "-81.16372450",
                    "type": "state"
                },
                {
                    "id": 1445,
                    "name": "South Dakota",
                    "state_code": "SD",
                    "latitude": "43.96951480",
                    "longitude": "-99.90181310",
                    "type": "state"
                },
                {
                    "id": 1454,
                    "name": "Tennessee",
                    "state_code": "TN",
                    "latitude": "35.51749130",
                    "longitude": "-86.58044730",
                    "type": "state"
                },
                {
                    "id": 1407,
                    "name": "Texas",
                    "state_code": "TX",
                    "latitude": "31.96859880",
                    "longitude": "-99.90181310",
                    "type": "state"
                },
                {
                    "id": 1432,
                    "name": "United States Minor Outlying Islands",
                    "state_code": "UM",
                    "latitude": "19.28231920",
                    "longitude": "166.64704700",
                    "type": "outlying area"
                },
                {
                    "id": 1413,
                    "name": "United States Virgin Islands",
                    "state_code": "VI",
                    "latitude": "18.33576500",
                    "longitude": "-64.89633500",
                    "type": "outlying area"
                },
                {
                    "id": 1414,
                    "name": "Utah",
                    "state_code": "UT",
                    "latitude": "39.32098010",
                    "longitude": "-111.09373110",
                    "type": "state"
                },
                {
                    "id": 1409,
                    "name": "Vermont",
                    "state_code": "VT",
                    "latitude": "44.55880280",
                    "longitude": "-72.57784150",
                    "type": "state"
                },
                {
                    "id": 1427,
                    "name": "Virginia",
                    "state_code": "VA",
                    "latitude": "37.43157340",
                    "longitude": "-78.65689420",
                    "type": "state"
                },
                {
                    "id": 1405,
                    "name": "Wake Island",
                    "state_code": "UM-79",
                    "latitude": "19.27961900",
                    "longitude": "166.64993480",
                    "type": "islands \/ groups of islands"
                },
                {
                    "id": 1462,
                    "name": "Washington",
                    "state_code": "WA",
                    "latitude": "47.75107410",
                    "longitude": "-120.74013850",
                    "type": "state"
                },
                {
                    "id": 1429,
                    "name": "West Virginia",
                    "state_code": "WV",
                    "latitude": "38.59762620",
                    "longitude": "-80.45490260",
                    "type": "state"
                },
                {
                    "id": 1441,
                    "name": "Wisconsin",
                    "state_code": "WI",
                    "latitude": "43.78443970",
                    "longitude": "-88.78786780",
                    "type": "state"
                },
                {
                    "id": 1442,
                    "name": "Wyoming",
                    "state_code": "WY",
                    "latitude": "43.07596780",
                    "longitude": "-107.29028390",
                    "type": "state"
                }
            ]', true);
    }
}
