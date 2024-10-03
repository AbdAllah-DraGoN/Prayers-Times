import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function Prayer({ name, time, image }) {
  return (
    <Card sx={{ width: "19%" }}>
      <CardMedia sx={{ height: 140 }} image={image} />
      <CardContent>
        <h2 style={{ fontSize: "2.2rem" }}>{name}</h2>
        <Typography
          variant="h1"
          sx={{ color: "text.secondary", fontSize: "4rem", textWrap: "nowrap" }}
        >
          {time}
        </Typography>
      </CardContent>
    </Card>
  );
}
