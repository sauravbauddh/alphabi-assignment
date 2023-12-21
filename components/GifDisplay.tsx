import React from "react";
import { Col, Row } from "react-bootstrap";
import GifCard from "../components/GifCard";
import FavoriteCard from "../components/FavoriteCard";
import Gif from "../models/Gif";

interface GifDisplayProps {
  gifs: Gif[];
  onToggleFavorite: (gif: Gif) => void;
  isFavoritesPage: boolean;
}

const GifDisplay: React.FC<GifDisplayProps> = ({
  gifs,
  onToggleFavorite,
  isFavoritesPage,
}) => {
  return (
    <Row xs={1} md={5} className="g-4">
      {gifs.map((gif, index) => (
        <Col key={index}>
          {isFavoritesPage ? (
            <FavoriteCard gif={gif} onRemoveFavorite={onToggleFavorite} />
          ) : (
            <GifCard gif={gif} onToggleFavorite={onToggleFavorite} />
          )}
        </Col>
      ))}
    </Row>
  );
};

export default GifDisplay;
