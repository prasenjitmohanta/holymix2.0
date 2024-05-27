import React from "react";
import { Card, CardFooter, CardBody } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";

export default function AnimeCard({ anime }: any) {
  const truncatedTitle = anime.title.length > 24 ? anime.title.slice(0, 20) + "..." : anime.title;
  return (
    <Link shallow href={`/info/${anime.id}`}>
  <Card isHoverable={true} isPressable className="anime-card">
    <CardBody className="anime-card-body">
      <Image
        alt="Card background"
        className="anime-card-image"
        src={anime.image}
        height={230}
        width={270}
      />
    </CardBody>
    <CardFooter className="anime-card-footer">
      <p>{truncatedTitle}</p>
    </CardFooter>
  </Card>
</Link>
  );
}
