import React from "react";
import { Card, Button } from "react-bootstrap";
import Gif from "../models/Gif";

interface FavoriteCardProps {
  gif: Gif;
  onRemoveFavorite: (gif: Gif) => void;
}

const FavoriteCard: React.FC<FavoriteCardProps> = ({
  gif,
  onRemoveFavorite,
}) => {
  const removeFavorite = () => {
    onRemoveFavorite(gif);
  };

  return (
    <Card style={{ width: "200px", marginBottom: "20px" }}>
      <Card.Img
        variant="top"
        src={(gif as any)?.images?.fixed_height?.url}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <Card.Body style={{ padding: "10px" }}>
        <Button
          variant="danger"
          onClick={removeFavorite}
          style={{ width: "100%", marginTop: "10px" }}
        >
          Remove from Favorites
        </Button>
      </Card.Body>
    </Card>
  );
};

export default FavoriteCard;
