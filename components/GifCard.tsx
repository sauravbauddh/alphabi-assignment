import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import Gif from '../models/Gif';

interface GifCardProps {
  gif: Gif;
  onToggleFavorite: (gif: Gif) => void;
}

const GifCard: React.FC<GifCardProps> = ({gif, onToggleFavorite }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    onToggleFavorite(gif);
  };

  return (
    <Card style={{ width: '200px', marginBottom: '20px' }}>
      <Card.Img variant="top" src={(gif as any)?.images?.fixed_height?.url} style={{ height: '200px', objectFit: 'cover' }} />
      <Card.Body style={{ padding: '10px' }}>
        <Button
          variant={isFavorite ? 'danger' : 'outline-dark'}
          onClick={toggleFavorite}
          style={{ width: '100%', marginTop: '10px' }}
        >
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default GifCard;
