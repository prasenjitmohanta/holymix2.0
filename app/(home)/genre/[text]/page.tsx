"use client";
import React, { useState, useEffect, useCallback, Suspense } from "react";
import {
  Card,
  CardFooter,
  CardBody,
  Skeleton,
  Spinner,
  Breadcrumbs,
  BreadcrumbItem,
} from "@nextui-org/react";
import { url } from "@/config/url";
import AnimeCard from "@/components/AnimeCard";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

const Genre = ({ params }: any) => {
  const { text } = params;
  const [isLoading, setIsLoading] = useState(true);
  const [genre_results, setGenreResults] = useState<any[]>([]);

  const fetchDetails = useCallback(async () => {
    try {
      const genre = await axios.get(url.genre + "/" + text);
      setGenreResults(genre.data.results);
    } catch (error) {
      console.error("Error fetching details:", error);
    } finally {
      setIsLoading(false);
    }
  }, [text]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);
  return (
    <div className="text-center max-w mx-auto px-6 pb-3">
      <Suspense
        fallback={
          <Spinner
            label="Loading"
            color="secondary"
            size="lg"
            labelColor="foreground"
          />
        }
      >
        {isLoading ? (
          <div className="fixed inset-0 flex items-center justify-center bg-black">
          <Spinner color="success" size="lg" />
        </div>
        ) : (
          <div>
            <div className="py-8 px-4 sm:px-6 lg:px-8 pb-0">
              <div className="flex flex-col text-center items-center justify-center">
                <div className="flex flex-col flex-wrap ">
                  <Breadcrumbs size="lg">
                    <BreadcrumbItem>
                      <Link href="/genre">Genre</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                      {text.charAt(0).toUpperCase() + text.slice(1)}
                    </BreadcrumbItem>
                  </Breadcrumbs>
                </div>
              </div>
            </div>
            {genre_results.length === 0 ? (
              <div className="flex flex-col text-center items-center justify-center h-screen">
                <div className="text-4xl font-bold mb-4">No Results Found</div>
                <div className="text-gray-500 ">
                  Try adjusting your search criteria or check your spelling.
                </div>
              </div>
            ) : (
              <div className="popular-card">
                {genre_results.map((anime: any) => (
                  <AnimeCard key={anime.id} anime={anime} />
                ))}
              </div>
            )}
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default Genre;
