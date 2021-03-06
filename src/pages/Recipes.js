import React, { useCallback, useContext, useEffect, useState } from "react";
import { useHttp } from "../hooks/http";
import { AuthContext } from "../context/AuthContext";
import { Preloader } from "../components/Preloader";
import { RecipeList } from "../components/RecipeList";

export const Recipes = () => {
    const [recipes, setRecipes] = useState([]);
    const { loading, request } = useHttp();
    const { token } = useContext(AuthContext);

    const loadedRecipes = useCallback(async () => {
        try {
            const data = await request("https://infinite-springs-97858.herokuapp.com/recipe/", "GET", null, {
                Authorization: `Bearer ${token}`
            });

            setRecipes(data);
        } catch (e) {}
    }, [token, request]);

    useEffect(() => {
        loadedRecipes();
    }, [loadedRecipes]);

    if (loading) {
        return <Preloader />;
    }

    return <>{!loading && <RecipeList recipes={recipes} />}</>;
};
