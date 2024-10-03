import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

Prayer.propTypes = {
  name: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default function Prayer({ name, time, image }) {
  return (
    <Card sx={{ width: "13rem", height: "18rem", margin: "1rem" }}>
      <CardMedia sx={{ height: "7.5rem" }} image={image} />
      <CardContent>
        <h2 style={{ fontSize: "1.5rem" }}>{name}</h2>
        <Typography
          variant="h1"
          sx={{
            color: "text.secondary",
            fontSize: "3.5rem",
            textWrap: "nowrap",
          }}
        >
          {time}
        </Typography>
      </CardContent>
    </Card>
  );
}
