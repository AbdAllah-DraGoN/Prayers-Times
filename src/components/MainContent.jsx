import Grid from "@mui/material/Grid2";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Prayer from "./Prayer";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import "moment/dist/locale/ar-dz";
moment.locale("ar");

export default function MainContent() {
  const avaliableCities = [
    {
      id: 1,
      country: "Egypt",
      enName: "Cairo",
      arName: "القاهرة",
    },
    {
      id: 2,
      country: "Palestine",
      enName: "Gaza",
      arName: "غزة",
    },
    {
      id: 3,
      country: "SA",
      enName: "Makkah al Mukarramah",
      arName: "مكة المكرمة",
    },
  ];
  const prayersArray = [
    { key: "Fajr", displayName: "الفجر" },
    { key: "Dhuhr", displayName: "الظهر" },
    { key: "Asr", displayName: "العصر" },
    { key: "Maghrib", displayName: "المغرب" },
    { key: "Isha", displayName: "العشاء" },
  ];

  // =============== STATES
  const [nextPrayerIndex, setNextPrayerIndex] = useState(0);
  const [timings, setTimings] = useState({
    Fajr: "00:00",
    Dhuhr: "00:00",
    Asr: "00:00",
    Maghrib: "00:00",
    Isha: "00:00",
  });
  const [selectedCity, setSelectedCity] = useState({
    id: 1,
    country: "Egypt",
    enName: "Cairo",
    arName: "القاهرة",
  });
  const [today, setToday] = useState("");
  const [remainingTimeCounter, setRemainingTimeCounter] =
    useState("00 : 00 : 00");

  // =============== EFFECTS
  useEffect(() => {
    getTimings();
  }, [selectedCity]);

  useEffect(() => {
    setToday(moment().format("MMM Do YYYY | h:mm a"));
    let interval = setInterval(() => {
      setupCountdownTimer();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [timings]);
  // ======================================
  const getTimings = async () => {
    const response = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?country=${selectedCity.country}&city=${selectedCity.city}&method=2`
    );
    // console.log(response);
    setTimings(response.data.data.timings);
  };
  const setupCountdownTimer = () => {
    const momentNow = moment();
    let prayerIndex = null;
    // console.log(momentNow.format("hh:mm"));
    if (
      momentNow.isAfter(moment(timings.Fajr, "hh:mm")) &&
      momentNow.isBefore(moment(timings.Dhuhr, "hh:mm"))
    ) {
      prayerIndex = 1;
      // console.log("Next Prayer is Dhuhr");
    } else if (
      momentNow.isAfter(moment(timings.Dhuhr, "hh:mm")) &&
      momentNow.isBefore(moment(timings.Asr, "hh:mm"))
    ) {
      prayerIndex = 2;
      // console.log("Next Prayer is Asr");
    } else if (
      momentNow.isAfter(moment(timings.Asr, "hh:mm")) &&
      momentNow.isBefore(moment(timings.Maghrib, "hh:mm"))
    ) {
      prayerIndex = 3;
      // console.log("Next Prayer is Maghrib");
    } else if (
      momentNow.isAfter(moment(timings.Maghrib, "hh:mm")) &&
      momentNow.isBefore(moment(timings.Isha, "hh:mm"))
    ) {
      prayerIndex = 4;
      // console.log("Next Prayer is Isha");
    } else {
      prayerIndex = 0;
      // console.log("Next Prayer is Fajr");
    }
    setNextPrayerIndex(prayerIndex);

    const nextPrayerTimer = timings[prayersArray[prayerIndex].key];
    const nextPrayerTimerMoment = moment(nextPrayerTimer, "hh:mm");

    let remainingTime = nextPrayerTimerMoment.diff(momentNow);

    if (remainingTime < 0) {
      const midnightDiff = moment("23:59:59", "hh:mm:ss").diff(momentNow);
      const midnightToFajrDiff = nextPrayerTimerMoment.diff(
        moment("00:00:00", "hh:mm:ss")
      );

      const totalDifference = midnightDiff + midnightToFajrDiff;
      remainingTime = totalDifference;
    }

    // console.log(remainingTime);

    const durationRemainingTime = moment.duration(remainingTime);
    setRemainingTimeCounter(
      moment(
        `${durationRemainingTime.hours()}:${durationRemainingTime.minutes()}:${durationRemainingTime.seconds()}`,
        "hh:mm:ss"
      ).format("hh:mm:ss")
    );

    // console.log(
    //   moment(
    //     `${durationRemainingTime.seconds()} : ${durationRemainingTime.minutes()} : ${durationRemainingTime.hours()}`,
    //     "hh:mm:"
    //   ).format("hh:mm:ss")
    // );
  };

  const handleCityChange = (event) => {
    const cityObject = avaliableCities.find(
      (city) => city.enName == event.target.value
    );
    setSelectedCity(cityObject);
  };
  const setupTime = (time) => moment(time, "hh:mm").format("h:mm a");

  return (
    <>
      {/* Top Row */}
      <Grid container>
        <Grid size={6}>
          <div>
            <h2>{today}</h2>
            <h1>{selectedCity.arName}</h1>
          </div>
        </Grid>
        <Grid size={6}>
          <div>
            <h2>متبقى على صلاة {prayersArray[nextPrayerIndex].displayName}</h2>
            <div style={{ fontSize: "5rem" }}>{remainingTimeCounter}</div>
          </div>
        </Grid>
      </Grid>
      {/*== Top Row ==*/}
      <Divider style={{ borderColor: "#fff2" }} />
      {/* Prayers Cards */}
      <Stack
        direction="row"
        justifyContent={"space-between"}
        style={{ marginTop: "50px" }}
      >
        <Prayer
          name="الفجر"
          time={setupTime(timings.Fajr)}
          image="public/fajr.png"
        />
        <Prayer
          name="الظهر"
          time={setupTime(timings.Dhuhr)}
          image="public/dhuhr.png"
        />
        <Prayer
          name="العصر"
          time={setupTime(timings.Asr)}
          image="public/asr.png"
        />
        <Prayer
          name="المغرب"
          time={setupTime(timings.Maghrib)}
          image="public/maghrib.png"
        />
        <Prayer
          name="العشاء"
          time={setupTime(timings.Isha)}
          image="public/isha.png"
        />
      </Stack>
      {/*== Prayers Cards ==*/}

      {/* Select City */}
      <Stack
        direction="row"
        justifyContent={"center"}
        style={{ marginTop: "30px" }}
      >
        <FormControl style={{ width: "200px" }}>
          <InputLabel
            id="demo-simple-select-label"
            sx={{
              color: "#fff", // لون العنوان في الوضع العادي
              "&.Mui-focused": {
                color: "#fff", // لون العنوان عند التركيز (focus)
              },
            }}
          >
            المدينة
          </InputLabel>
          <Select
            style={{ color: "#fff" }}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#fff2", // لون الإطار في الحالة العادية
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#fff", // لون الإطار عند التحويم
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#fff", // لون الإطار عند التركيز (الـ hold)
              },
              "& .MuiSelect-icon": {
                color: "#fff", // لون السهم
              },
            }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="المدينة"
            onChange={handleCityChange}
          >
            {avaliableCities.map((item) => {
              return (
                <MenuItem key={item.id} value={item.enName}>
                  {item.arName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Stack>
      {/*== Select City ==*/}
    </>
  );
}
