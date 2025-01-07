"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";

const fetchPosts = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

const UseQueryTestPage = () => {

    // useQuery 사용하여 데이터 가져오기
    const { data, error, isLoading } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
        staleTime: 5000
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error instanceof Error) {
        return <div>An error occurred: {error.message}</div>;
    }

    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {data.map((post: {id: string, title: string, body: string}) => (
                    <li key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UseQueryTestPage;