"use client";
import axios from "axios";
import {
  Card,
  CardFooter,
  CardBody,
  Skeleton,
  Spinner,
} from "@nextui-org/react";
import RecentEpisodeCard from "@/components/RecentEpisodeCard";
import React, { useState, useEffect } from "react";
import AnimeCard from "@/components/AnimeCard";
import Movies from "@/components/Movies";
import Link from "next/link";
import { FaPlayCircle } from "react-icons/fa";

import {
  CarouselItem,
  CarouselContent,

  Carousel,
} from "@/components/ui/carousel";

import { url } from "@/config/url";
import Image from "next/image";


const Main = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [top_airing, setTopAiring] = useState<any[]>([]);
  const [popular, setPopular] = useState<any[]>([]);
  const [recent_episodes, setRecentEpisodes] = useState<any[]>([]);
  const [movies, setMovies] = useState<any[]>([]);
  const [activeButton, setActiveButton] = useState("popular");
  const [localItems, setLocalItems] = useState({ AnimeHistory: [] });
  function get_local() {
    try {
      return JSON.parse(localStorage.getItem("watchHistory") || "");
    } catch (error) {
      console.log("error", error);
      return false;
    }
  }
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const top_airing = await axios.get(url.top_airing);
        setTopAiring(top_airing.data.results);
        const popular = await axios.get(url.popular);
        setPopular(popular.data.results);
        const recent_episodes = await axios.get(url.recent_episodes);
        setRecentEpisodes(recent_episodes.data.results);
        const movies = await axios.get(url.movies);
        setMovies(movies.data.results);
      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
    const newData = get_local();
    setLocalItems(newData);
  }, []);
  const handleClick = (button: any) => {
    setActiveButton(button);
  };

  
  return (
    <>
      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black">
  <Spinner color="success" size="lg" />
</div>

      ) : (
        <>
          <div className="text-center max-w mx-auto px-6">
          <Carousel className="top-airing">
  <CarouselContent>
    {top_airing.map((anime, index) => (
      <CarouselItem className="top-air-div" key={anime.id}>
        <div className="ani-div-top relative">
          <div className="shadow" />
          <Image
            alt={anime.title}
            className="aspect-[16/9] w-full object-cover opacity-75 blur"
            height={720}
            src={anime.image}
            width={1280}
          />
          <div className="ani-div-top-textbox bottom-left">
            <h4>Spotlight {index + 1}:</h4>
            <h4 className="mb-2 text-2xl font-bold text-white md:text-3xl lg:text-4xl relative z-10">
              {anime.title.slice(0, 50)} ...
            </h4>
            <div className="text-white mb-2">
              {anime.genres.map((gen: any, index: number) => (
                <span
                  key={index}
                  className={`genre genre-${gen.toLowerCase()}`}
                >
                  {gen}
                </span>
              ))}
            </div>
            <Link shallow href={`/info/${anime.id}`}>
              <button className="bg-white text-gray-900 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors duration-300 flex items-center">
                <FaPlayCircle className="mr-2" />
                Watch Now
              </button>
            </Link>
          </div>
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>
</Carousel>


       

            <div className="click-section-home">
              <button
                onClick={() => handleClick("popular")}
                className={activeButton === "popular" ? "active" : ""}
              >
                POPULAR
              </button>
              <button
                onClick={() => handleClick("recent")}
                className={activeButton === "recent" ? "active" : ""}
              >
                RECENT
              </button>
              <button
                onClick={() => handleClick("movies")}
                className={activeButton === "movies" ? "active" : ""}
              >
                MOVIES
              </button>
            </div>

            {activeButton === "popular" && (
              <div className="popular-card">
                {popular.slice(0, 10).map((anime) => (
                  <AnimeCard key={anime.id} anime={anime} />
                ))}
              </div>
            )}

            {(activeButton === "recent" || activeButton === "movies") && (
              <div className="other-section">
                {activeButton === "recent" && (
                  <div className="recent-page">
                    <h2 className="text-4xl font-bold mb-4 py-4 font-mono">
                      RECENT EPISODES
                    </h2>
                    {recent_episodes.slice(0, 10).map((anime, index) => (
                      <RecentEpisodeCard
                        key={anime.id}
                        index={index}
                        anime={anime}
                      />
                    ))}
                  </div>
                )}

                {activeButton === "movies" && (
                  <div className="recent-page">
                    <h2 className="text-4xl font-bold mb-4 py-4 font-mono">
                      MOVIES
                    </h2>
                    {movies.slice(0, 10).map((movie, index) => (
                      <Movies anime={movie} index={index} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Main;
