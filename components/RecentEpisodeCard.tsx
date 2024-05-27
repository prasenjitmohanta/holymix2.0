import React from "react";
import { Card, CardFooter, CardBody } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";

export default function AnimeCard({ anime, index }: { anime: any; index: number }) {
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  const truncatedTitle = anime.title.length > 49 ? anime.title.slice(0, 20) + "..." : anime.title;
  return (
    <Link shallow href={`/watch/${anime.id}/${anime.episodeNumber}`}>
    <div className="recent-card">
      {/* Displaying the numbering with random color */}
      <div className="numbering" style={{ color: getRandomColor() }}>
        #{index + 1}
      </div>
      {/* Displaying the anime information */}
      <div className="recent-card-body">
        <div className="recent-card-main">
          <div className="recent-card-main-img">
            <Image
              alt="Card background"
              className="recent-card-body-img"
              src={anime.image}
              height={230}
              width={270}
            />
          </div>
          <div className="recent-card-main-text">
            <p className="">{truncatedTitle}</p>
            <span>Episode Number: {anime.episodeNumber}</span>
          </div>
        </div>
      </div>
    </div>
  </Link>
  );
}
