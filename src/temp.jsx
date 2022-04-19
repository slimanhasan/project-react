import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

export default function(){
    const { status, data, error, isFetching } = useQuery("posts", async () => {
        const { data } = await axios.get(
            "http://localhost:8080/getCategories"
        );
        return data;
      });
    
    return (
        <>
        </>
    )

}