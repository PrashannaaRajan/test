import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Navigate, useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function refreshProducts(setProduct) {
  fetch("https://648bfad38620b8bae7ebff4b.mockapi.io/prod", { method: "GET" })
    .then((res) => res.json())
    .then((prod) => {
      {
        setProduct(prod);
      }
    });
}

export default function ProductCard({
  name,
  img,
  rating,
  desc,
  price,
  review,
  id,
  like,
  setProduct,
}) {
  const [expanded, setExpanded] = React.useState(false);
  const navigate = useNavigate();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader title={name} />
      <Typography variant="body2" color="text.secondary">
        $ {price}
      </Typography>
      <br />
      <CardMedia component="img" height="230" image={img} alt="Paella dish" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {desc}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Typography variant="body2" color="text.secondary">
          ⭐{rating}
        </Typography>
        <Badge
          badgeContent={like}
          color="error"
          sx={{ ml: "auto" }}
          onClick={() => {
            const updatedProd = {
              like: like + 1,
            };
            fetch(`https://648bfad38620b8bae7ebff4b.mockapi.io/prod/${id}`, {
              method: "PUT",
              body: JSON.stringify(updatedProd),
              headers: {
                "Content-Type": "application/json",
              },
            }).then(() => refreshProducts(setProduct));
          }}
        >
          <FavoriteIcon />
        </Badge>

        <IconButton
          badgeContent={like}
          sx={{ ml: "auto" }}
          onClick={() => {
            const updatedProd = {
              like: like > 0 ? like - 1 : like,
            };
            fetch(`https://648bfad38620b8bae7ebff4b.mockapi.io/prod/${id}`, {
              method: "PUT",
              body: JSON.stringify(updatedProd),
              headers: {
                "Content-Type": "application/json",
              },
            }).then(() => refreshProducts(setProduct));
          }}
        >
          <ThumbDownIcon />
        </IconButton>

        <IconButton
          aria-label="edit product"
          sx={{ ml: "auto" }}
          onClick={() => navigate(`/ProductList/Edit/${id}`)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          aria-label="delete product"
          sx={{ ml: "auto" }}
          onClick={() => {
            fetch(`https://648bfad38620b8bae7ebff4b.mockapi.io/prod/${id}`, {
              method: "DELETE",
            }).then(() => {
              refreshProducts(setProduct);
            });
          }}
        >
          <DeleteIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{review}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
