import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { useState } from "react";
// typeのimport方法
import { WeatherTypes } from "../App";

interface ComponentProps {
  weather: null | WeatherTypes;
  setCityName: React.Dispatch<React.SetStateAction<string>>;
}

const Weather: React.FC<ComponentProps> = ({ weather, setCityName }) => {
  // use button disable
  const [value, setValue] = useState("");

  // returnだけではなくnullを返さないとTSエラーとなる。
  if (!weather) return null;

  return (
    <Grid container justifyContent="center" spacing={2} marginTop={10}>
      <Grid container xs={12} justifyContent="center" direction="row">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            // should calling submit event here for better UX on Enter keyboard after filling the form. 
            setCityName(value);
          }}>
          <Grid item>
            <TextField
              id="outlined-basic"
              label="city name"
              variant="outlined"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setValue(event.target.value);
              }}
            />
          </Grid>
          <Grid item>
            <Button
              type="submit" // type "submit" will make this button as primary submit on "Enter" keyboard event
              style={{ marginTop: 10, width: '100%' }}
              variant="contained"
              >
              Search
            </Button>
          </Grid>
        </form>
      </Grid>
      <Grid item xs={8}>
        <Card>
          <CardContent>
            <p><b>City name:</b> {weather.name}</p>
            <p><b>Main:</b> {weather.weather[0].main}</p>
            <p><b>Temp:</b> {weather.main.temp}</p>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Weather;
