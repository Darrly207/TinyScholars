import React, { useState, useEffect } from "react";
import { MemoryCard as MemoryCardType } from "../types/game";

interface MemoryCardProps {
  question: MemoryCardType;
  onQuestionUpdate: (question: MemoryCardType) => void;
  standalone?: boolean;
}

interface CardType {
  description: string;
  image: string;
  type: "image" | "text";
  id: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryCardGame: React.FC<MemoryCardProps> = ({
  question,
  onQuestionUpdate,
  standalone = false,
}) => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [firstCard, setFirstCard] = useState<CardType | null>(null);
  const [secondCard, setSecondCard] = useState<CardType | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);

  const defaultPairs = [
    {
      description: "Cat",
      image: "/api/placeholder/100/100",
    },
    {
      description: "Dog",
      image: "/api/placeholder/100/100",
    },
    {
      description: "Rabbit",
      image: "/api/placeholder/100/100",
    },
  ];

  useEffect(() => {
    initializeGame();
  }, [question.pairs]);

  const initializeGame = () => {
    const pairs = question.pairs.length > 0 ? question.pairs : defaultPairs;

    const cardPairs: CardType[] = pairs.flatMap((pair, index) => [
      {
        description: pair.description,
        image: pair.image,
        type: "image" as const,
        id: `image-${index}`,
        isFlipped: false,
        isMatched: false,
      },
      {
        description: pair.description,
        image: pair.image,
        type: "text" as const,
        id: `text-${index}`,
        isFlipped: false,
        isMatched: false,
      },
    ]);

    setCards(cardPairs.sort(() => Math.random() - 0.5));
    setMoves(0);
    setMatches(0);
  };

  const handleCardClick = (clickedCard: CardType) => {
    if (disabled || clickedCard.isFlipped || clickedCard.isMatched) return;

    if (!firstCard) {
      setFirstCard(clickedCard);
      flipCard(clickedCard.id);
    } else if (!secondCard && firstCard.id !== clickedCard.id) {
      setSecondCard(clickedCard);
      flipCard(clickedCard.id);
      setDisabled(true);
      setMoves((prev) => prev + 1);

      setTimeout(() => checkMatch(firstCard, clickedCard), 800);
    }
  };

  const flipCard = (cardId: string) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? { ...card, isFlipped: !card.isFlipped } : card
      )
    );
  };

  const checkMatch = (card1: CardType, card2: CardType) => {
    const isMatch =
      card1.description === card2.description && card1.type !== card2.type;

    if (isMatch) {
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === card1.id || card.id === card2.id
            ? { ...card, isMatched: true }
            : card
        )
      );
      setMatches((prev) => prev + 1);
      setFirstCard(null);
      setSecondCard(null);
      setDisabled(false);
    } else {
      setTimeout(() => {
        flipCard(card1.id);
        flipCard(card2.id);
        setFirstCard(null);
        setSecondCard(null);
        setDisabled(false);
      }, 600);
    }
  };

  // Custom styles for card flipping
  const cardStyles = {
    container: {
      perspective: "1000px",
    },
    flipper: (isFlipped: boolean) => ({
      position: "relative" as const,
      width: "100%",
      height: "100%",
      transition: "transform 0.6s",
      transformStyle: "preserve-3d" as const,
      transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
    }),
    face: {
      position: "absolute" as const,
      width: "100%",
      height: "100%",
      backfaceVisibility: "hidden" as const,
    },
    back: {
      transform: "rotateY(180deg)",
      backgroundColor: "#3b82f6", // Tailwind blue-500
    },
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#F7FAFC",
        padding: "2rem",
      }}
    >
      <div style={{ maxWidth: "1024px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#2D3748",
              marginBottom: "1rem",
            }}
          >
            {question.text}
          </h2>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "2rem" }}
          >
            <p style={{ fontSize: "1.125rem" }}>Moves: {moves}</p>
            <p style={{ fontSize: "1.125rem" }}>
              Matches: {matches}/{question.pairs.length || defaultPairs.length}
            </p>
            <button
              onClick={initializeGame}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#4299E1",
                color: "white",
                borderRadius: "0.375rem",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#3182CE")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#4299E1")
              }
            >
              Reset Game
            </button>
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1rem",
            justifyItems: "center",
          }}
        >
          {cards.map((card) => (
            <div
              key={card.id}
              style={cardStyles.container}
              className={`w-24 h-32 cursor-pointer ${
                card.isMatched ? "invisible" : ""
              }`}
              onClick={() => handleCardClick(card)}
            >
              <div style={cardStyles.flipper(card.isFlipped)}>
                <div
                  style={{
                    ...cardStyles.face,
                    backgroundColor: "white",
                    borderRadius: "0.375rem",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    padding: "0.5rem",
                  }}
                >
                  {card.type === "image" ? (
                    <img
                      src={card.image}
                      alt={card.description}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "0.375rem",
                      }}
                    />
                  ) : (
                    <p
                      style={{
                        textAlign: "center",
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                      }}
                    >
                      {card.description}
                    </p>
                  )}
                </div>
                <div
                  style={{
                    ...cardStyles.face,
                    ...cardStyles.back,
                    borderRadius: "0.375rem",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemoryCardGame;
