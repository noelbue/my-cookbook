import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const IndexPage = ({ data }) => {
  const recipes = data.allRecipesJson.nodes

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Cookbook</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map(recipe => {
          const recipeImage = data.allFile.nodes.find(
            node => node.relativePath === recipe.imageUrl
          )
          return (
            <div
              key={recipe.id}
              className="border rounded-lg overflow-hidden shadow-lg"
            >
              {recipeImage?.childImageSharp?.gatsbyImageData && (
                <GatsbyImage
                  image={recipeImage.childImageSharp.gatsbyImageData}
                  alt={recipe.name}
                  className="w-full h-48"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{recipe.name}</h2>
                <p className="text-gray-600 mb-2">{recipe.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>🕒 {recipe.totalTime} Min.</span>
                  <span>👥 {recipe.persons} Pers.</span>
                  <span>🥗 {recipe.type}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}

export const query = graphql`
  query RecipesQuery {
    allRecipesJson {
      nodes {
        id
        name
        description
        imageUrl
        totalTime
        persons
        type
      }
    }
    allFile(filter: { sourceInstanceName: { eq: "images" } }) {
      nodes {
        relativePath
        childImageSharp {
          gatsbyImageData(
            width: 400
            height: 300
            transformOptions: { fit: COVER }
          )
        }
      }
    }
  }
`

export default IndexPage