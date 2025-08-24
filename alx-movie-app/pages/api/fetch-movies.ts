import { MoviesProps } from "@/interfaces";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    if (request.method === "POST") {
        const { year, page, genre } = request.body;
        const date = new Date();
        const resp = await fetch(
            `https://moviesdatabase.p.rapidapi.com/titles?year=${year || date.getFullYear()
            }&sort=year.decr&limit=12&page=${page}&${genre && `genre=${genre}`}`,
            {
                headers: {
                    "x-rapidapi-host": "moviesdatabase.p.rapidapi.com",
                    "x-rapidapi-key": `${process.env.MOVIE_API_KEY}`,
                    'Content-Type': 'application/json'
                },
            }
        );

        if (!resp.ok) {
            const errorText = await resp.text();
            console.error('API error:', resp.status, errorText);
            return response.status(resp.status).json({ error: errorText });
        }

        if (resp.status === 429) {
            return response.status(429).json({ error: "Rate limit exceeded. Please try again later." });
        }

        const moviesResponse = await resp.json();
        const movies: MoviesProps[] = moviesResponse.results;

        return response.status(200).json({
            movies,
        });
    } else {
        response.setHeader('Allow', ['POST']);
        response.status(405).end(`Method ${request.method} Not Allowed in here`);
    }
};